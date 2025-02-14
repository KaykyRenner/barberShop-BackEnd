const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const validation = (esquema) =>{
    return async (req,res,next)=>{
    const acumuladorDeErros = {}
    for(const [key,esquemas] of Object.entries(esquema(req))){
        try{
            await esquemas.validate(req[key],{abortEarly:false})
        }catch(err){
            if(err instanceof yup.ValidationError){
                const erros = err.inner.reduce((acc,error)=>{
                    if(error.path){
                        acc[error.path] = error.message
                    }
                    return acc
                },{})
                acumuladorDeErros[key] = erros
            }
        }
    }
    if(Object.keys(acumuladorDeErros).length>0){
        return res.status(StatusCodes.BAD_REQUEST).send({erros:acumuladorDeErros})
    }else return next()
    }
}
module.exports = {validation}
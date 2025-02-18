const { StatusCodes } = require("http-status-codes");
const { verify } = require("../services/JWT");
const db = require("../../database/bancoDeDados/database")
const authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Não autorizado" });
        }

        const [type, token] = authorization.split(" ");

        if (type !== "Bearer") {
            return res.status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Tipo de token inválido" });
        }

        const decodedToken = verify(token);

        if (!decodedToken || !decodedToken.data.id) {
            return res.status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Token inválido ou expirado"});
        }

        console.log("Token verificado:", decodedToken);
        req.body.role = decodedToken.data.role
        req.body.usuario_id = decodedToken.data.id;
        next();
    } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token inválido ou expirado" });
    }
};

module.exports = { authenticate };

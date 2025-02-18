const jwt = require('jsonwebtoken'); // Corrigido o nome

const sing = (id,role) => {
    if (!process.env.JWT_SECRET) {
        return {
            message: 'JWT_SECRET_NOT_FOUND',
            error: ''
        };
    }
    return jwt.sign({ id: id,role:role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verify = (token) => {
    try {
        if (!process.env.JWT_SECRET) return { error: 'JWT_SECRET_NOT_FOUND' };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { success: true, data: decoded }; // Retorna os dados decodificados do token
    } catch (err) {
        return {
            error: 'Token inválido ou expirado',
        };
    }
};

module.exports = { sing, verify };

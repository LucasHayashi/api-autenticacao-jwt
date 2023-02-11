import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config();


const verifyToken =  async (req, res, next) => {
    const bearer = req.headers.authorization;
    if ( !bearer) {
        return res.status(401).send({message: "Não autorizado!"});
    }

    const bearerToken = bearer.split(" ")[1];
    
    try {
        const user = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).send({message: err.message});
    }
}

export default verifyToken;


import jwt from "jsonwebtoken";
type UserPayload = {
    codusuario: number;
};
export const generateJWT = (payload: UserPayload) => {
    const token = jwt.sign(payload, process.env.JSW_PWD, {
        expiresIn: "50m",
    });
    return token;
};

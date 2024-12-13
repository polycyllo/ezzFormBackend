import argon2 from "argon2";

export const hashContrasenia = async (contrasenia: string) => {
    return await argon2.hash(contrasenia);
};

export const checkPassword = async (
    enteredPassword: string,
    storedHash: string
) => {
    return await argon2.verify(storedHash, enteredPassword);
};

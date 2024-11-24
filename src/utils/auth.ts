import bcrypt from "bcrypt";

export const hashContrasenia = async (contrasenia: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contrasenia, salt);
};

export const checkPassword = async (
    enteredPassword: string,
    storeHash: string
) => {
    return await bcrypt.compare(enteredPassword, storeHash);
};

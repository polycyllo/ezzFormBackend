export declare const hashContrasenia: (contrasenia: string) => Promise<string>;
export declare const checkPassword: (enteredPassword: string, storeHash: string) => Promise<boolean>;

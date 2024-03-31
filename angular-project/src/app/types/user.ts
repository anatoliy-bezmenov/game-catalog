export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    rePassword: string;
    showPassword: boolean;
    showRePassword: boolean;
    __v: number;
}
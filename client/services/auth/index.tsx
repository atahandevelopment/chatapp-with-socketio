import ApiClient from "../../interceptor";
import { Users } from "../../types/users";

export const UsersService = async (accessToken: string) => {
    return await ApiClient.get('/user/all', {
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        }
    });
}

export const RegisterService = async (data: Users) => {
    return await ApiClient.post('/user/signup', {fullname: data.fullname, email: data.email, password: data.password});
}

export const LoginService = async (data: Users) => {
    return await ApiClient.post('/user/signin', data);
}

export const getMe = async (userId: string, accessToken: string) => {
    return await ApiClient.get('/user/get-me?userId=' + userId,{
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        }
    });
};
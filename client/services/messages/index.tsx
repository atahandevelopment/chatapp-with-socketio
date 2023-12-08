import ApiClient from "../../interceptor";
import { PostMessage } from "../../types/messages";

export const MessagePostService = async (data: PostMessage, token: string ) => {
    const { roomId } = data;

    if( !roomId ) {
        return await ApiClient.post('/private/add-msg', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    } else {
        return await ApiClient.post('/public/add-msg', data);
    }
}

export const MessageListService = async (from: string, to: string, token: string) => {
    return await ApiClient.get(`/private/get-msg?from=${from}&to=${to}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

export const RoomMessageListService = async (from: string, roomId: string, token: string) => {
    return await ApiClient.get(`/public/get-msg?from=${from}&room=${roomId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
import ApiClient from "../../interceptor";
import { PostMessage } from "../../types/messages";

export const MessagePostService = async (data: PostMessage ) => {
    const { roomId } = data;

    if( !roomId ) {
        return await ApiClient.post('/private/add-msg', data);
    } else {
        return await ApiClient.post('/public/add-msg', data);
    }
}

export const MessageListService = async (from: string, to: string) => {
    return await ApiClient.get(`/private/get-msg?from=${from}&to=${to}`);
}

export const RoomMessageListService = async (from: string, roomId: string) => {
    return await ApiClient.get(`/public/get-msg?from=${from}&room=${roomId}`);
}
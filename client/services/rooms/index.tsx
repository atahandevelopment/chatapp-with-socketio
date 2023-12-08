import ApiClient from "../../interceptor";

export const AddRoomService = async (data: { name: string }, token: string) => {
    return await ApiClient.post('/rooms/add-room', data, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
}

export const AllRooms = async (id: string, accessToken: string) => {
    let url: string = `/rooms/get-rooms`;
    if(id) {
        url += `?roomId=${id}`;
    }

    return await ApiClient.get(url, {
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        }
    });
};
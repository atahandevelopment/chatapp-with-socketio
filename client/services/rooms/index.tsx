import ApiClient from "../../interceptor";

export const AddRoomService = async (data: { name: string }) => {
    return await ApiClient.post('/rooms/add-room', data);
}

export const AllRooms = async (id: string) => {
    let url: string = `/rooms/get-rooms`;
    if(id) {
        url += `?roomId=${id}`;
    }

    return await ApiClient.get(url);
};
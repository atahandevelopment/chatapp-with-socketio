export type Messages = {
   users: [];
   sender: string;
   message: {
    text: string;
   },
   updatedAt: string;
   createdAt: string;
}

export type PostMessage = {
   from: string;
   to: string;
   message: string;
   roomId: string;
}

export type ArrivalMessage = {
   fromSelf: boolean;
   message: string;
   user: {
      fullname: string;
      name: string;
      _id: string;
   }
}

export type JoinedUser = {
   userId: string; 
    roomId:{ 
      roomName: string; 
      user: string;
      room: string;
      userId: string;
   }
}

export type RoomUsers= {
   roomId: string;
   roomName: string;
   users: {
      length: number;
      user: string;
      userId: string;
   }
}

export type RoomUsersStateAction = {
   users:{
   user: string;
   userId: string;
}
}

export type MessageCardProps = {
   userName: string;
   message : {
      fromSelf: boolean;
      message: string;
   }
}
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Layout, Menu, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Users } from '../../../../types/users';
import { errorToastMessage } from '../../../../components/toastify';
import { AiOutlineNotification } from "react-icons/ai";
import { UsersService } from '../../../../services/auth';
import { AllRooms } from '../../../../services/rooms';
import { GrAdd } from "react-icons/gr";
import Cookies from 'js-cookie';
import ChatTabs from './ChatTabs';
import AddNewRoom from '../../../../components/AddNewRoom';
import { JoinedUser } from '../../../../types/messages';

const { Sider } = Layout;

interface props {
    selectedTab: string;
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
    handleMenuClick: (users: Users) => void;
    //@ts-expect-error
    socket: SocketIOClient.Socket;
    selectedChat: Users;
}

export default function Sidebar ({handleMenuClick, socket, selectedTab, setSelectedTab}: props) {
    const [ users, setUsers] = useState<Users[]>([]);
    const [ roomsList, setRoomsList] = useState([]);
    const [ isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [onlineUsers, setOnlineUsers] = useState<RoomUsers>();
    const [ currentUser, setCurrentUser ] = useState<Users>()
    const filteredUsers = users.filter(f => f._id !== currentUser?._id);

      useEffect(() => {
        const userInfo = Cookies.get('info');
        if( userInfo !== undefined ) {
          setCurrentUser(JSON.parse(userInfo));
        } else {
          console.log('Kullanıcı bilgisi bulunamadı');
        }
      },[]);

      const joinRoom = (roomId : {room: string; roomName: string; user: string; userId: string; }) => {
        socket.current.emit("join-room", roomId);
      };

      const JoinedNotification = (user: JoinedUser) => {
        notification.open({
          message: 'Yeni Bildirim',
          description: `${user.roomId.user} isimli kullanıcı ${user.roomId.roomName} odasına katıldı.`,
        });
      }

      useEffect(() => {
        if (socket.current) {
          socket.current.on("user-joined", (user: JoinedUser) => {
            const fromSelf = user?.userId == currentUser?._id;
            if( !fromSelf ) {
              //@ts-expect-error
              if( user?.roomId !== "general") {
                JoinedNotification(user);
              }
            }
          });
          // socket.current.on("room-users", (roomUsers: RoomUsers ) => {
          //   //@ts-expect-error
          //   setOnlineUsers(roomUsers);
          // });
        }
      }, [socket, currentUser]);

    useEffect(() => {
        UsersService()
            .then((res: { data: { data: Users[]} }) => {
                setUsers(res.data.data);
            }).catch((err: Error) => {
                errorToastMessage(err.message, 1500, 'top-right');
            });
        //@ts-expect-error
        AllRooms()
            .then((res) => {
                setRoomsList(res.data.data);
            }).catch((err: Error) => {
              errorToastMessage(err.message, 1500, 'top-right');
            });
      }, []);

      const showModal = () => {
        setIsModalOpen(true);
      };


    return (
    <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ zIndex: 10, background: '#e0e0e0'}}
      >
        <div className='w-full h-screen'>
          {/* Yeni oda açmak için kullanılan component */}
            <AddNewRoom setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
            <div className="demo-logo-vertical" />
            <div className='w-full flex justify-center items-center '>
                <ChatTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            </div>
            <div className='w-full flex flex-col justify-between items-end' style={{height: "90vh"}}>
            {
                      selectedTab === "1" ? (
                          <Menu className="flex-start" style={{ background: "#e0e0e0"}} mode="inline">
                              {filteredUsers.map((user, index) => (
                                <Menu.Item onClick={() => handleMenuClick(user)} className='flex justify-start' key={index}>
                                      <img src={user.avatarImage} loading='lazy' />
                                      <span>{user.fullname}</span>
                                    </Menu.Item>
                                  ))}
                          </Menu>
                      ) : (
                        <Menu className="flex-start" style={{ background: "#e0e0e0"}} mode="inline">
                           {roomsList.map((room: {name : string; _id: string}, j) => (
                            <Menu.Item onClick={() => {
                              //@ts-expect-error
                              joinRoom({room: room._id, roomName: room?.name, user: currentUser?.fullname, userId: currentUser?._id});
                              //@ts-expect-error
                              handleMenuClick(room)
                              }} className='flex flex-row justify-start' key={j}>
                                <div className='flex justify-start gap-2 items-center'>
                                    <AiOutlineNotification/>
                                    <span>{room.name}</span>
                                </div>
                                </Menu.Item>
                              ))}
                        </Menu>
                      )
                  }
                        {/* <ul className='flex flex-col h-full gap-2 ml-2 justify-end items-start w-full'>
                        { 
                        onlineUsers && 
                            onlineUsers.users && 
                              onlineUsers.roomId === selectedChat?._id &&
                                onlineUsers.users.length > 0 ? 
                                  onlineUsers.users.map((users: {user: string},index: number) => {
                                                        return (
                                                          <li key={index}>
                                                            {users?.user}
                                                          </li>
                                                        )
                                                      }) : <></>
                        }
                        </ul> */}
                  {
                    selectedTab === '2' ? (
                        <Button onClick={showModal} className='mr-2 bg-blue-500 text-white w-10 h-10 flex items-center justify-center hover:text-white'>
                          <GrAdd className="text-2xl font-bold"/>
                        </Button>
                        
                    ) : <></>
                  }
                </div>
            </div>
                 
      </Sider>
    )
}
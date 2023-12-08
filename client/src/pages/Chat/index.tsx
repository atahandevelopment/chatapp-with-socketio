/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState, useRef } from 'react';
import { Layout,  theme, notification } from 'antd';
import { Users } from '../../../types/users';
import { MessagePostService } from '../../../services/messages';
import MessageBoxContainer from './components/MessageBoxContainer';
import Picker from "emoji-picker-react";
import ContentBox from './components/ContentBox';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import Sidebar from './components/SideBar';
import ChatHeader from './components/ChatHeader';
import { ArrivalMessage } from '../../../types/messages';

const { Content } = Layout;

const Chat: React.FC = () => {
   //@ts-expect-error
  const socket = useRef<SocketIOClient.Socket | null>(null);
   //@ts-expect-error
  const scrollRef = useRef<ScrollIOClient.ScrollRef | null>(null);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [ selectedTab, setSelectedTab ] = useState<string>('1');
  const [ selectedChat, setSelectedChat] = useState<Users>();
  const [ showEmojiPicker, setShowEmojiPicker ] = useState<boolean>(false);
  const [ currentUser, setCurrentUser ] = useState<Users>();
  const [messages, setMessages ] = useState<ArrivalMessage[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<ArrivalMessage>();
  const [msg, setMsg] = useState<string>("");
// Oturum açan kullanıcının bilgilerini Cookie'den çekiyorum ve sessionO
  useEffect(() => {
    const userInfo = Cookies.get('info');
    if( userInfo !== undefined ) {
      setCurrentUser(JSON.parse(userInfo));
    } else {
      console.log('Kullanıcı bilgisi bulunamadı');
    }
  },[]);

  useEffect(() => {
     //@ts-expect-error
      const currentUserId = JSON.parse(Cookies.get('info'))
      socket.current = io("http://localhost:5000");
      socket.current.emit('add-user', currentUserId);
  },[]);

 

  const handleSendMsg = async (msg: string) => {
    // Burada private ve room chat durumu kontrol edilerek socket'e dinamik veri gönderiyoruz.
    const socketMessageData = {
      ...(selectedTab === '1' ? {to: selectedChat?._id} : ''),
      from: currentUser?._id,
      msg,
      fromName: currentUser?.fullname,
      ...(selectedTab === '2' ? {roomId: selectedChat?._id} : '')
    }
    socket.current.emit("send-msg", socketMessageData);
    // tek servis üzerinden selectedTab durumu kontrol edilerek post edilecek mesajın apisi ayarlanıyor. 
    // "/services/messages" klasörü kontrol edilebilir. 
    const dbMessageData = {
      ...(selectedTab === '1' ? {to: selectedChat?._id} : ''),
      from: currentUser?._id,
      message: msg,
      fromName: currentUser?.fullname,
      ...(selectedTab === '2' ? {roomId: selectedChat?._id} : '')
    }
     //@ts-expect-error
    await MessagePostService(dbMessageData, Cookies.get('access'));

    const msgs: ArrivalMessage[] = [...messages];
    msgs.push({
      fromSelf: true, message: msg,
      user:{ 
          //@ts-expect-error
          name: currentUser?.fullname,
          //@ts-expect-error
          _id: currentUser?._id
        }
    });
    setMessages(msgs);
  };

  const messageNotification = (msg : string, fromName: string) => {
        notification.open({
          message: fromName,
          description: msg,
        });
  };


  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: string, fromName: string) => {
        if( fromName !== currentUser?.fullname ) {
          messageNotification(msg, fromName);
        }
        //@ts-expect-error
        setArrivalMessage({ fromSelf: false, message: msg, user: { name: fromName } });
        
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMenuClick = (user: Users) => {
    setSelectedChat(user);
  };

  const handleEmojiClick = (event: {emoji: string}) => {
    let message = msg;
    message += event.emoji;
    setMsg(message);
  };

  return (
    <Layout className='h-screen'>
      {/* Sol Menü */}
        <Sidebar 
            selectedTab={selectedTab} 
            //@ts-expect-error
            selectedChat={selectedChat}
            socket={socket}
            setSelectedTab={setSelectedTab}
            handleMenuClick={handleMenuClick} />
      <Layout>
        {/* Header Kısmı */}
        <ChatHeader
         //@ts-expect-error
           selectedChat={selectedChat}
           selectedTab={selectedTab}
            //@ts-expect-error
           currentUser={currentUser}
            />
            {/* Mesajlar Alanı */}
        <Content style={{ margin: '0' }}>
          <ContentBox
              messages={messages}
               //@ts-expect-error
              selectedChat={selectedChat}
              selectedTab={selectedTab}
              setMessages={setMessages}
              scrollRef={scrollRef}
              colorBgContainer={colorBgContainer}/>
        </Content>
        {/* Emoji Seçim Alanı */}
        {showEmojiPicker && (
            <div
              style={{
                position:"sticky",
                bottom: 0,
                zIndex: 2,
            }}>
                <Picker onEmojiClick={handleEmojiClick} />
            </div>
        )}
        
        {/* Mesaj Gönderme Alanı */}
       { selectedChat && (
        <MessageBoxContainer
            setMsg={setMsg}
            msg={msg}
            handleSendMsg={handleSendMsg}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
        />
        )}
      </Layout>
    </Layout>
  );
};

export default Chat;
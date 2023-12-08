/* eslint-disable @typescript-eslint/ban-ts-comment */
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { MessageListService, RoomMessageListService } from "../../../../services/messages";
import { Users } from "../../../../types/users";
import { useEffect } from "react";
import Cookies from "js-cookie";
import WelcomeMessage from "./WelcomeMessage";
import { ArrivalMessage } from "../../../../types/messages";
import MessageCard from "./MessageCard";

interface ContentPageProps {
    messages: ArrivalMessage[];
    selectedChat: Users;
    selectedTab: string;
    //@ts-expect-error
    scrollRef: ScrollIOClient.scrollRef;
    colorBgContainer: string;
    setMessages: React.Dispatch<React.SetStateAction<ArrivalMessage[]>>;
}
export default function ContentBox ({ messages, selectedTab, scrollRef, selectedChat, setMessages
}: ContentPageProps) {


  useEffect(() => {
    //@ts-expect-error
    const data = JSON.parse(Cookies.get('info'));
    const accessToken = Cookies.get('access')
    if ( selectedTab === '1') {
      //@ts-expect-error
      MessageListService(data?._id, selectedChat?._id, accessToken ).then((res) => {
        setMessages(res.data.getMessages);
      })
    } else {
      //@ts-expect-error
      RoomMessageListService(data?._id, selectedChat?._id, accessToken).then((res) => {
        setMessages(res.data.getMessages);
      });
    }
    
  }, [selectedChat, selectedTab]);
  
  useEffect(() => {
    const getCurrentChat = async () => {
      if (selectedChat) {
      //@ts-expect-error
        await JSON.parse(Cookies.get('info'))?._id;
      }
    };
    getCurrentChat();
  }, [selectedChat]);

    return (
        <Container>
            <div className="chat-messages">
              {selectedChat ? messages.map((message: ArrivalMessage) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div
                      className={`message ${
                        message.fromSelf ? "sended" : "recieved"
                      } gap-2`}
                    >
                      <div className="content ">
                        <MessageCard 
                            message = { message } 
                            userName={selectedTab ==='2' ? message?.user?.name : selectedChat?.fullname}
                        />
                      </div>
                    </div>
                  </div>
                );
              }) : <WelcomeMessage/>
              }
            </div>
    </Container>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 100% 80% 10%;
  gap: 0.1rem;
  max-height: 100%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 100% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    max-height: 100%;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: start;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        color: #fff;
      }
    }
  }
`;
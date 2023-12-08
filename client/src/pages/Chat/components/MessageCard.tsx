import { Card, Avatar } from 'antd';
import { MessageCardProps } from '../../../../types/messages';


const App = ({message, userName}: MessageCardProps) => {
    return (
        <Card
          bordered={false}
          style={{ width: 300, background:`${message.fromSelf ? 'lightblue' : '#fff'}`}}
              >
          <Card.Meta
            avatar={!message?.fromSelf && <Avatar>{userName?.charAt(0)}</Avatar>}
            title={ userName}
            description={message?.message}
          />
        </Card>
  )
};

export default App;
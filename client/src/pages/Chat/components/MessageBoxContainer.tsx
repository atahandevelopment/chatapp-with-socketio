import { Button, Input } from "antd";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

interface messageBoxProps {
    showEmojiPicker: boolean;
    msg: string;
    setMsg: React.Dispatch<React.SetStateAction<string>>;
    handleSendMsg: (msg: string) => void;
    setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>; 
}
export default function MessageBoxContainer({ setShowEmojiPicker, showEmojiPicker, msg, setMsg, handleSendMsg }: messageBoxProps) {


    const sendChat = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (msg.length > 0) {
          handleSendMsg(msg);
          setMsg("");
        }
      };
    
    return (
        <div className="w-full flex items-center justify-center gap-1 min-h-20 py-2 bg-slate-200">
            <div className={`w-1/12 flex items-center justify-center`}>
                <BsEmojiSmileFill onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-2xl hover:cursor-pointer"/>
            </div>
            <form 
                onSubmit={sendChat}
                className="flex justify-between max-w-full md:w-10/12 sm:w-10/12 lg:w-10/12 xl:w-10/12">
                <div className="max-w-full md:w-10/12 sm:w-10/12 lg:w-10/12 xl:w-10/12">
                    <Input 
                        placeholder="Mesajınızı yazınız"
                        className="p-2 mx-2" 
                        onChange={(e) => setMsg(e.target.value)} 
                        value={msg}
                    />
                </div>
                <div className="w-1/12 ml-3 flex items-center justify-center">
                    <Button htmlType="submit" className="bg-blue-500">
                        <IoMdSend className="text-white" />
                    </Button>
                </div>
            </form>
            
        </div>
    )
}
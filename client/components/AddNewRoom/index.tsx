import { Input, Modal } from 'antd';
import { ModalProps } from '../../types/modalprops';
import { AddRoomService } from '../../services/rooms';
import { useState } from 'react';


const AddNewRoom = ({isModalOpen, setIsModalOpen}: ModalProps) => {
    const [roomName, setRoomName ] = useState<string>('');

  const handleOk = async () => {
    const response = await AddRoomService({name: roomName});
    if( response.status === 201) {
        setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Modal 
        title="Sohbet Odanı Aç" 
        open={isModalOpen}
        onOk={handleOk} 
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: '#343deb', color: '#fff' } }}
        >
            <Input onChange={(e) => setRoomName(e.target.value)} placeholder="Oda ismi"/>
      </Modal>
    </>
  );
};

export default AddNewRoom;
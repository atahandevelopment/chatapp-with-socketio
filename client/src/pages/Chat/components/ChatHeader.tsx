import { Layout, Popover } from 'antd';
import { Users } from '../../../../types/users';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import GoyGoy from "../../../assets/GoyGoyap.png";
import { succesToastMessage } from '../../../../components/toastify';
import { VscAccount } from "react-icons/vsc";
const { Header } = Layout;

interface HeaderProps {
    selectedChat: Users;
    currentUser: Users;
    selectedTab: string;
}

export default function ChatHeader({selectedChat, currentUser, selectedTab }: HeaderProps) {
const navigate = useNavigate();
                                    
const LogOut = async () => {
    try{
        const shouldUpdateInfo = await Swal.fire({
            title: 'Çıkış Yapılıyor!',
            text: 'Çıkış yapmak istediğinize emin misiniz?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5f07db',
            cancelButtonColor: '#db0735',
            confirmButtonText: 'Çıkış Yap',
          });

          if( shouldUpdateInfo.isConfirmed ) {
            await succesToastMessage('Çıkış Yapılıyor', 1500, 'top-right')
            await Cookies.remove('access');
            await Cookies.remove('refresh');
            await Cookies.remove('info');
            await navigate('/login');
          }
        
} catch(err) {
        console.error(err);
    }
}
        
    return (
        <Header
            className='flex text-white justify-center items-center'
            style={{ padding: 0, boxShadow: '2px 0 4px #f0f0f0', background:'#38B6FF' }}>
              <div className='w-full flex justify-between items-center mx-4'>
                    <span className='font-bold text-2xl'>
                        {/* seçilen başlığa göre header 
                            kısmında kullanıcı adı veya sohbet odası ismi 
                                listeleme işlemi yapılıyor */}
                        {selectedTab === '1' && selectedChat !== undefined ? 
                            selectedChat?.fullname : selectedTab === '2' && selectedChat?.name ? selectedChat?.name 
                                : <img style={{ height: '60px'}}src={GoyGoy}/>}
                    </span>
                <div className='flex justify-center items-center gap-5'>
                    <Popover trigger='hover' placement='bottom' content={currentUser?.fullname} >
                        <VscAccount className="h-5 w-5" />
                    </Popover>
                  <button onClick={LogOut}>
                      <AiOutlineLogout className = "text-2xl"/>
                  </button>
                </div>
            </div>
        </Header>
    );
}
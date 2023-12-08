import { Users } from "../../../../types/users";
import { RegisterService } from "../../../../services/auth/index";
import { succesToastMessage, errorToastMessage } from "../../../../components/toastify";
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { AiOutlineMail } from "react-icons/ai";
import { Button, Form, Input } from 'antd';
import LockGif from '../../../assets/animated-lock.gif';

export default function Register () {
    const navigate = useNavigate();

        const onSubmit = async (data: Users) => {
          try {
             await RegisterService(data)
                .then(() => {
                    succesToastMessage('Kayıt işlemi Başarılı Giriş sayfasına yönlendiriliyorsunuz.', 1500, 'top-right');
                    setTimeout(() => {
                        navigate('/login');
                    }, 1500);
                })
                    .catch(() => {
                        errorToastMessage('Bilinmeyen bir hata ile karşılaşıldı', 1500, 'top-right')
                    });
          } catch (error) {
            errorToastMessage('Server hatası', 1500, 'top-right')
          }
        }


    return (
        <div className="w-screen h-screen flex items-center justify-center bg-blue-700">
        <ToastContainer/>
         <div className="max-w-[500px] flex flex-col gap-3 items-center justify-center lg:w-1/5 h-4/6 border rounded-md p-2 form-layout">
             <div className="w-36 h-36">
                 <img src={LockGif} />
             </div>
         <Form
               name="normal_login"
               className="login-form w-full"
               initialValues={{ remember: true }}
               onFinish={onSubmit}
             >
                <Form.Item
                 name="fullname"
                 rules={[{ required: true, message: 'Lütfen isminizi giriniz!' }]}
               >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="İsim" />
                 
               </Form.Item>
               <Form.Item
                 name="email"
                 rules={[{ required: true, message: 'Lütfen e-mail giriniz!' }]}
               >
                 <Input prefix={<AiOutlineMail className="site-form-item-icon" />} placeholder="E-mail" />
               </Form.Item>
               <Form.Item
                 name="password"
                 rules={[{ required: true, message: 'Lütfen şifrenizi giriniz!' }]}
               >
                 <Input
                   prefix={<LockOutlined className="site-form-item-icon" />}
                   type="password"
                   placeholder="Şifre"
                 />
               </Form.Item>
               <Form.Item>
                 <Button type="primary" htmlType="submit" className="login-form-button bg-blue-500 me-2">
                  Kayıt Ol
                 </Button>
                    hesabım var diyorsan <a href="/login">giriş yap!</a>
               </Form.Item>
             </Form>
         </div>
     </div>
    )
}
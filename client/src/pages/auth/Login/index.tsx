/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Users } from "../../../../types/users";
import { useNavigate } from "react-router-dom";
import { LoginService, getMe } from "../../../../services/auth";
import { errorToastMessage, succesToastMessage } from "../../../../components/toastify";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import LockGif from '../../../assets/login.gif';


export default function Login () {
        const navigate = useNavigate();

        const onSubmit = async (data: Users) => {
            try {
                const response = await LoginService(data);

                if( response.status === 200) {
                            Cookies.set('access', response.data.access);
                            Cookies.set('refresh', response.data.refresh);
                    //@ts-expect-error
                    const { userId } = jwtDecode(response.data.access);
                    if ( userId ) {
                        const user = await getMe(userId, response.data.access);
                        if ( user.status === 200) {
                            Cookies.set('info', JSON.stringify(user.data.data));
                            succesToastMessage('Giriş yapılıyor', 1500, 'top-right');
                            setTimeout(() => {
                             navigate('/');
                            }, 2000);
                        }
                    }
                }
             } catch (error) {
                errorToastMessage('Bilinmeyen bir hata ile karşılaşıldı', 1500, 'top-right');
             }
        }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-blue-700">
           <ToastContainer/>
            <div className="max-w-[500px] flex flex-col gap-3 items-center justify-center lg:w-1/5 h-4/6 border rounded-md p-2 login-layout">
                <div className="w-48 h-48">
                    <img src={LockGif} />
                </div>
            <Form
                  name="normal_login"
                  className="login-form w-full"
                  initialValues={{ remember: true }}
                  onFinish={onSubmit}
                >
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Lütfen e-mail giriniz!' }]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
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
                      Giriş Yap
                    </Button>
                    ya da <a href="/register">kayıt ol!</a>
                  </Form.Item>
                </Form>
            </div>
        </div>
    )
}
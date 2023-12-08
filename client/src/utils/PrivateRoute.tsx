import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// Kullanıcı login olmadığı sürece login sayfasına yönlendirme yapılıyor.

const PrivateRoute = () => {
    const accessToken = Cookies.get('access');

    return (
        accessToken ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoute;
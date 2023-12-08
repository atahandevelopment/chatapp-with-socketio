import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Chat from './pages/Chat';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/src/sweetalert2.scss'
import PrivateRoute from './utils/PrivateRoute';


const App: React.FC = () => {

  
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route element={<Chat/>} path='/' exact />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
};

export default App

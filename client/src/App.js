import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminForm from './pages/AdminForm';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminAnswer from './pages/AdminAnswer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserForm from './pages/UserForm';
import UserFormSubmitted from './pages/UserFormSubmitted';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/admin' element={<ProtectedRoute />}>
          <Route path='/admin/form' element={<AdminForm />} />
          <Route path='/admin/answer' element={<AdminAnswer />} />
          <Route path="/admin" element={<Navigate to="/admin/form" />} />
        </Route>
        <Route path="/" element={<UserForm />} />
        <Route path="/submitted" element={<UserFormSubmitted />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

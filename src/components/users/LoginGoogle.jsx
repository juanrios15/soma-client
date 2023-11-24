import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { loginGoogle } from '../../api/users.api';
import { useNavigate } from 'react-router-dom';


export function LoginGoogle() {
  const navigate = useNavigate();
  const handleLoginSuccess = async (response) => {
    console.log(response);
    const token = response.credential;
    const decoded = jwtDecode(token);
    console.log('Datos del Usuario:', decoded);
    const data = {
      google_id: token,
      email: decoded.email
    };

    try {
      const res = await loginGoogle(data);
      console.log("res", res);
      const backendToken = res.data.token;
      console.log('Token del Backend:', backendToken);
      localStorage.setItem('token', backendToken);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error al obtener el token del backend:', error);
    }
  };
  return (
    <div className='w-full max-w-sm mx-auto flex justify-center flex-col'>
      <div className='text-center py-4 font-extralight text-2xl'>
        Or login using google
      </div>
      <div className='self-center'>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log('Error')}
          scope="google-scope-1"
        />

      </div>
    </div>
  )
}

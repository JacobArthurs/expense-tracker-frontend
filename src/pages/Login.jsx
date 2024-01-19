import React from 'react';
import axios from 'axios';
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from 'react-router';

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

  const handleSubmit = async () => {
    try {
        const response = await axios.post('http://localhost:8080/api/authentication/login', {
          userName: username,
          password: password,
        });

        const token = response.data;

        if (token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            navigate('/');
        }
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Sign In</button>
    </div>
  );
};

export default Login
  
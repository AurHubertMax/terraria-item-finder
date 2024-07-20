import {useState} from 'react';
import api from '../api';
import {useNavigate} from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/Form.css';
import LoadingIndicator from './LoadingIndicator';
import {Link} from 'react-router-dom';

export default function Form({route, method}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login' ? 'Login' : 'Register';

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {

            const res = await api.post(route, {username, password});
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            } else {
                navigate('/login');
            }

        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input 
                className="form-input" 
                type='text' 
                value={username} 
                placeholder='Username' 
                onChange={

                    (e) => setUsername(e.target.value)
                } 
            />
            <input 
                className="form-input" 
                type='password' 
                value={password} 
                placeholder='Password' 
                onChange={
                    (e) => setPassword(e.target.value)
                } 
            />
            {loading && <LoadingIndicator />}
            <button 
                className="form-button" 
                type='submit'>
                    {name}
            </button>
            {method === 'login' && (
                <p>
                    Don't have an account? <Link to="/register/">Register</Link>
                </p>
            )}
            {method === 'register' && (
                <p>
                    Already have an account? <Link to="/login/">Login</Link>
                </p>
            )}
        </form>
    )
}
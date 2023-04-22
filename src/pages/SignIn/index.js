import React, {useState, useContext} from 'react'
import './signIn.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
    const { signIn, loadingAuth}  = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    async function handleSignIn(e){
        e.preventDefault();

        if(email !== '' && password !== '') {
            await signIn(email, password);
        }
    }

  return (
    <div className='container'>
        <div className='login'>
            <div className='login-area'>
                <img src={logo} alt='Logo do sistema de chamados' />
            </div>

            <form onSubmit={handleSignIn}>
                <h2>Entrar</h2>
                <input
                    type='email'
                    placeholder='email@exemple.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type='password'
                    placeholder='************'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type='submit'>{loadingAuth ? "Carregando" : "Acessar"}</button>
            </form>

            <Link to="/register">Não possui uma conta? Cadastre-se!</Link>
        </div>
    </div>
  )
}
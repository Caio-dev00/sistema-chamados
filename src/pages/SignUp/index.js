import { useContext, useState } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';


export default function SignUp() {
  const { signUp, loadingAuth } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleSubmit(e){
    e.preventDefault();

    if(nome !== '' || email !== '' || password !== ''){
        await signUp(email, password, nome);
        setNome('');
        setEmail('');
        setPassword('');
  }
}

  return (
    <div className='container'>
        <div className='login'>
            <div className='login-area'>
                <img src={logo} alt='Logo do sistema de chamados' />
            </div>

            <form onSubmit={handleSubmit}>
                <h2>Nova conta</h2>
                <input
                    type='text'
                    placeholder='Nome Completo'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

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

                <button type='submit'>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
            </form>

            <Link to="/">Já possuo uma conta!</Link>
        </div>
    </div>
  )
}
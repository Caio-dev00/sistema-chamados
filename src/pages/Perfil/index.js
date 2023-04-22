import { useContext, useState } from 'react';
import Header from '../../Components/Header';
import Title from '../../Components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';
import {toast} from 'react-toastify';

import { db, storage } from '../../services/firebaseConnection';
import { doc, updateDoc } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

import './profile.css';


export default function Perfil() {
    const { user, storageUser, setUser, logOut } = useContext(AuthContext);
    const [imageAvatar, setImageAvatar] = useState(null)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);

     function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image));
            }else{
                alert("Envie uma imagem do tipo PNG ou JPEG")
                setImageAvatar(null)
                return;
            }
        }
    }


    async function handleUpload(){
        const currentUid = user.uid;

        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

        const uploadTask = uploadBytes(uploadRef, imageAvatar)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then( async (downloadURL) => {
                let urlFoto = downloadURL;

                const docRef = doc(db, "users", user.uid)
                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    nome: nome, 
                })
                .then(() => {
                    let data = {
                        ...user,
                        avatarUrl: urlFoto,
                        nome: nome
                    }
    
                    setUser(data);
                    storageUser(data);
                    toast.success("Atualizado com sucesso!");
                })
            })
        })
        
    }



    async function handleSubmit(e){
        e.preventDefault();

        if(imageAvatar === null && nome !== ""){
            // Atualizar apenas o nome do user

            const docRef = doc(db, "users", user.uid)
            
            await updateDoc(docRef, {
                nome: nome
            })
            .then(() => {
                let data = {
                    ...user,
                    nome: nome
                }

                setUser(data);
                storageUser(data);
                toast.success("Atualizado com sucesso!");
            })
        }else if(nome !== "" && imageAvatar !== null){
            // Atualizar tanto nome quanto a foto
            handleUpload();
        }

    }



 return (
   <div>
    <Header/>

    <div className='content'>
        <Title name="Minha conta">
            <FiSettings size={25} color="#FFF" />
        </Title>

    <div className='container-area'>
        <form className='form-profile' onSubmit={handleSubmit}>
            <label className='label-avatar'>
                <span>
                    <FiUpload color='#FFF' size={25}/>
                </span>

                <input type="file" accept='image/*' onChange={handleFile}/><br/>
                {avatarUrl === null ? (
                    <img src={avatar} alt='Foto de perfil' width={250} height={250}/>
                ): (
                    <img src={avatarUrl} alt='Foto de perfil' width={250} height={250}/>
                )}
            </label>

            <label>Nome</label>
            <input type='text' value={nome} onChange={(e) => setNome(e.target.value)}/>
           
            <label>Email</label>
            <input type='text' value={email} disabled={true}/>

            <button type="submit">Salvar</button>

        </form>
    </div>

    <div className='container-area'>
        <button className='logout-btn' onClick={() => logOut()}>Sair</button>
    </div>

    </div>

   </div>
 );
}
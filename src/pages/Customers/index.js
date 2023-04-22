import { FiUser } from "react-icons/fi";
import Header from "../../Components/Header";
import Title from "../../Components/Title";
import { useState } from "react";
import {toast} from 'react-toastify';

import { db } from "../../services/firebaseConnection";
import { addDoc, collection} from 'firebase/firestore';



export default function Customers() {
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleRegister(e){
        e.preventDefault();

        if(nome !== "" && cnpj !== "" && endereco !== ""){
            await addDoc(collection(db, "customers"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(() => {
                setNome('');
                setCnpj('');
                setEndereco('');
                toast.success('Empressa Registrada')
            })
            .catch((error) => {
                console.log(error)
                toast.error("Erro ao fazer o cadastro.");
            })
        }else{
            toast.error("Preencha todos os campos!")
        }
    }

  return (
    <div>
        <Header/>

        <div className="content">
            <Title name="Clientes">
                <FiUser size={25} color="#FFF"/> 
            </Title>

            <div className="container-area">
                <form className="form-profile" onSubmit={handleRegister}> 
                    <label>Nome fantasia</label>

                    <input
                    type="text"
                    placeholder="Nome da empresa"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    />

                    <input
                    type="text"
                    placeholder="Dijite o CNPJ"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    />

                    <input
                    type="text"
                    placeholder="Endereço da empresa"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    />


                    <button type="submit">Salvar</button>

                </form>
            </div>
        </div>
    </div>
  )
}

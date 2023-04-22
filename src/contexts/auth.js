import { createContext, useState, useEffect } from "react";
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
export const AuthContext = createContext({});


export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      async function loadUser(){
        const storageUser = localStorage.getItem("@keyPRO")

        if(storageUser){
          setUser(JSON.parse(storageUser))
          setLoading(false);
        }

        setLoading(false);
      }

      loadUser();
    }, [])





    async function signIn(email, password){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
          let uid = value.user.uid;

          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef)

          let data = {
            uid: uid,
            nome: docSnap.data().nome,
            email: value.user.email,
            avatarUrl: docSnap.data().avatarUrl
          }
          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
          toast.success("Bem-vindo de volta!");
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          setLoadingAuth(false);
          toast.error("Ops algo deu errado!");
        })
    }




    async function signUp(email, password, nome){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
          let uid = value.user.uid;

          await setDoc(doc(db, "users", uid), {
            nome: nome,
            avatarUrl: null,
          })
          .then( () => {
          let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
              avatarUrl: null
          };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Seja bem-vindo ao sistema!")
            navigate("/dashboard")
          })


        })
        .catch((error) => {
          console.error(error);
          setLoadingAuth(false);
        })

    }



    async function logOut(){
      await signOut(auth);
      localStorage.removeItem("@keyPRO")
      setUser(null);
    }


    function storageUser(data){
      localStorage.setItem('@keyPRO', JSON.stringify(data));
    }


  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp, logOut, storageUser, setUser, loadingAuth, loading}}>
        {children}
    </AuthContext.Provider>
  )
}

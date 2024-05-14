"use client"

import Image from "next/image";
import {app, auth} from '@/app/firebase/config'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'


export default function Home() {
  const auth = getAuth()
  const router = useRouter()
  const googleProvider = new GoogleAuthProvider()

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider)     
    .then((response) => {
        sessionStorage.setItem('Token', response.user.accessToken)
        sessionStorage.setItem('userToken', response.user.email)
        sessionStorage.setItem('userName', response.user.displayName)
        sessionStorage.setItem('userPhoto', response.user.photoURL)
        console.log(sessionStorage.getItem('userToken'))
        router.push('/home')

    })   
}

useEffect(() => {
    let token = sessionStorage.getItem('Token')
    if (token){
      //  router.push('/home')
    }
}, [])

  return (
    <main className="w-full h-screen pt-7">
  
for real
<button onClick={signUpWithGoogle}>google</button>


   
    </main>
  );
}

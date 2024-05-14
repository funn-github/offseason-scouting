"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react'
//import { Inter } from 'next/font/google'
import {app, database} from '@/app/firebase/config'
import { useRouter } from 'next/navigation'
import { collection, addDoc, getDoc, doc, setDoc } from 'firebase/firestore';
//const inter = Inter({ subsets: ['latin'] })




 
export default function Home() {
  const [tokenData, setTokenData] = useState('')
  const [data, setData] = useState("hi")
  const router = useRouter()

  useEffect(() => {
    let tokenE = sessionStorage.getItem('Token')

    if (!tokenE){
        router.push('/')
    } else {
      setTokenData(sessionStorage.getItem('userToken'))
      getNotes(sessionStorage.getItem('userToken'));


    }
  }, [])


  async function getNotes(tokenD) {


    

    
    const docRef = doc(database, tokenD, "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data())
    } else {
      console.log("No such document!");
    }
  }







  const [attributes, setAttributes] = useState()
  const [YT, setYT] = useState()
  const [name, setName] = useState()


  async function generate(e){
    e.preventDefault()
    setAttributes(null)
    setName("ohio")
    const results = await fetch(`/api/generate/create?id=${name}`).then(r => r.json())
    setAttributes(results)
  
  }

  async function yt(e){
    e.preventDefault()
    setYT(null)
    const results = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCUM5NYvEX9AiTazIFhBMeEKlXv7MyDZsM&q=joji&type=video`).then(r => r.json())
    setYT(results)
    console.log(results.items[0].id.videoId)
  
  }

  const saveNote = () => {
    const dbInstance = collection(database, tokenData);
   setDoc(doc(dbInstance, "SF"), {
    name: "china" });
}

const logout = () => {
  sessionStorage.removeItem('Token')
  router.push('/')
}


  return (
    <main
      className={`flex flex-col items-center justify-between p-24`}
    >
     <button onClick={generate}>ai</button>
     <button onClick={yt}>yt</button>
     <button onClick={saveNote}>database</button>
     <button onClick={logout}>logout</button>
          <input defaultValue={name} onChange={event => setName(event.target.value)} placeholder={"mainState"}/>

          {attributes}
          
     {data.name}
    
    </main>
  )
}

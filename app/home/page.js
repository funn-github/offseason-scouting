"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { app, database } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

export default function Home() {
  const [tokenData, setTokenData] = useState("");
  const [data, setData] = useState("hi");
  const router = useRouter();

  useEffect(() => {
    /*
    let tokenE = sessionStorage.getItem('Token')

    if (!tokenE){
        router.push('/')
    } else {
      setTokenData(sessionStorage.getItem('userToken'))
      getNotes(sessionStorage.getItem('userToken'));


    }

    */
  }, []);

  async function getNotes(tokenD) {
    const docRef = doc(database, tokenD, "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  const [attributes, setAttributes] = useState();
  const [name, setName] = useState();

  const saveNote = () => {
    const dbInstance = collection(database, tokenData);
    setDoc(doc(dbInstance, "SF"), {
      name: name,
    });
  };

  /*

const logout = () => {
  sessionStorage.removeItem('Token')
  router.push('/')
}

*/

  return (
    <main className={`flex flex-col items-center justify-between p-24`}>
      <button onClick={saveNote}>database</button>
      {/*  <button onClick={logout}>logout</button> */}
      <input
        defaultValue={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={"mainState"}
      />

      {attributes}

      {data.name}
    </main>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { app, database } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

export default function Score() {







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
  const [jankiestPart, setJankiestPart] = useState();
  const [autoSetup, setAutoSetup] = useState();
  const [pickupPos, setPickupPos] = useState();
  const [notes, setNotes] = useState();
  const router = useRouter();


  const saveNote = () => {
    const dbInstance = collection(database, tokenData);
    setDoc(doc(dbInstance, "SF"), {
      name: name,
    });
  };

  const goEval = () => {
    router.push("/teameval");
  };

  const goHome = () => {
    router.push("/");
  };








  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full  max-w-5xl  ">
      <div className="mb-2 text-gray-700">kalanu 2024, model v2.2.7. online.</div>
        <div className="mb-4 text-gray-500">
          <span className="italic">currently scouting</span> team 604: Quixilver
        </div>

        <div className="mb-4 flex justify-between space-x-3">
          <textarea
            value={jankiestPart}
            onChange={(e) => setJankiestPart(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="jankiest part?"
          />

        </div>

        <div className="mb-4 flex justify-between space-x-3">
          <textarea
            value={autoSetup}
            onChange={(e) => setAutoSetup(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="preferred auto setup:"
          />

        </div>

        <div className="mb-4 flex justify-between space-x-3">
          <textarea
            value={pickupPos}
            onChange={(e) => setPickupPos(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="preferred pickup position:"
          />

        </div>

        <div className="mb-4 flex justify-between space-x-3">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="notes?"
          />

        </div>
        <button className="flex-1 p-5 bg-gray-200 rounded-lg mb-3 w-full">robot photo form</button>

        <div className="flex justify-between space-x-3">
          <button onClick={goHome} className="flex-1 p-5 bg-gray-200 rounded-lg">cancel report</button>
          <button className="flex-1 p-5 bg-gray-200 rounded-lg">submit report</button>
        </div>
      </div>
    </div>

  );
}

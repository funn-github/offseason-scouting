"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { app, database } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

export default function Score() {
  const [time, setTime] = useState(0);
  const [piecesScored, setPiecesScored] = useState(0);
  const totalDuration = 150; // 2 minutes and 30 seconds
  const router = useRouter();


  

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime < totalDuration) {
          return prevTime + 0.1;
        } else {
          clearInterval(interval);
          return prevTime;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);


  const getTimeDisplay = () => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toFixed(1);
    return `${minutes}m ${seconds}s`;
  };

  const getBarColor = () => {
    return time < 15 ? 'bg-red-500' : 'bg-blue-500';
  };


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

  const goEval = () => {
    router.push("/teameval");
  };

  const goHome = () => {
    router.push("/");
  };




  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full  max-w-5xl  ">
      <div className="mb-2 text-gray-700">kalanu 2024, model v2.2.7. online.</div>
        <div className="mb-4 text-gray-500">
          <span className="italic">currently scouting</span> team 604: Quixilver
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-gray-700">{getTimeDisplay()}</div>
          <div className="w-full h-10 mx-2 bg-gray-200 rounded-lg overflow-hidden">
            <div
              className={`${getBarColor()} h-full`}
              style={{ width: `${(time / totalDuration) * 100}%` }}
            ></div>
          </div>
          <button className="p-5 border-2 border-gray-500 rounded-lg text-gray-700">undo</button>
        </div>
        <div className="mb-4 flex justify-between space-x-3 mt-10">
          <button className="flex-1 p-5 bg-gray-200 rounded-lg">amp</button>
          <button className="flex-1 p-5 bg-gray-200 rounded-lg">speaker</button>
        </div>
        <div className="mb-4 text-gray-700 flex justify-center py-2"><div>pieces scored: {piecesScored}</div></div>
        <div className="flex justify-between space-x-3">
          <button onClick={goHome} className="flex-1 p-5 bg-gray-200 rounded-lg">cancel report</button>
          <button onClick={goEval} className="flex-1 p-5 bg-gray-200 rounded-lg">continue to team evaluation</button>
        </div>
      </div>
    </div>

  );
}

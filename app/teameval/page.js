"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { app, database } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

export default function Eval() {
  const router = useRouter();

  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState({
    broken: false,
    unstable: false,
    passing: false,
    defending: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setStatus((prevStatus) => ({ ...prevStatus, [name]: checked }));
  };

  const handleSubmit = () => {
    // Handle report submission logic
    console.log('Submitting report with status:', status, 'and notes:', notes);
    // After submitting, navigate to a different page or reset the form
  };

  const handleReturn = () => {
    router.push('/teamscoring');
  };

  const goHome = () => {
    router.push("/");
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

  const [name, setName] = useState();

  const saveNote = () => {
    const dbInstance = collection(database, tokenData);
    setDoc(doc(dbInstance, "SF"), {
      name: name,
    });
  };



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full  max-w-5xl  ">
      <div className="mb-2 text-gray-700">kalanu 2024, model v2.2.7. online.</div>
        <div className="mb-4 text-gray-500">
          <span className="italic">currently scouting</span> team 604: Quixilver
        </div>
        <div className="mb-4 flex justify-between space-x-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="broken"
              checked={status.broken}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span>broken</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="unstable"
              checked={status.unstable}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span>unstable</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="passing"
              checked={status.passing}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span>passing</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="defending"
              checked={status.defending}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span>defending</span>
          </label>
        </div>
        <div className="mb-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="notes"
          />
        </div>
        <div className="flex justify-between space-x-3">
          <button className=" flex-1 p-5 bg-gray-200 rounded-lg" onClick={handleReturn}>
            return to team scoring
          </button>
          <button onClick={goHome} className="flex-1 p-5 bg-gray-200 rounded-lg">
            return home
          </button>
          <button className="flex-1 p-5 bg-gray-200 rounded-lg" onClick={handleSubmit}>
            submit report
          </button>
        </div>
      </div>
    </div>


  );
}

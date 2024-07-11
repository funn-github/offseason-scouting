"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, setDoc, doc } from "firebase/firestore";
import { database } from "@/app/firebase/config";
import { nanoid } from "nanoid";

export default function PitScouting() {
  const [jankiestPart, setJankiestPart] = useState("");
  const [autoSetup, setAutoSetup] = useState("");
  const [pickupPos, setPickupPos] = useState("");
  const [notes, setNotes] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const pitId = nanoid(20); // Generating a unique id for each pit report
    const pitData = {
      jankiestPart,
      autoSetup,
      pickupPos,
      notes,
    };

    const dbInstance = collection(database, "pit");
    await setDoc(doc(dbInstance, pitId), pitData);

    console.log("Pit report submitted with data:", pitData);
    // After submitting, navigate to a different page or reset the form
  };

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="mb-2 text-gray-700">kalanu 2024, model v2.2.7. online.</div>
        <div className="mb-4 text-gray-500">
          <span className="italic">currently scouting</span> team 604: Quixilver
        </div>

        <div className="mb-4 flex justify-between space-x-3">
          <textarea
            value={jankiestPart}
            onChange={(e) => setJankiestPart(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="Jankiest part?"
          />
        </div>

        <div className="mb-4 flex justify-between space-x-3">
          <textarea
            value={autoSetup}
            onChange={(e) => setAutoSetup(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="Preferred auto setup:"
          />
        </div>

        <div className="mb-4 flex justify-between space-x-3">
          <textarea
            value={pickupPos}
            onChange={(e) => setPickupPos(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="Preferred pickup position:"
          />
        </div>

        <div className="mb-4 flex justify-between space-x-3">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="Notes?"
          />
        </div>
        
        <button className="flex-1 p-5 bg-gray-200 rounded-lg mb-3 w-full">robot photo form</button>

        <div className="flex justify-between space-x-3">
          <button onClick={goHome} className="flex-1 p-5 bg-gray-200 rounded-lg">Cancel Report</button>
          <button onClick={handleSubmit} className="flex-1 p-5 bg-gray-200 rounded-lg">Submit Report</button>
        </div>
      </div>
    </div>
  );
}

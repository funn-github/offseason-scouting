"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, setDoc, doc } from "firebase/firestore";
import { database } from "@/app/firebase/config";
import { nanoid } from "nanoid";

export default function PitScouting() {
  const [coralPickupType, setCoralPickupType] = useState("");
  const [overallNotes, setOverallNotes] = useState("");
  const [preferredAutoSetup, setPreferredAutoSetup] = useState("");
  const [preferredPickupPosition, setPreferredPickupPosition] = useState("");
  const [canDeAlgae, setCanDeAlgae] = useState(false);
  const [canKnockOrPickupAlgae, setCanKnockOrPickupAlgae] = useState(false);
  const router = useRouter();


  const [coralGroundPickup, setCoralGroundPickup] = useState(false);
  const [coralStationPickup, setCoralStationPickup] = useState(false);
  const [algaeReefPickup, setAlgaeReefPickup] = useState(false);
  const [algaeGroundPickup, setAlgaeGroundPickup] = useState(false);
  const [hangShallow, setHangShallow] = useState(false);
  const [hangDeep, setHangDeep] = useState(false);
  const [preferredCoralScoring, setPreferredCoralScoring] = useState("");
  const [teamName, setTeamName] = useState("");





  const handleSubmit = async () => {
    const pitId = nanoid(20);
    const pitData = {
      teamId: teamName,
      coralGroundPickup: coralGroundPickup,
      coralStationPickup: coralStationPickup,
      algaeReefPickup: algaeReefPickup,
      algaeGroundPickup: algaeGroundPickup,
      hangShallow: hangShallow,
      hangDeep: hangDeep,
      flowId: "pit",
      overallNotes: overallNotes,
      preferredAutoSetup: preferredAutoSetup,
      preferredCoralScoring: preferredCoralScoring,
      canKnockOrPickupAlgae: canKnockOrPickupAlgae,
      id: pitId,
    };

    
    //const dbInstance = collection(database, "pit");
    //await setDoc(doc(dbInstance, pitId), pitData);

    console.log("Pit report submitted with data:", pitData);
    
          // Get existing reports or initialize empty array
          const existingReports = JSON.parse(localStorage.getItem("pitDataList") || "[]");
      
          // Add new report
          existingReports.push(pitData);
          
          // Save back to localStorage
          localStorage.setItem("pitDataList", JSON.stringify(existingReports));

          goHome();
    // After submitting, navigate to a different page or reset the form
  };

  const goHome = () => {
    router.push("/");
  };

    useEffect(() => {
      setTeamName(sessionStorage.getItem("team"));
    }, []);
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="mb-2 text-gray-700">kalanu 2024, model v2.2.7. online.</div>
        <div className="mb-4 text-gray-500">
          <span className="italic">currently scouting</span> {teamName}
        </div>

<div className="flex w-full">
  {/*
        <div className="mb-4 w-1/2 pr-1">
          <label className="block text-gray-700 mb-2">Coral Pickup Type</label>
          <select
            value={coralPickupType}
            onChange={(e) => setCoralPickupType(e.target.value)}
            className="w-full p-3 border-2 border-gray-500 rounded-lg"
          >
            <option value="">Select pickup type</option>
            <option value="vertically">Ground</option>
            <option value="horizontally">Station</option>
            <option value="none">None</option>
          </select>
        </div> */ }

<div className="mb-4  w-1/2 pr-1">
<label className="block flex w-full text-gray-700 mb-2">Coral Pickup Type</label>
<div className="flex space-x-1 w-full">
          <label className="w-1/2 flex items-center  p-4 rounded-lg bg-gray-200">
            <input
              type="checkbox"
              checked={coralGroundPickup}
              onChange={(e) => setCoralGroundPickup(e.target.checked)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="text-gray-700">Ground</span>
          </label>
          <label className="w-1/2 flex items-center  p-4 rounded-lg bg-gray-200">
            <input
              type="checkbox"
              checked={coralStationPickup}
              onChange={(e) => setCoralStationPickup(e.target.checked)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="text-gray-700">Station</span>
          </label>
          </div>
        </div>

        <div className="mb-4  w-1/2 pr-1">
        <label className="block  text-gray-700 mb-2">Algae Pickup Type</label>
        <div className="flex space-x-1  w-full">
          <label className="flex items-center w-1/2 p-4 rounded-lg bg-gray-200">
            <input
              type="checkbox"
              checked={algaeReefPickup}
              onChange={(e) => setAlgaeReefPickup(e.target.checked)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="text-gray-700">Reef</span>
          </label>
          <label className="flex items-center w-1/2 p-4 rounded-lg bg-gray-200">
            <input
              type="checkbox"
              checked={algaeGroundPickup}
              onChange={(e) => setAlgaeGroundPickup(e.target.checked)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="text-gray-700">Ground</span>
          </label>
         </div>
        </div>
        

     {/*   <div className="mb-4 w-1/2 pl-1">
          <label className="block text-gray-700 mb-2">Algae Pickup Type</label>
          <select
            value={coralPickupType}
            onChange={(e) => setCoralPickupType(e.target.value)}
            className="w-full p-3 border-2 border-gray-500 rounded-lg"
          >
            <option value="">Select pickup type</option>
            <option value="vertically">Ground</option>
            <option value="horizontally">Reef</option>
            <option value="none">None</option>
          </select>
        </div> */}

        </div>

        <div className="mb-4">
          <textarea
            value={overallNotes}
            onChange={(e) => setOverallNotes(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="Overall notes"
          />
        </div>

        <div className="mb-4">
          <textarea
            value={preferredAutoSetup}
            onChange={(e) => setPreferredAutoSetup(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="Preferred auto setup"
          />
        </div>

        <div className="mb-4">
          <textarea
            value={preferredCoralScoring}
            onChange={(e) => setPreferredCoralScoring(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="Preferred coral scoring method"
          />
        </div>

 

        <div className="flex w-full">
        <div className="mb-4  w-1/2 pr-1">
        <label className="block  text-gray-700 mb-2">Hang Type</label>
        <div className="flex space-x-1  w-full">
          <label className="flex items-center w-1/2 p-4 rounded-lg bg-gray-200">
            <input
              type="checkbox"
              checked={hangShallow}
              onChange={(e) => setHangShallow(e.target.checked)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="text-gray-700">Shallow</span>
          </label>
          <label className="flex items-center w-1/2 p-4 rounded-lg bg-gray-200">
            <input
              type="checkbox"
              checked={hangDeep}
              onChange={(e) => setHangDeep(e.target.checked)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="text-gray-700">Deep</span>
          </label>
         </div>
        </div>

        <div className="mb-4 w-1/2 pr-1">
        <label className="block opacity-0 text-gray-700 mb-2">Algae Pickup Type</label>

          <label className="flex items-center space-x-2 p-4 rounded-lg bg-gray-200">
            <input
              type="checkbox"
              checked={canKnockOrPickupAlgae}
              onChange={(e) => setCanKnockOrPickupAlgae(e.target.checked)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="text-gray-700">Can Knock Algae</span>
          </label>
        </div>
</div>        

        <div className="flex justify-between space-x-3">
          <button onClick={goHome} className="flex-1 p-5 bg-gray-200 rounded-lg">Cancel Report</button>
          <button onClick={handleSubmit} className="flex-1 p-5 bg-gray-200 rounded-lg">Submit Report</button>
        </div>
      </div>
    </div>
  );
}
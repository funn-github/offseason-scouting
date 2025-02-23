"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, setDoc, doc } from "firebase/firestore";
import { database } from "@/app/firebase/config";
import { nanoid } from "nanoid";
import { useSearchParams } from "next/navigation";

export default function Eval() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState({
    broken: false,
    unstable: false,
    passing: false,
    defending: false,
    leftCommunityInAuto: false,
    parked: false,
    defense: false,
    canRemoveAlgae: false,
    groundAlgaePickup: false,
    groundCoralPickup: false,
    stationPickup: false,
    disabledComponentMistake: false,
  });
  const [humanSkill, setHumanSkill] = useState(1);
  const [humanDriverSkill, setHumanDriverSkill] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [eventKey, setEventKey] = useState("");

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setStatus((prevStatus) => ({ ...prevStatus, [name]: checked }));
  };

  /*
  const handleSubmit = async () => {
    const confirmationpr = confirm("Are you sure you want to submit this report?");

    if (confirmationpr) {
      const reportId = nanoid(20);
      const events = JSON.parse(searchParams.get("events")) || [];

      const matchid =
        sessionStorage.getItem("eventkey") + "_qm" + sessionStorage.getItem("match");

      const autonScoring =
        !searchParams.has("processorAuton") ||
        !searchParams.has("netAuton") ||
        !searchParams.has("L1Auton") ||
        !searchParams.has("L2Auton") ||
        !searchParams.has("L3Auton") ||
        !searchParams.has("L4Auton")
          ? false
          : true;

      const reportData = {
        appVersion: "1.2.5",
        data: {
          defend: status.defending,
          notes: notes,
          parked: status.parked,
          passing: status.passing,
          unstable: status.unstable,
          defense: status.defense,
          canRemoveAlgae: status.canRemoveAlgae,
          groundAlgaePickup: status.groundAlgaePickup,
          groundCoralPickup: status.groundCoralPickup,
          stationPickup: status.stationPickup,
          disabledComponentMistake: status.disabledComponentMistake,
          humanSkill: humanSkill,
          humanDriverSkill: humanDriverSkill,
        },
        eventId: sessionStorage.getItem("eventkey"),
        events,
        flowId: "scoring",
        id: reportId,
        matchId: matchid,
        modelId: "kalanu23",
        modelVersion: "2.2.7",
        start: Date.now(),
        teamId: teamName,
        year: 2024,
        processorAuton: searchParams.get("processorAuton"),
        processorTeleop: searchParams.get("processorTeleop"),
        netAuton: searchParams.get("netAuton"),
        netTeleop: searchParams.get("netTeleop"),
        L1Auton: searchParams.get("L1Auton"),
        L1Teleop: searchParams.get("L1Teleop"),
        L2Auton: searchParams.get("L2Auton"),
        L2Teleop: searchParams.get("L2Teleop"),
        L3Auton: searchParams.get("L3Auton"),
        L3Teleop: searchParams.get("L3Teleop"),
        L4Auton: searchParams.get("L4Auton"),
        L4Teleop: searchParams.get("L4Teleop"),
        droppedCoralAuton: searchParams.get("droppedCoralAuton"),
        droppedCoralTeleop: searchParams.get("droppedCoralTeleop"),
        droppedAlgeaAuton: searchParams.get("droppedAlgeaAuton"),
        droppedAlgeaTeleop: searchParams.get("droppedAlgeaTeleop"),
        parked: searchParams.get("parked"),
        leftCommunityInAuto: searchParams.get("leftCommunity"),
        hang: searchParams.get("hang"),
        canScoreAuton: autonScoring,
      };

      if (localStorage.getItem("reportDataList") === null) {
        localStorage.setItem("reportDataList", []);
      }



      //set item in local storage thats a string list of string report data
      localStorage.setItem("reportDataList", [...localStorage.getItem("reportDataList"), JSON.stringify(reportData)]);
      console.log(localStorage.getItem("reportDataList"))

      const dbInstance = collection(database, "report");
      await setDoc(doc(dbInstance, reportId), reportData);

      console.log("Report submitted with data:", reportData);
      goHome();
    }
  };
  */

  const handleSubmit = async () => {
    const confirmationpr = confirm("Are you sure you want to submit this report?");
  
    if (confirmationpr) {
      const reportId = nanoid(20);
      const events = JSON.parse(searchParams.get("events")) || [];
  
      const matchid =
        sessionStorage.getItem("eventkey") + "_qm" + sessionStorage.getItem("match");
  
      const autonScoring =
        !searchParams.has("processorAuton") ||
        !searchParams.has("netAuton") ||
        !searchParams.has("L1Auton") ||
        !searchParams.has("L2Auton") ||
        !searchParams.has("L3Auton") ||
        !searchParams.has("L4Auton")
          ? false
          : true;
  
      const reportData = {
        appVersion: "1.2.5",
        data: {
          defend: status.defending,
          notes: notes,
          parked: status.parked,
          unstable: status.unstable,
          defense: status.defense,
          disabledComponentMistake: status.disabledComponentMistake,
          humanDriverSkill: humanDriverSkill,
        },
        eventId: sessionStorage.getItem("eventkey"),
        events,
        flowId: "scoring",
        id: reportId,
        matchId: matchid,
        modelId: "kalanu23",
        modelVersion: "2.2.7",
        start: Date.now(),
        teamId: teamName,
        year: 2024,
        processorAuton: searchParams.get("processorAuton"),
        processorTeleop: searchParams.get("processorTeleop"),
        netAuton: searchParams.get("netAuton"),
        netTeleop: searchParams.get("netTeleop"),
        L1Auton: searchParams.get("L1Auton"),
        L1Teleop: searchParams.get("L1Teleop"),
        L2Auton: searchParams.get("L2Auton"),
        L2Teleop: searchParams.get("L2Teleop"),
        L3Auton: searchParams.get("L3Auton"),
        L3Teleop: searchParams.get("L3Teleop"),
        L4Auton: searchParams.get("L4Auton"),
        L4Teleop: searchParams.get("L4Teleop"),
        droppedCoralAuton: searchParams.get("droppedCoralAuton"),
        droppedCoralTeleop: searchParams.get("droppedCoralTeleop"),
        droppedAlgeaAuton: searchParams.get("droppedAlgeaAuton"),
        droppedAlgeaTeleop: searchParams.get("droppedAlgeaTeleop"),
        knockedAlgeaAuton: searchParams.get("knockedAlgeaAuton"),
        knockedAlgeaTeleop: searchParams.get("knockedAlgeaTeleop"),
        parked: searchParams.get("parked"),
        leftCommunityInAuto: searchParams.get("leftCommunity"),
        hang: searchParams.get("hang"),
        canScoreAuton: autonScoring,
      };
  
      // Get existing reports or initialize empty array
      const existingReports = JSON.parse(localStorage.getItem("reportDataList") || "[]");
      
      // Add new report
      existingReports.push(reportData);
      
      // Save back to localStorage
      localStorage.setItem("reportDataList", JSON.stringify(existingReports));
      
      console.log("Report saved locally:", reportData);
      goHome();
    }
  };

  const handleReturn = () => {
    router.push("/teamscoring");
  };

  const goHome = () => {
    router.push("/");
  };

  useEffect(() => {
    setTeamName(sessionStorage.getItem("team"));
    setEventKey(sessionStorage.getItem("eventkey"));
    console.log(eventKey);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="mb-2 text-gray-700">kalanu 2024, model v2.2.7. online.</div>
        <div className="mb-2 text-gray-500">
          <span className="italic">currently scouting</span> {teamName}
        </div>
        <div className="mb-4 flex space-y-3 flex-wrap ">

 
          <label className="flex scale-[98%] mt-3 items-center py-3 w-1/3 h-full space-y-3 justify-center px-2 bg-gray-200 rounded-lg h-auto">
            <input
              type="checkbox"
              name="defending"
              checked={status.defending}
              onChange={handleCheckboxChange}
              className="form-checkbox mr-2"
            />
            <span>Defending</span>
          </label>


          <label className="flex scale-[98%]  items-center py-3 w-1/3 h-full space-y-3 justify-center px-2 bg-gray-200 rounded-lg h-auto">
            <input
              type="checkbox"
              name="broken"
              checked={status.broken}
              onChange={handleCheckboxChange}
              className="form-checkbox mr-2"
            />
            <span>Unstable/Wobbly</span>
          </label>


  
         
          <label className="flex scale-[98%]  items-center py-3 w-1/3 h-full space-y-3 justify-center px-2 bg-gray-200 rounded-lg h-auto">
            <input
              type="checkbox"
              name="disabledComponentMistake"
              checked={status.disabledComponentMistake}
              onChange={handleCheckboxChange}
              className="form-checkbox mr-2"
            />
            <span>Disabled Component/Broken</span>
          </label>
        </div>
        <div className="flex ">
 
        <div className="mb-4 w-full mr-2">
          <label className=" text-gray-700 mb-3">Human Driver Skill</label>
          <select
            value={humanDriverSkill}
            onChange={(e) => setHumanDriverSkill(Number(e.target.value))}
            className="w-full p-2 border-2 border-gray-500 rounded-lg"
          >
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div className="mb-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="Notes"
          />
        </div>
        <div className="flex justify-between space-x-3">
          <button className="flex-1 p-5 bg-gray-200 rounded-lg" onClick={handleReturn}>
            Return to Team Scoring
          </button>
          <button onClick={goHome} className="flex-1 p-5 bg-gray-200 rounded-lg">
            Return Home
          </button>
          <button className="flex-1 p-5 bg-gray-200 rounded-lg" onClick={handleSubmit}>
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
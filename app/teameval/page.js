"use client";

import { useState } from "react";
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
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setStatus((prevStatus) => ({ ...prevStatus, [name]: checked }));
  };

  const handleSubmit = async () => {
    const reportId = nanoid(20);
    const reportData = {
      ampAuton: searchParams.get("ampAuton"),
      ampTeleop: searchParams.get("ampTeleop"),
      appVersion: "1.2.5",
      data: {},
      defend: status.defending,
      notes: notes,
      parked: false,
      passing: status.passing,
      unstable: status.unstable,
      eventId: "2024camb",
      events: Object.entries(status)
        .filter(([key, value]) => value)
        .map(([key]) => ({ id: key, phase: "teleop" })),
      flowId: "scoring",
      id: reportId,
      matchId: "2024camb_qm28",
      modelId: "kalanu23",
      modelVersion: "2.2.7",
      speakerAuton: searchParams.get("speakerAuton"),
      speakerTeleop: searchParams.get("speakerTeleop"),
      start: Date.now(),
      teamId: "frc9006",
      year: 2024,
    };

    const dbInstance = collection(database, "reports");
    await setDoc(doc(dbInstance, reportId), reportData);

    console.log("Report submitted with data:", reportData);
    // After submitting, navigate to a different page or reset the form
  };

  const handleReturn = () => {
    router.push("/teamscoring");
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
          <button className="flex-1 p-5 bg-gray-200 rounded-lg" onClick={handleReturn}>
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

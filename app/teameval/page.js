"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { collection, setDoc, doc } from "firebase/firestore";
import { database } from "@/app/firebase/config";
import { nanoid } from "nanoid";

export default function Eval() {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState({
    broken: false,
    unstable: false,
    passing: false,
    defending: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setStatus({
      broken: params.get("broken") === "true",
      unstable: params.get("unstable") === "true",
      passing: params.get("passing") === "true",
      defending: params.get("defending") === "true",
    });
    setNotes(params.get("notes") || "");
  }, []);

  const handleSubmit = async () => {
    const reportId = nanoid(20);
    const reportData = {
      ampAuton: parseInt(params.get("ampAuton")),
      ampTeleop: parseInt(params.get("ampTeleop")),
      appVersion: "1.2.5",
      data: {},
      defend: status.defending,
      notes: notes,
      parked: false,
      passing: status.passing,
      unstable: status.unstable,
      eventId: "2024camb",
      events: [
        { id: "amp", phase: params.get("ampAuton") ? "auton" : "teleop" },
        { id: "speaker", phase: params.get("speakerAuton") ? "auton" : "teleop" },
      ],
      flowId: "scoring",
      id: reportId,
      matchId: "2024camb_qm28",
      modelId: "kalanu23",
      modelVersion: "2.2.7",
      speakerAuton: params.get("speakerAuton"),
      speakerTeleop: params.get("speakerTeleop"),
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
              onChange={() => setStatus({ ...status, broken: !status.broken })}
              className="form-checkbox"
            />
            <span>broken</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="unstable"
              checked={status.unstable}
              onChange={() => setStatus({ ...status, unstable: !status.unstable })}
              className="form-checkbox"
            />
            <span>unstable</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="passing"
              checked={status.passing}
              onChange={() => setStatus({ ...status, passing: !status.passing })}
              className="form-checkbox"
            />
            <span>passing</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="defending"
              checked={status.defending}
              onChange={() => setStatus({ ...status, defending: !status.defending })}
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

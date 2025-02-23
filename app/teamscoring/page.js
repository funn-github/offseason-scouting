"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Score() {
  const [time, setTime] = useState(0);
  const [processorAuton, setprocessorAuton] = useState(0);
  const [processorTeleop, setprocessorTeleop] = useState(0);
  const [netAuton, setnetAuton] = useState(0);
  const [netTeleop, setnetTeleop] = useState(0);
  const [L1Auton, setL1Auton] = useState(0);
  const [L1Teleop, setL1Teleop] = useState(0);

  const [L2Auton, setL2Auton] = useState(0);
  const [L2Teleop, setL2Teleop] = useState(0);
  const [L3Auton, setL3Auton] = useState(0);
  const [L3Teleop, setL3Teleop] = useState(0);
  const [L4Auton, setL4Auton] = useState(0);
  const [L4Teleop, setL4Teleop] = useState(0);
  const [droppedCoralAuton, setDroppedCoralAuton] = useState(0);
  const [droppedCoralTeleop, setDroppedCoralTeleop] = useState(0);
  const [droppedCoralClicked, setDroppedCoralClicked] = useState(false);
  const [droppedAlgeaAuton, setDroppedAlgeaAuton] = useState(0);
  const [droppedAlgeaTeleop, setDroppedAlgeaTeleop] = useState(0);
  const [droppedAlgeaClicked, setDroppedAlgeaClicked] = useState(false);
  const [knockedAlgea, setKnockedAlgea] = useState(false);  
  const [knockedAlgeaAuton, setKnockedAlgeaAuton] = useState(0);
  const [knockedAlgeaTeleop, setKnockedAlgeaTeleop] = useState(0);

  const [pickedHang, setPickedHang] = useState(false);

  const [piecesScored, setPiecesScored] = useState(0);
  const totalDuration = 150; // 2 minutes and 30 seconds
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [processorClicked, setprocessorClicked] = useState(false);
  const [netClicked, setnetClicked] = useState(false);
  const [L1Clicked, setL1Clicked] = useState(false);
  const [L2Clicked, setL2Clicked] = useState(false);
  const [L3Clicked, setL3Clicked] = useState(false);
  const [L4Clicked, setL4Clicked] = useState(false);
  const [pickedAlgae, setPickedAlgae] = useState(false);
  const [leftCommunity, setLeftCommunity] = useState(false);
  const [parked, setParked] = useState(false);
  const [pickedCoral, setPickedCoral] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [hang, setHang] = useState("false");
  const [hangshallow, setHangshallow] = useState(false);
  const [hangdeep, setHangdeep] = useState(false);
  const [hangfailed, setHangfailed] = useState(false);

  // History state for undo functionality
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setTeamName(sessionStorage.getItem("team"));
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
    return time < 15 ? "bg-red-500" : "bg-blue-500";
  };

  // Save a snapshot of the current state (all values affected by events)
  const saveSnapshot = () => {
    setHistory((prev) => [
      ...prev,
      {
        processorAuton,
        processorTeleop,
        netAuton,
        netTeleop,
        L1Auton,
        L1Teleop,
        L2Auton,
        L2Teleop,
        L3Auton,
        L3Teleop,
        L4Auton,
        L4Teleop,
        droppedCoralAuton,
        droppedCoralTeleop,
        droppedAlgeaAuton,
        droppedAlgeaTeleop,
        knockedAlgeaAuton,
        knockedAlgeaTeleop,
        piecesScored,
        events: [...events],
        pickedAlgae,
        pickedCoral,
        pickedHang,
        leftCommunity,
        parked,
        hang,
        hangshallow,
        hangdeep,
        hangfailed,
      },
    ]);
  };

  // Undo the last event by reverting to the previous snapshot.
  const handleUndo = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) return prevHistory;
      const newHistory = [...prevHistory];
      const last = newHistory.pop();
      if (last) {
        setprocessorAuton(last.processorAuton);
        setprocessorTeleop(last.processorTeleop);
        setnetAuton(last.netAuton);
        setnetTeleop(last.netTeleop);
        setL1Auton(last.L1Auton);
        setL1Teleop(last.L1Teleop);
        setL2Auton(last.L2Auton);
        setL2Teleop(last.L2Teleop);
        setL3Auton(last.L3Auton);
        setL3Teleop(last.L3Teleop);
        setL4Auton(last.L4Auton);
        setL4Teleop(last.L4Teleop);
        setDroppedCoralAuton(last.droppedCoralAuton);
        setDroppedCoralTeleop(last.droppedCoralTeleop);
        setDroppedAlgeaAuton(last.droppedAlgeaAuton);
        setDroppedAlgeaTeleop(last.droppedAlgeaTeleop);
        setKnockedAlgeaAuton(last.knockedAlgeaAuton);
        setKnockedAlgeaTeleop(last.knockedAlgeaTeleop);
        setPiecesScored(last.piecesScored);
        setEvents(last.events);
        setPickedAlgae(last.pickedAlgae);
        setPickedCoral(last.pickedCoral);
        setPickedHang(last.pickedHang);
        setLeftCommunity(last.leftCommunity);
        setParked(last.parked);
        setHang(last.hang);
        setHangshallow(last.hangshallow);
        setHangdeep(last.hangdeep);
        setHangfailed(last.hangfailed);
      }
      return newHistory;
    });
  };

  const hangToggleClick = (id) => {
    saveSnapshot();
    setHangdeep(false);
    setHangshallow(false);
    setHangfailed(false);

    if (id === "shallow") {
      setHangshallow(!hangshallow);
      setHang("shallow");
    } else if (id === "deep") {
      setHangdeep(!hangdeep);
      setHang("deep");
    } else if (id === "hangfailed") {
      setHangfailed(!hangfailed);
      setHang("hangfailed");
    } else {
      setHangdeep(false);
      setHangshallow(false);
      setHangfailed(false);
    }
  };

  // When toggling among picked states, save snapshot if triggered by a button click.
  const handleButtonToggle = (id) => {
    if (id) saveSnapshot();
    setPickedAlgae(false);
    setPickedCoral(false);
    setPickedHang(false);

    if (id === "algae") {
      setPickedAlgae(!pickedAlgae);
    } else if (id === "coral") {
      setPickedCoral(!pickedCoral);
    } else if (id === "hang") {
      setPickedHang(!pickedHang);
    } else {
      setPickedAlgae(false);
      setPickedCoral(false);
      setPickedHang(false);
    }
  };

  const handleButtonClick = (id) => {
    saveSnapshot();
    const phase = time <= 15 ? "auton" : "teleop";
    setPiecesScored(piecesScored + 1);
    setEvents((prevEvents) => [...prevEvents, { id, phase }]);
    handleButtonToggle();
    if (id === "processor") {
      setprocessorClicked(true);
      setTimeout(() => setprocessorClicked(false), 500);
      if (phase === "auton") {
        setprocessorAuton(processorAuton + 1);
      } else if (phase === "teleop") {
        setprocessorTeleop(processorTeleop + 1);
      }
    } else if (id === "net") {
      setnetClicked(true);
      setTimeout(() => setnetClicked(false), 500);
      if (phase === "auton") {
        setnetAuton(netAuton + 1);
      } else if (phase === "teleop") {
        setnetTeleop(netTeleop + 1);
      }
    } else if (id === "L1") {
      setL1Clicked(true);
      setTimeout(() => setL1Clicked(false), 500);
      if (phase === "auton") {
        setL1Auton(L1Auton + 1);
      } else if (phase === "teleop") {
        setL1Teleop(L1Teleop + 1);
      }
    } else if (id === "L2") {
      setL2Clicked(true);
      setTimeout(() => setL2Clicked(false), 500);
      if (phase === "auton") {
        setL2Auton(L2Auton + 1);
      } else if (phase === "teleop") {
        setL2Teleop(L2Teleop + 1);
      }
    } else if (id === "L3") {
      setL3Clicked(true);
      setTimeout(() => setL3Clicked(false), 500);
      if (phase === "auton") {
        setL3Auton(L3Auton + 1);
      } else if (phase === "teleop") {
        setL3Teleop(L3Teleop + 1);
      }
    } else if (id === "L4") {
      setL4Clicked(true);
      setTimeout(() => setL4Clicked(false), 500);
      if (phase === "auton") {
        setL4Auton(L4Auton + 1);
      } else if (phase === "teleop") {
        setL4Teleop(L4Teleop + 1);
      }
    } else if (id === "droppedCoral") {
      setDroppedCoralClicked(true);
      setTimeout(() => setDroppedCoralClicked(false), 500);
      if (phase === "auton") {
        setDroppedCoralAuton(droppedCoralAuton + 1);
      } else if (phase === "teleop") {
        setDroppedCoralTeleop(droppedCoralTeleop + 1);
      }
    } else if (id === "droppedAlgea") {
      setDroppedAlgeaClicked(true);
      setTimeout(() => setDroppedAlgeaClicked(false), 500);
      if (phase === "auton") {
        setDroppedAlgeaAuton(droppedAlgeaAuton + 1);
      } else if (phase === "teleop") {
        setDroppedAlgeaTeleop(droppedAlgeaTeleop + 1);
      }
    } else if (id === "knockedAlgea") {
      setKnockedAlgea(true);
      setTimeout(() => setKnockedAlgea(false), 500);
      if (phase === "teleop") {
        setKnockedAlgeaTeleop(knockedAlgeaTeleop + 1);
      } else if (phase === "auton") {
        setKnockedAlgeaAuton(knockedAlgeaAuton + 1);
      }
    }
  };

  const goEval = () => {
    const params = new URLSearchParams({
      processorAuton: processorAuton,
      processorTeleop: processorTeleop,
      netAuton: netAuton,
      netTeleop: netTeleop,
      L1Auton: L1Auton,
      L1Teleop: L1Teleop,
      L2Auton: L2Auton,
      L2Teleop: L2Teleop,
      L3Auton: L3Auton,
      L3Teleop: L3Teleop,
      L4Auton: L4Auton,
      L4Teleop: L4Teleop,
      droppedCoralAuton: droppedCoralAuton,
      droppedCoralTeleop: droppedCoralTeleop,
      droppedAlgeaAuton: droppedAlgeaAuton,
      droppedAlgeaTeleop: droppedAlgeaTeleop,
      knockedAlgeaAuton: knockedAlgeaAuton,
      knockedAlgeaTeleop: knockedAlgeaTeleop,
      leftCommunity: leftCommunity,
      hang: hang,
      parked: parked,
      events: JSON.stringify(events)
    }).toString();

    router.push(`/teameval?${params}`);
  };

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400">
      <div className="bg-white py-6 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="mb-2 flex w-full text-gray-700 px-6">
        <div>  kalanu 2024, model v2.2.7. online.  </div>
          <div className="ml-auto"><span className="italic ">currently scouting</span> {teamName}</div>

        </div>
        
        <div className=" flex items-center px-6 justify-between">
          <div className="text-gray-700">{getTimeDisplay()}</div>
          <div className="w-full h-10 mx-2 bg-gray-200 rounded-lg overflow-hidden">
            <div
              className={`${getBarColor()} h-full`}
              style={{ width: `${(time / totalDuration) * 100}%` }}
            ></div>
          </div>
          <button
            className="p-5 border-2 border-gray-500 rounded-lg"
            onClick={handleUndo}
          >
            undo
          </button>
        </div>
        <div className="mb-4 text-gray-700 flex justify-center ">
          <div>pieces scored: {piecesScored}</div>
        </div>




          <div className="px-6 pt-4 pb-6 m bg-green-100 mt-4">
            <div className="text-lg font-semibold mb-2 text-gray-800">Algae:</div>
            <div className="font-medium flex justify-between space-x-3">
            <button
              className={`flex-1 p-5 ${processorClicked ? "bg-green-500" : "bg-green-300"} border-2 border-green-400 rounded-lg`}
              onClick={() => handleButtonClick("processor")}
            >
              processor
            </button>
            <button
              className={`flex-1 p-5 ${netClicked ? "bg-green-500" : "bg-green-300"} border-2 border-green-400 rounded-lg`}
              onClick={() => handleButtonClick("net")}
            >
              barge
            </button>
            </div>

          </div>


          <div className="  px-6 pt-4 pb-6 m bg-purple-100 ">
            <div className="text-lg font-semibold mb-2 text-gray-800">Coral:</div>
            <div className="font-medium flex justify-between space-x-3">
            <button
              className={`flex-1 p-5 ${L1Clicked ? "bg-purple-500" : "bg-purple-300"} border-2 border-purple-400 rounded-lg`}
              onClick={() => handleButtonClick("L1")}
            >
              L1
            </button>
            <button
              className={`flex-1 p-5 ${L2Clicked ? "bg-purple-500" : "bg-purple-300"} border-2 border-purple-400 rounded-lg`}
              onClick={() => handleButtonClick("L2")}
            >
              L2
            </button>
            <button
              className={`flex-1 p-5 ${L3Clicked ? "bg-purple-500" : "bg-purple-300"} border-2 border-purple-400 rounded-lg`}
              onClick={() => handleButtonClick("L3")}
            >
              L3
            </button>
            <button
              className={`flex-1 p-5 ${L4Clicked ? "bg-purple-500" : "bg-purple-300"} border-2 border-purple-400 rounded-lg`}
              onClick={() => handleButtonClick("L4")}
            >
              L4
            </button>

          
            </div>

          </div>

          <div className="w-full flex justify-center h-16 items-center ">...</div>


          <div className="mb-4  px-6 pt-4 pb-6 m bg-gray-200 ">
            <div className="text-lg font-semibold mb-2 text-gray-800">Endgame (Hang):</div>
            <div className="font-medium flex justify-between space-x-3">
            <button
              className={`flex-1 p-5 ${hangshallow ? "bg-gray-500" : "bg-gray-300"} border-2 border-gray-400 rounded-lg ${time < 15 ? "bg-gray-200 blur-sm" : ""}`}
              onClick={() => hangToggleClick("shallow")}
            >
              shallow
            </button>
            <button
              className={`flex-1 p-5 ${hangdeep ? "bg-gray-500" : "bg-gray-300"} border-2 border-gray-400 rounded-lg ${time < 15 ? "bg-gray-200 blur-sm" : ""}`}
              onClick={() => hangToggleClick("deep")}
            >
              deep
            </button>

          
            </div>

          </div>

     

       





        <div className="flex justify-between space-x-3 px-6">
          <button onClick={goHome} className="flex-1 p-5 bg-gray-200 rounded-lg">
            cancel report
          </button>
          <button onClick={goEval} className="flex-1 p-5 bg-gray-200 rounded-lg">
            continue to team evaluation
          </button>
        </div>
      </div>
    </div>
  );
}

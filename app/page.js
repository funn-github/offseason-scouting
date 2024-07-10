"use client";

import Image from "next/image";
import { app, auth } from "@/app/firebase/config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const teamNames = [
  "100: The Wildhats",
  "115: MVRT",
  "199: Deep Blue",
  "253: Boba Bots",
  "604: Quixilver",
  "649: MSET Fish",
  "670: Homestead Robotics",
  "840: Aragon Robotics Team",
  "841: The BioMechs",
  "846: The Funky Monkeys",
  "971: Spartan Robotics",
];

const compNames = [
  "San Francisco Regional",
  "Rocket City Regional",
  "Arkansas Regional presented by Harding University and Searcy A & P",
  "Ozark Mountain Brawl",
  "Southern Cross Regional",
  "West Australian Robotics Playoffs",
  "Arizona North Regional",
  "Arizona Robotics League - Qualifier 2",
  "Arizona Robotics League Qualifier 3",
];

export default function Home() {
  const auth = getAuth();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const [match, setMatch] = useState("");
  const [team, setTeam] = useState("");
  const [comp, setComp] = useState("");

  /*  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider)     
    .then((response) => {
        sessionStorage.setItem('Token', response.user.accessToken)
        sessionStorage.setItem('userToken', response.user.email)
        sessionStorage.setItem('userName', response.user.displayName)
        sessionStorage.setItem('userPhoto', response.user.photoURL)
        console.log(sessionStorage.getItem('userToken'))
        router.push('/home')

    })   
} */

  const goScoring = () => {
    router.push("/teamscoring");
  };

  const goEval = () => {
    router.push("/teameval");
  };

  const goPit = () => {
    router.push("/pitscouting");
  };



  useEffect(() => {
    /*  let token = sessionStorage.getItem('Token')
    if (token){
        router.push('/home')
    } */
    /* <button onClick={signUpWithGoogle}>google</button> */
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full  max-w-5xl  ">
        <div className="mb-4 text-center">
          <h1 className="text-gray-700">kalanu 2024, model v2.2.7. online.</h1>
        </div>
        <div className="mb-4 flex justify-between space-x-3">
          <button className="flex-1 p-5 border-2 border-gray-500 rounded-lg text-gray-700">
            2022
          </button>
          <div>
            <input
              type="text"
              list="comp-list"
              value={comp}
              onChange={(e) => setComp(e.target.value)}
              className="flex-1 p-5 border-2 border-gray-500 rounded-lg text-gray-700"
              placeholder="comp"
            />
            <datalist id="comp-list">
              {teamNames.map((compNames, index) => (
                <option key={index} value={compNames} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            list="match-list"
            value={match}
            onChange={(e) => setMatch(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="match"
          />
          <datalist id="match-list">
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={`Quals ${i + 1}`} />
            ))}
          </datalist>
        </div>
        <div className="mb-4">
          <input
            type="text"
            list="team-list"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="team"
          />
          <datalist id="team-list">
            {teamNames.map((teamName, index) => (
              <option key={index} value={teamName} />
            ))}
          </datalist>
        </div>
        <div className=" mt-3 space-y-3">
          <button
            onClick={goScoring}
            className="w-full p-5 bg-gray-200 rounded-lg"
          >
            start team scoring
          </button>
          <button onClick={goEval} className="w-full p-5 bg-gray-200 rounded-lg">
            start team evaluation
          </button>
          <button onClick={goPit} className="w-full p-5 bg-gray-200 rounded-lg">
            start pit scouting
          </button>
          <button className="w-full p-5 bg-gray-200 rounded-lg">
            clear
          </button>
        </div>
      </div>
    </div>
  );
}

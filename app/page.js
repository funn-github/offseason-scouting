"use client";

import Image from "next/image";
import { app, auth } from "@/app/firebase/config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
/*
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
]; */

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





/*

const apiUrl = "https://www.thebluealliance.com/api/v3/events/2023";
const apiKey = "K1yCyZ5gAuOoUBJmV1s4wSCMJsIbzHVTmfHZyHUtkAW62kNSJKnjy75O4MiSidZ9"; // Store API key in environment variable for security


const data = await fetch(apiUrl, {
  headers: {
    "X-TBA-Auth-Key": apiKey      // Use your actual API key here
  },
});

let posts = await data.json()

-----


export async function getServerSideProps() {
  const apiUrl = "https://www.thebluealliance.com/api/v3/events/2023";
  const apiKey = "K1yCyZ5gAuOoUBJmV1s4wSCMJsIbzHVTmfHZyHUtkAW62kNSJKnjy75O4MiSidZ9"; // Store API key in environment variable for security

  const res = await fetch(apiUrl, {
    headers: {
      "X-TBA-Auth-Key": apiKey,       // Use your actual API key here
    },
  });

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const events = await res.json();
  alert(events)

  return {
    props: {
      events,
    },
  };
}

*/

export default function Home() {
  const auth = getAuth();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const [match, setMatch] = useState("");
  const [team, setTeam] = useState("");
  const [comp, setComp] = useState("");
  const [numQuals, setNumQuals] = useState(4);
  const [eventNames, setEventNames] = useState([""]);
  const [eventKeys, setEventKeys] = useState([]);
  const [matchInfoState, setMatchInfoState] = useState([]);
  const [teamNames, setTeamName] = useState(["e"]);
  const [choosenEventKey, setChoosenEventKey] = useState("");



  async function fetchBlueMatches(eventname) {  

    
    const index = eventNames.indexOf(eventname)
    const eventKey = eventKeys[index]


    const apiUrl = `https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`;
    
    const apiKey = "K1yCyZ5gAuOoUBJmV1s4wSCMJsIbzHVTmfHZyHUtkAW62kNSJKnjy75O4MiSidZ9"; // Store API key in environment variable for security


    const data = await fetch(apiUrl, {
      headers: {
        "X-TBA-Auth-Key": apiKey      // Use your actual API key here
      },
    });

    let matches = await data.json()


    

      // Filter for qualification matches (comp_level: 'qm')
  const qualsMatches = matches.filter(match => match.comp_level === 'qm');

  let matchInfo = []

  // Loop through qualification matches and log match number + teams
  qualsMatches.forEach(match => {
    const matchNumber = match.match_number;
    const blueAlliance = match.alliances.blue.team_keys;
    const redAlliance = match.alliances.red.team_keys;

    matchInfo.push([matchNumber, blueAlliance, redAlliance]);
    
    

  });
  matchInfo.sort((a, b) => a[0] - b[0]);
  console.log(matchInfo)
  setNumQuals(matchInfo.length)
  setMatchInfoState(matchInfo)

  }
  
  

  async function fetchBlue() {  
    const apiUrl = "https://www.thebluealliance.com/api/v3/events/2023/simple";
    const apiKey = "K1yCyZ5gAuOoUBJmV1s4wSCMJsIbzHVTmfHZyHUtkAW62kNSJKnjy75O4MiSidZ9"; // Store API key in environment variable for security


    const data = await fetch(apiUrl, {
      headers: {
        "X-TBA-Auth-Key": apiKey      // Use your actual API key here
      },
    });

    let posts = await data.json()

    let names = []
    let keys = []

    for (let i = 0; i < posts.length; i++){
      names.push(posts[i]["name"])
      keys.push(posts[i]["key"])
    }

    setEventKeys(keys)
    setEventNames(names)
    console.log(names)



  }

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

  const updateTeam = (val) => {
    setTeam(val)
    sessionStorage.setItem('team', val)
  }

  const updateComp = (val) => {
    setComp(val)
    setChoosenEventKey(eventKeys[eventNames.indexOf(val)])
    sessionStorage.setItem('eventkey', eventKeys[eventNames.indexOf(val)])
    console.log(eventKeys[eventNames.indexOf(val)])

    console.log(choosenEventKey)

    let full = false
    for (let i = 0; i < eventNames.length; i++){
      if (eventNames[i] == val){
        full = true
      }
    }

    if (full){
    fetchBlueMatches(val)
    }
  }

  const updateMatch = (val) => {
    setMatch(val)
    let teamsMatch = []
    let teamObject = matchInfoState[Number(val.substring(6))]

    sessionStorage.setItem('match', val.substring(6))

    for (let i = 0; i < teamObject[1].length; i++){
      teamsMatch.push(teamObject[1][i])
    }

    for (let i = 0; i < teamObject[2].length; i++){
      teamsMatch.push(teamObject[2][i])
    }

  //  console.log(teamsMatch)
    setTeamName(teamsMatch)
   // const index = matchInfoState.indexOf(teamsMatch)
   // console.log(index)

  }



  useEffect(() => {
    fetchBlue()
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
              onChange={(e) => updateComp(e.target.value)}
              className="flex-1 p-5 border-2 border-gray-500 rounded-lg text-gray-700"
              placeholder="comp"
            />
            <datalist id="comp-list">
              {eventNames.map((eventNames, index) => (
                <option key={index} value={eventNames} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            list="match-list"
            value={match}
            onChange={(e) => updateMatch(e.target.value)}
            className="w-full p-5 border-2 border-gray-500 rounded-lg"
            placeholder="match"
          />
          <datalist id="match-list">
            {Array.from({ length: numQuals }, (_, i) => (
              <option key={i} value={`Quals ${i + 1}`} />
            ))}
          </datalist>
        </div>
        <div className="mb-4">
          <input
            type="text"
            list="team-list"
            value={team}
            onChange={(e) => updateTeam(e.target.value)}
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

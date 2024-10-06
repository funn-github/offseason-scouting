"use client";

import Image from "next/image";
import { app, auth } from "@/app/firebase/config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from 'react-select';

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

  const eventOptions = eventNames.map((eventName, index) => ({
    value: eventName,
    label: eventName,
  }));
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: '1rem',
      border: '2px solid gray',
      borderRadius: '8px',
      color: 'gray',
      width: '100%',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'lightgray' : 'white',
      color: 'black',
      padding: '1rem',
      width: '100%',

    }),
  };

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
    console.log(teamObject)

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

  const matchOptions = Array.from({ length: numQuals }, (_, i) => ({
    value: `Quals ${i + 1}`,
    label: `Quals ${i + 1}`,
  }));
  

  const teamOptions = teamNames.map((teamName, index) => ({
    value: teamName,
    label: teamName,
    index: index, // Add the index here
  }));
  
  
  const teamStyles = {
    control: (provided) => ({
      ...provided,
      padding: '1rem',
      border: '2px solid gray',
      borderRadius: '8px',
      color: 'gray',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? 'lightgray'
        : state.data.index < 3 ? '#b91c1c' : '#0369a1', // Use state.data.index for conditional coloring
      color: 'white',
      padding: '1rem',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#334155',
    }),
  };
  

  const clearAllInputs = () => {
    updateComp('');  // Clear the "comp" input field
    updateMatch(''); // Clear the "match" input field
    updateTeam('');  // Clear the "team" input field
  };
  

  return (
    <div className="h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full  max-w-5xl  ">
        <div className="mb-4 text-center">
          <h1 className="text-gray-700">kalanu 2024, model v2.2.7. online.</h1>
        </div>
        <div className="mb-4 flex justify-between space-x-3">
          <button className="w-1/2 p-5 border-2 border-gray-500 rounded-lg text-gray-700">
            2022
          </button>
          <div className="w-1/2 ">


            <Select
    value={{ value: comp, label: comp }}
    onChange={(selectedOption) => updateComp(selectedOption.value)}
    options={eventOptions}
    styles={customStyles}
    placeholder="comp"
    className="w-full "
    isSearchable
  />
          </div>



        </div>
        <div className="mb-4">
        <Select
    value={{ value: match, label: match }}
    onChange={(selectedOption) => updateMatch(selectedOption.value)}
    options={matchOptions}
    styles={customStyles}
    placeholder="match"
    isSearchable
  />
        </div>
        <div className="mb-4">
        <Select
    value={{ value: team, label: team }}
    onChange={(selectedOption) => updateTeam(selectedOption.value)}
    options={teamOptions}
    styles={teamStyles}
    placeholder="team"
    isSearchable
  />
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
          <button onClick={clearAllInputs} className="w-full p-5 bg-gray-200 rounded-lg">
            clear
          </button>
        </div>
      </div>
    </div>
  );
}

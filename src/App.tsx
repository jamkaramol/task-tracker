import React, { useState } from 'react';
import './App.scss';
import SwimLane from './components/SwimLane';
import { useSelector } from 'react-redux';
import { getAllTasks } from "./app/taskDetailsSlice";
import NavBar from './components/NavBar';

function App() {

  const allLanes = useSelector(getAllTasks);
  const keys = Object.keys(allLanes);
  let ALL_SWIM_LANES: any = [];

  keys.forEach((laneName) => {
    ALL_SWIM_LANES.push({
      label: laneName.split("_").join(" "),
      type: laneName
    })
  });

  return (
    <div className="container">
      <div>
        <NavBar />
      </div>
      <div className="lanes">
        {ALL_SWIM_LANES.map(({ label, type }: any) => {
          return <SwimLane key={type + label} label={label} type={type} />
        })}
      </div>
    </div>
  );
}

export default App;

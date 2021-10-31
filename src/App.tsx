import React from 'react';
import './App.scss';
import SwimLane from './components/SwimLane';
import { SWIM_LANE_TYPES } from './app/constants';

function App() {

  const ALL_SWIM_LANES = [
    {
      label: SWIM_LANE_TYPES.WENT_WELL.split("_").join(" "),
      type: SWIM_LANE_TYPES.WENT_WELL
    },
    {
      label: SWIM_LANE_TYPES.TO_IMPROVE.split("_").join(" "),
      type: SWIM_LANE_TYPES.TO_IMPROVE
    },
    {
      label: SWIM_LANE_TYPES.ACTION_ITEMS.split("_").join(" "),
      type: SWIM_LANE_TYPES.ACTION_ITEMS
    }
  ];

  return (
    <div className="container">
      {ALL_SWIM_LANES.map(({ label, type }) => {
        return <SwimLane key={type + label} label={label} type={type} />
      })}
    </div>
  );
}

export default App;

import CostDisplay from './components/CostDisplay/CostDisplay';
import NumericDisplay from './components/NumericDisplay/NumericDisplay';
import './App.css';
import { useState, useEffect } from 'react';
function App() {
  //app component
  const [points, setPoints] = useState(0); //set initial points to 0
  const [pointsPerSecond, setPointsPerSecond] = useState(0);
  const [autoClickers, setAutoClickers] = useState(0); //set auto clickers to 0
  const [clicks, setClicks] = useState(0); //set initial clicks pressed to 0
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [clickers, setClickers] = useState(1); //set clickers to 1
  const [seconds, setSeconds] = useState(0); //set initial seconds played to 0
  useEffect(() => {
    const interval = setInterval(() => {
      //increase points every second
      setPoints(points + pointsPerSecond); //increase points by points per second
      setSeconds(seconds + 1); //add 1 second
      updateClickers(); //update clickers value
      updateAutoClickers(); //update auto clickers value
    }, 1000);
    return () => {
      clearInterval(interval); //clear interval when component unmounts
    };
  }, [points, pointsPerSecond, seconds, updateAutoClickers, updateClickers]);
  function checkPointsForUpgrade(points, pointsRequired) {
    //check if user has enough points to upgrade
    if (pointsRequired !== 0 && points >= pointsRequired) {
      //make sure points required is not 0 and user has enough points to upgrade
      return true;
    } else {
      //not enough points required to upgrade
      return false;
    }
  }
  function updateClickers() {
    //update click multiplier for clickers
    setClickMultiplier(clickers); //set click multiplier
  }
  function updateAutoClickers() {
    //update points per second for autoclickers
    setPointsPerSecond(autoClickers); //set points per second
  }
  function addPointsFromClick() {
    //add points from clicking a button
    setPoints(points + clickMultiplier); //increase points by 1 when button clicked
    setClicks(clicks + 1); //increase clicks made by 1
  }
  function upgradeClicker() {
    //upgrade clicker (points per click)
    if (checkPointsForUpgrade(points, 10 * Math.pow(2, clickers - 1))) {
      setPoints(points - 10 * Math.pow(2, clickers - 1)); //spend points
      setClickers(clickers + 1); //increase clickers by 1
      updateClickers(); //update clickers value
    }
  }
  function upgradePointsPerSecond() {
    //upgrade points per second
    if (checkPointsForUpgrade(points, 10 * Math.pow(2, autoClickers))) {
      setPoints(points - 10 * Math.pow(2, autoClickers));
      setAutoClickers(autoClickers + 1); //increase autoclickers by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  return (
    //dynamic app HTML output
    <div className="App">
      {/*app context*/}
      <header className="App-header">
        {/*app header context*/}
        Endless Simple Idle Game
      </header>
      <p>Click the button to add points!</p>
      {/*display current points value*/}
      <p>
        Points:{" "}
        <span id="points-display">
          <NumericDisplay value={points} />
        </span>
      </p>
      {/*increase points from clicking a button*/}
      <button onClick={() => addPointsFromClick()}>Click to Add Points</button>
      <br />
      Clicker Level: <NumericDisplay value={clickers} shortForm={false} />
      <br />
      {/*upgrade clicker (points per click)*/}
      <button onClick={() => upgradeClicker()}>
        Upgrade Clicker (Points Per Click)
      </button>
      <CostDisplay cost={10 * Math.pow(2, clickers - 1)} />
      Autoclicker Level:{" "}
      <NumericDisplay value={autoClickers} shortForm={false} />
      <br />
      {/*upgrade points per second*/}
      <button onClick={() => upgradePointsPerSecond()}>
        Upgrade Points Per Second
      </button>
      <CostDisplay cost={10 * Math.pow(2, autoClickers)} />
    </div>
  );
}

export default App;

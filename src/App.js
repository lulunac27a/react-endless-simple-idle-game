import './App.css';
import { useState } from 'react';
function App() {
  //app compoment
  const [points, setPoints] = useState(0); //set initial points to 0
  const [clicks, setClicks] = useState(0); //set initial clicks pressed to 0
  const [clickMultiplier, setClickMultiplier] = useState(1);
  function addPointsFromClick() {
    //add points from clicking a button
    setPoints(points + clickMultiplier); //increase points by 1 when button clicked
    setClicks(clicks + clickMultiplier); //increase clicks made by 1
  }
  function upgradeClicker() {
    //upgrade clicker
    if (points >= Math.pow(2, clickMultiplier)) {
      setPoints(points - 10 * Math.pow(2, clickMultiplier - 1)); //spend points
      setClickMultiplier(clickMultiplier + 1); //increase click multiplier by 1
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
        Points: <div id="points-display">{points}</div>
      </p>
      {/*increase points from clicking a button*/}
      <button onClick={() => addPointsFromClick()}>Click to Add Points</button>
      {/*upgrade clicker button*/}
      <button onClick={() => upgradeClicker()}>Upgrade Clicker</button>
    </div>
  );
}

export default App;

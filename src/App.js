import './App.css';
import { useState } from 'react';
function App() {
  //app compoment
  const [points, setPoints] = useState(0); //set initial points to 0
  const [clicks, setClicks] = useState(0); //set initial clicks pressed to 0
  function addPointsFromClick() {
    //add points from clicking a button
    setPoints(points + 1); //increase points by 1 when button clicked
    setClicks(clicks + 1); //increase clicks made by 1
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
      {/*display current points value*/}Points:{" "}
      <div id="points-display">{points}</div>
      <br />
      {/*increase points from clicking a button*/}
      <button onClick={() => addPointsFromClick()}>Click to Add Points</button>
    </div>
  );
}

export default App;

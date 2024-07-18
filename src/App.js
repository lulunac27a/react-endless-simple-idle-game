import './App.css';
import { useState } from 'react';
function App() {
  //app compoment
  const [points, setPoints] = useState(0); //set initial points to 0
  function addPointsFromClick() {
    //add points from clicking a button
    setPoints(points + 1); //increase points by 1 when button clicked
  }
  return (
    //dynamic app HTML output
    <div className="App">
      <header className="App-header">Endless Simple Idle Game</header>
      <p>Click the button to add points!</p>
      Points: <div id="points-display">{points}</div>
      <br />
      <button onClick={() => addPointsFromClick()}>Click to Add Points</button>
    </div>
  );
}

export default App;

import './App.css';
import { useState } from 'react';
function App() {
  const [points, setPoints] = useState(0);
  function addPointsFromClick() {
    setPoints(points + 1);
  }
  return (
    <div className="App">
      <header className="App-header">
        Endless Simple Idle Game
      </header>
      <p>Click the button to add points!</p>
      Points: <div id="points-display">{points}</div><br />
      <button onClick={() => addPointsFromClick()}>Click to Add Points</button>
    </div>
  );
}

export default App;

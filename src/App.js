import './App.css';
import { useState } from 'react';
function App() {
  const [points, setPoints] = useState(0);
  function addPointsFromClick() {
    setPoints(points + 1);
  }
  return (
    <div className="App">
      Points: {points}<br />
      <button onClick={() => addPointsFromClick()}>Click to Add Points</button>
    </div>
  );
}

export default App;

import CostDisplay from './components/CostDisplay/CostDisplay';
import NumericDisplay from './components/NumericDisplay/NumericDisplay';
import './App.css';
import { useState, useEffect, useCallback } from 'react';
function App() {
  //app component
  const [points, setPoints] = useState(0); //set initial points to 0
  const [pointsPerSecond, setPointsPerSecond] = useState(0); //set initial points per second to 0
  const [autoClickers, setAutoClickers] = useState(0); //set initial auto clickers to 0
  const [autoClickersMultiplier, setAutoClickersMultiplier] = useState(1); //set initial auto clickers multiplier to 1
  const [autoClickersLevelBonus, setAutoClickersLevelBonus] = useState(0); //set initial auto clickers level bonus to 0
  const [autoClickersBonus, setAutoClickersBonus] = useState(0); //set initial auto clickers bonus to 0
  const [autoClickersBonusMultiplier, setAutoClickersBonusMultiplier] =
    useState(0); //set initial auto clickers bonus multiplier to 0
  const [clicks, setClicks] = useState(0); //set initial clicks pressed to 0
  const [clickMultiplier, setClickMultiplier] = useState(1); //set initial click multiplier to 1
  const [clickersMultiplier, setClickersMultiplier] = useState(1); //set initial clickers multiplier to 1
  const [timeMultiplierBonus, setTimeMultiplierBonus] = useState(0); //set initial time multiplier bonus to 0
  const [clickMultiplierBonus, setClickMultiplierBonus] = useState(0); //set initial click multiplier bonus to 0
  const [clickerBonus, setClickerBonus] = useState(0); //set initial clicker bonus to 0
  const [clickers, setClickers] = useState(1); //set initial clickers to 1
  const [seconds, setSeconds] = useState(0); //set initial seconds played to 0
  const updateClickers = useCallback(() => {
    //update click multiplier for clickers
    setClickMultiplier(
      (prevMultiplier) =>
        clickers * clickersMultiplier + (pointsPerSecond * clickerBonus) / 100,
    ); //set click multiplier
  }, [clickers, clickersMultiplier, pointsPerSecond, clickerBonus]);
  const updateAutoClickers = useCallback(() => {
    //update points per second for autoclickers
    setPointsPerSecond(
      (prevPointsPerSecond) =>
        autoClickers *
        autoClickersMultiplier *
        (1 + (autoClickersLevelBonus * autoClickers) / 100) *
        (1 +
          (autoClickersBonus *
            (autoClickers +
              autoClickersMultiplier +
              autoClickersLevelBonus +
              autoClickersBonus +
              autoClickersBonusMultiplier)) /
          100) *
        (1 +
          (autoClickersBonusMultiplier *
            (autoClickers +
              autoClickersMultiplier * 2 +
              autoClickersLevelBonus * 3 +
              autoClickersBonus * 4 +
              autoClickersBonusMultiplier * 5)) /
          100) *
        (1 + (timeMultiplierBonus * seconds) / 10000) *
        (1 + (clickMultiplierBonus * clicks) / 10000),
    ); //set points per second
  }, [
    autoClickers,
    autoClickersBonus,
    autoClickersBonusMultiplier,
    autoClickersLevelBonus,
    autoClickersMultiplier,
    clickMultiplierBonus,
    clicks,
    seconds,
    timeMultiplierBonus,
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      //increase points every second
      setPoints((prevPoints) => prevPoints + pointsPerSecond); //increase points by points per second
      setSeconds((prevSeconds) => prevSeconds + 1); //add 1 second
      updateClickers(); //update clickers value
      updateAutoClickers(); //update auto clickers value
    }, 1000);
    return () => {
      clearInterval(interval); //clear interval when component unmounts
    };
  }, [pointsPerSecond, updateAutoClickers, updateClickers]);

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

  function addPointsFromClick() {
    //add points from clicking a button
    setPoints((prevPoints) => prevPoints + clickMultiplier); //increase points by 1 when button clicked
    setClicks((prevClicks) => prevClicks + 1); //increase clicks made by 1
  }
  function upgradeClicker() {
    //upgrade clicker (points per click)
    if (checkPointsForUpgrade(points, 10 * Math.pow(2, clickers - 1))) {
      setPoints((prevPoints) => prevPoints - 10 * Math.pow(2, clickers - 1)); //spend points
      setClickers((prevClickers) => prevClickers + 1); //increase clickers by 1
      updateClickers(); //update clickers value
    }
  }
  function upgradeClickerMultiplier() {
    //upgrade clicker multiplier (points per click)
    if (
      checkPointsForUpgrade(points, 100 * Math.pow(2, clickersMultiplier - 1))
    ) {
      setPoints(
        (prevPoints) => prevPoints - 100 * Math.pow(2, clickersMultiplier - 1),
      ); //spend points
      setClickersMultiplier(
        (prevClickersMultiplier) => prevClickersMultiplier + 1,
      ); //increase clickers multiplier by 1
      updateClickers(); //update clickers value
    }
  }
  function upgradeAutoClicker() {
    //upgrade autoclicker
    if (checkPointsForUpgrade(points, 10 * Math.pow(2, autoClickers))) {
      setPoints((prevPoints) => prevPoints - 10 * Math.pow(2, autoClickers));
      setAutoClickers((prevAutoClickers) => prevAutoClickers + 1); //increase autoclickers by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  function upgradeAutoClickerMultiplier() {
    //upgrade autoclicker multiplier
    if (
      checkPointsForUpgrade(
        points,
        100 * Math.pow(2, autoClickersMultiplier - 1),
      )
    ) {
      setPoints(
        (prevPoints) =>
          prevPoints - 100 * Math.pow(2, autoClickersMultiplier - 1),
      );
      setAutoClickersMultiplier(
        (prevAutoClickersMultiplier) => prevAutoClickersMultiplier + 1,
      ); //increase autoclickers multiplier by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  function upgradeAutoClickerLevelBonus() {
    //upgrade autoclicker level bonus
    if (
      checkPointsForUpgrade(points, 1e3 * Math.pow(2, autoClickersLevelBonus))
    ) {
      setPoints(
        (prevPoints) => prevPoints - 1e3 * Math.pow(2, autoClickersLevelBonus),
      );
      setAutoClickersLevelBonus(
        (prevAutoClickersLevelBonus) => prevAutoClickersLevelBonus + 1,
      ); //increase autoclickers level bonus by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  function upgradeAutoClickerBonus() {
    //upgrade autoclicker bonus based on number of upgrades bought
    if (checkPointsForUpgrade(points, 1e4 * Math.pow(3, autoClickersBonus))) {
      setPoints(
        (prevPoints) => prevPoints - 1e4 * Math.pow(3, autoClickersBonus),
      );
      setAutoClickersBonus(
        (prevAutoClickersBonus) => prevAutoClickersBonus + 1,
      ); //increase autoclickers bonus by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  function upgradeAutoClickerBonusMultiplier() {
    //upgrade autoclicker bonus multiplier based on number of upgrades bought with more expensive upgrades gets more multiplier
    if (
      checkPointsForUpgrade(
        points,
        1e5 * Math.pow(5, autoClickersBonusMultiplier),
      )
    ) {
      setPoints(
        (prevPoints) =>
          prevPoints - 1e5 * Math.pow(5, autoClickersBonusMultiplier),
      );
      setAutoClickersBonusMultiplier(
        (prevAutoClickersBonusMultiplier) =>
          prevAutoClickersBonusMultiplier + 1,
      ); //increase autoclickers bonus multiplier by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  function upgradeTimeMultiplierBonus() {
    //upgrade time multiplier bonus based on number of seconds passed
    if (
      checkPointsForUpgrade(points, 2.5e3 * Math.pow(10, timeMultiplierBonus))
    ) {
      setPoints(
        (prevPoints) => prevPoints - 2.5e3 * Math.pow(10, timeMultiplierBonus),
      );
      setTimeMultiplierBonus(
        (prevTimeMultiplierBonus) => prevTimeMultiplierBonus + 1,
      ); //increase time multiplier bonus by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  function upgradeClickMultiplierBonus() {
    //upgrade click multiplier bonus based on number of seconds passed
    if (
      checkPointsForUpgrade(points, 5e3 * Math.pow(10, clickMultiplierBonus))
    ) {
      setPoints(
        (prevPoints) => prevPoints - 5e3 * Math.pow(10, clickMultiplierBonus),
      );
      setClickMultiplierBonus(
        (prevClickMultiplierBonus) => prevClickMultiplierBonus + 1,
      ); //increase click multiplier bonus by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  function upgradeClickerBonus() {
    //upgrade clicker bonus based on points per second
    if (checkPointsForUpgrade(points, 1e3 * Math.pow(10, clickerBonus))) {
      setPoints((prevPoints) => prevPoints - 1e3 * Math.pow(10, clickerBonus));
      setClickerBonus((prevClickerBonus) => prevClickerBonus + 1); //increase clicker bonus by 1
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
      {/*display points per click value*/}
      <p>
        Points per click:{" "}
        <span id="points-display">
          <NumericDisplay value={clickMultiplier} />
        </span>
      </p>
      {/*display points per second value*/}
      <p>
        Points per second:{" "}
        <span id="points-display">
          <NumericDisplay value={pointsPerSecond} />
        </span>
      </p>
      {/*increase points from clicking a button*/}
      <button onClick={() => addPointsFromClick()}>Click to Add Points</button>
      <br />
      Clicker Level: <NumericDisplay value={clickers} shortForm={false} />
      <br />
      {/*upgrade clicker (points per click)*/}
      <button onClick={() => upgradeClicker()}>Upgrade Clicker</button>
      <CostDisplay cost={10 * Math.pow(2, clickers - 1)} />
      Clicker Multiplier Level:{" "}
      <NumericDisplay value={clickersMultiplier} shortForm={false} />
      <br />
      {/*upgrade clicker multiplier*/}
      <button onClick={() => upgradeClickerMultiplier()}>
        Upgrade Clicker Multiplier
      </button>
      <CostDisplay cost={100 * Math.pow(2, clickersMultiplier - 1)} />
      Time Multiplier Bonus:{" "}
      <NumericDisplay value={timeMultiplierBonus} shortForm={false} />
      <br />
      {/*upgrade time multiplier bonus*/}
      <button onClick={() => upgradeTimeMultiplierBonus()}>
        Upgrade Time Multiplier Bonus
      </button>
      <CostDisplay cost={2.5e3 * Math.pow(10, timeMultiplierBonus)} />
      Click Multiplier Bonus:{" "}
      <NumericDisplay value={clickMultiplierBonus} shortForm={false} />
      <br />
      {/*upgrade click multiplier bonus*/}
      <button onClick={() => upgradeClickMultiplierBonus()}>
        Upgrade Click Multiplier Bonus
      </button>
      <CostDisplay cost={5e3 * Math.pow(10, clickMultiplierBonus)} />
      Clicker Bonus: <NumericDisplay value={clickerBonus} shortForm={false} />
      <br />
      {/*upgrade clicker bonus*/}
      <button onClick={() => upgradeClickerBonus()}>
        Upgrade Clicker Bonus
      </button>
      <CostDisplay cost={1e3 * Math.pow(10, clickerBonus)} />
      Autoclicker Level:{" "}
      <NumericDisplay value={autoClickers} shortForm={false} />
      <br />
      {/*upgrade autoclicker (points per second)*/}
      <button onClick={() => upgradeAutoClicker()}>Upgrade Autoclicker</button>
      <CostDisplay cost={10 * Math.pow(2, autoClickers)} />
      Autoclicker Multiplier Level:{" "}
      <NumericDisplay value={autoClickersMultiplier} shortForm={false} />
      <br />
      {/*upgrade autoclicker multiplier*/}
      <button onClick={() => upgradeAutoClickerMultiplier()}>
        Upgrade Autoclicker Multiplier
      </button>
      <CostDisplay cost={100 * Math.pow(2, autoClickersMultiplier - 1)} />
      Autoclicker Level Bonus:{" "}
      <NumericDisplay value={autoClickersLevelBonus} shortForm={false} />
      <br />
      {/*upgrade autoclicker level bonus*/}
      <button onClick={() => upgradeAutoClickerLevelBonus()}>
        Upgrade Autoclicker Level Bonus
      </button>
      <CostDisplay cost={1e3 * Math.pow(2, autoClickersLevelBonus)} />
      Autoclicker Bonus:{" "}
      <NumericDisplay value={autoClickersBonus} shortForm={false} />
      <br />
      {/*upgrade autoclicker bonus*/}
      <button onClick={() => upgradeAutoClickerBonus()}>
        Upgrade Autoclicker Bonus
      </button>
      <CostDisplay cost={1e4 * Math.pow(3, autoClickersBonus)} />
      Autoclicker Bonus Multiplier:{" "}
      <NumericDisplay value={autoClickersBonus} shortForm={false} />
      <br />
      {/*upgrade autoclicker bonus multiplier*/}
      <button onClick={() => upgradeAutoClickerBonusMultiplier()}>
        Upgrade Autoclicker Bonus Multiplier
      </button>
      <CostDisplay cost={1e5 * Math.pow(5, autoClickersBonusMultiplier)} />
    </div>
  );
}

export default App;

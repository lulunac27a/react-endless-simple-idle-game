import CostDisplay from './components/CostDisplay/CostDisplay';
import NumericDisplay from './components/NumericDisplay/NumericDisplay';
import './App.css';
import { useState, useEffect, useCallback } from 'react';
function App() {
  //app component
  const [points, setPoints] = useState(0); //set initial points to 0
  const [pointsPerSecond, setPointsPerSecond] = useState(0); //set initial points per second to 0
  const [maxLevel, setMaxLevel] = useState(1); //set max level to 1
  const [autoClickers, setAutoClickers] = useState([{ value: 0, level: 1 }]); //set initial auto clickers to 0
  const [autoClickersMultiplier, setAutoClickersMultiplier] = useState([
    { value: 1, level: 1 },
  ]); //set initial auto clickers multiplier to 1
  const [autoClickersLevelBonus, setAutoClickersLevelBonus] = useState([
    { value: 0, level: 1 },
  ]); //set initial auto clickers level bonus to 0
  const [autoClickersBonus, setAutoClickersBonus] = useState([
    { value: 0, level: 1 },
  ]); //set initial auto clickers bonus to 0
  const [autoClickersBonusMultiplier, setAutoClickersBonusMultiplier] =
    useState([{ value: 0, level: 1 }]); //set initial auto clickers bonus multiplier to 0
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
    setPointsPerSecond((prevPointsPerSecond) =>
      autoClickers.reduce(
        (sum, clicker) =>
          sum +
          clicker.value *
          autoClickersMultiplier[clicker.level - 1].value *
          (1 +
            (autoClickersLevelBonus[clicker.level - 1].value *
              clicker.value) /
            100) *
          (1 +
            (autoClickersBonus[clicker.level - 1].value *
              (clicker.value +
                autoClickersMultiplier[clicker.level - 1].value +
                autoClickersLevelBonus[clicker.level - 1].value +
                autoClickersBonus[clicker.level - 1].value +
                autoClickersBonusMultiplier[clicker.level - 1].value)) /
            100) *
          (1 +
            (autoClickersBonusMultiplier[clicker.level - 1].value *
              (clicker.value +
                autoClickersMultiplier[clicker.level - 1].value * 2 +
                autoClickersLevelBonus[clicker.level - 1].value * 3 +
                autoClickersBonus[clicker.level - 1].value * 4 +
                autoClickersBonusMultiplier[clicker.level - 1].value * 5)) /
            100) *
          (1 + (timeMultiplierBonus * seconds) / 10000) *
          (1 + (clickMultiplierBonus * clicks) / 10000) *
          clicker.level,
        0,
      ),
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
    updateClickers(); //update clickers value
    updateAutoClickers(); //update auto clickers value
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
  function upgradeAutoClicker(level) {
    //upgrade autoclicker
    if (
      checkPointsForUpgrade(
        points,
        10 *
        Math.pow(2, autoClickers[level - 1].value) *
        Math.pow(10, level - 1),
      )
    ) {
      setPoints(
        (prevPoints) =>
          prevPoints -
          10 *
          Math.pow(2, autoClickers[level - 1].value) *
          Math.pow(10, level - 1),
      );
      setAutoClickers((prevAutoClickers) =>
        prevAutoClickers.map((lvl) =>
          lvl.level === level
            ? Object.assign({}, lvl, {
              value: prevAutoClickers[lvl.level - 1].value + 1,
            })
            : lvl,
        ),
      ); //increase autoclickers by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  function upgradeAutoClickerMultiplier(level) {
    //upgrade autoclicker multiplier
    if (
      checkPointsForUpgrade(
        points,
        100 *
        Math.pow(2, autoClickersMultiplier[level - 1].value - 1) *
        Math.pow(10, level - 1),
      )
    ) {
      setPoints(
        (prevPoints) =>
          prevPoints -
          100 *
          Math.pow(2, autoClickersMultiplier[level - 1].value - 1) *
          Math.pow(10, level - 1),
      );
      setAutoClickersMultiplier((prevAutoClickersMultiplier) =>
        prevAutoClickersMultiplier.map((lvl) =>
          lvl.level === level
            ? Object.assign({}, lvl, {
              value: prevAutoClickersMultiplier[lvl.level - 1].value + 1,
            })
            : lvl,
        ),
      ); //increase autoclickers multiplier by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  function upgradeAutoClickerLevelBonus(level) {
    //upgrade autoclicker level bonus
    if (
      checkPointsForUpgrade(
        points,
        1e3 *
        Math.pow(2, autoClickersLevelBonus[level - 1].value) *
        Math.pow(10, level - 1),
      )
    ) {
      setPoints(
        (prevPoints) =>
          prevPoints -
          1e3 *
          Math.pow(2, autoClickersLevelBonus[level - 1].value) *
          Math.pow(10, level - 1),
      );
      setAutoClickersLevelBonus((prevAutoClickersLevelBonus) =>
        prevAutoClickersLevelBonus.map((lvl) =>
          lvl.level === level
            ? Object.assign({}, lvl, {
              value: prevAutoClickersLevelBonus[lvl.level - 1].value + 1,
            })
            : lvl,
        ),
      ); //increase autoclickers level bonus by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  function upgradeAutoClickerBonus(level) {
    //upgrade autoclicker bonus based on number of upgrades bought
    if (
      checkPointsForUpgrade(
        points,
        1e4 *
        Math.pow(3, autoClickersBonus[level - 1].value) *
        Math.pow(10, level - 1),
      )
    ) {
      setPoints(
        (prevPoints) =>
          prevPoints -
          1e4 *
          Math.pow(3, autoClickersBonus[level - 1].value) *
          Math.pow(10, level - 1),
      );
      setAutoClickersBonus((prevAutoClickersBonus) =>
        prevAutoClickersBonus.map((lvl) =>
          lvl.level === level
            ? Object.assign({}, lvl, {
              value: prevAutoClickersBonus[lvl.level - 1].value + 1,
            })
            : lvl,
        ),
      ); //increase autoclickers bonus by 1
      updateAutoClickers(); //update auto clickers value
    }
  }
  function upgradeAutoClickerBonusMultiplier(level) {
    //upgrade autoclicker bonus multiplier based on number of upgrades bought with more expensive upgrades gets more multiplier
    if (
      checkPointsForUpgrade(
        points,
        1e5 *
        Math.pow(5, autoClickersBonusMultiplier[level - 1].value) *
        Math.pow(10, level - 1),
      )
    ) {
      setPoints(
        (prevPoints) =>
          prevPoints -
          1e5 *
          Math.pow(5, autoClickersBonusMultiplier[level - 1].value) *
          Math.pow(10, level - 1),
      );
      setAutoClickersBonusMultiplier((prevAutoClickersBonusMultiplier) =>
        prevAutoClickersBonusMultiplier.map((lvl) =>
          lvl.level === level
            ? Object.assign({}, lvl, {
              value: prevAutoClickersBonusMultiplier[lvl.level - 1].value + 1,
            })
            : lvl,
        ),
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
  function upgradeMaxLevel() {
    //upgrade max level
    if (checkPointsForUpgrade(points, 100 * Math.pow(10, maxLevel - 1))) {
      setPoints((prevPoints) => prevPoints - 100 * Math.pow(10, maxLevel - 1));
      setAutoClickers((prevAutoClickers) => [
        ...prevAutoClickers,
        { value: 0, level: maxLevel + 1 },
      ]); //append autoclickers value to end of array
      setAutoClickersMultiplier((prevAutoClickersMultiplier) => [
        ...prevAutoClickersMultiplier,
        { value: 1, level: maxLevel + 1 },
      ]);
      setAutoClickersLevelBonus((prevAutoClickersLevelBonus) => [
        ...prevAutoClickersLevelBonus,
        { value: 0, level: maxLevel + 1 },
      ]);
      setAutoClickersBonus((prevAutoClickersBonus) => [
        ...prevAutoClickersBonus,
        { value: 0, level: maxLevel + 1 },
      ]);
      setAutoClickersBonusMultiplier((prevAutoClickersBonusMultiplier) => [
        ...prevAutoClickersBonusMultiplier,
        { value: 0, level: maxLevel + 1 },
      ]);
      setMaxLevel((prevMaxLevel) => prevMaxLevel + 1); //increase max level by 1
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
        Points:{' '}
        <span id="points-display">
          <NumericDisplay value={points} />
        </span>
      </p>
      {/*display points per click value*/}
      <p>
        Points per click:{' '}
        <span id="points-display">
          <NumericDisplay value={clickMultiplier} />
        </span>
      </p>
      {/*display points per second value*/}
      <p>
        Points per second:{' '}
        <span id="points-display">
          <NumericDisplay value={pointsPerSecond} />
        </span>
      </p>
      {/*increase points from clicking a button*/}
      <button onClick={() => addPointsFromClick()}>Click to Add Points</button>
      <br />
      <tr>
        <td>
          Time Multiplier Bonus:{' '}
          <NumericDisplay value={timeMultiplierBonus} shortForm={false} />
          <br />
          {/*upgrade time multiplier bonus*/}
          <button onClick={() => upgradeTimeMultiplierBonus()}>
            Upgrade Time Multiplier Bonus
          </button>
          <CostDisplay cost={2.5e3 * Math.pow(10, timeMultiplierBonus)} />
        </td>
      </tr>
      <tr>
        <td>
          Click Multiplier Bonus:{' '}
          <NumericDisplay value={clickMultiplierBonus} shortForm={false} />
          <br />
          {/*upgrade click multiplier bonus*/}
          <button onClick={() => upgradeClickMultiplierBonus()}>
            Upgrade Click Multiplier Bonus
          </button>
          <CostDisplay cost={5e3 * Math.pow(10, clickMultiplierBonus)} />
        </td>
      </tr>
      <tr>
        <td>
          Clicker Bonus:{' '}
          <NumericDisplay value={clickerBonus} shortForm={false} />
          <br />
          {/*upgrade clicker bonus*/}
          <button onClick={() => upgradeClickerBonus()}>
            Upgrade Clicker Bonus
          </button>
          <CostDisplay cost={1e3 * Math.pow(10, clickerBonus)} />
        </td>
      </tr>
      <table>
        <thead>
          <tr>
            <th>
              Item (1% bonus per autoclicker upgrade per bonus multiplier
              upgrade)
            </th>
            <th>
              Multiplier (2% bonus per multiplier upgrade per bonus multiplier
              upgrade)
            </th>
            <th>
              Level Bonus (1% bonus per autoclicker level, 3% bonus per level
              bonus upgrade per bonus multiplier upgrade)
            </th>
            <th>
              Bonus (1% bonus per upgrade, 4% bonus per bonus upgrade per bonus
              multiplier upgrade)
            </th>
            <th>Bonus Multiplier (5% bonus per bonus multiplier upgrade)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Clicker Level:{' '}
              <NumericDisplay value={clickers} shortForm={false} />
              <br />
              {/*upgrade clicker (points per click)*/}
              <button onClick={() => upgradeClicker()}>Upgrade Clicker</button>
              <CostDisplay cost={10 * Math.pow(2, clickers - 1)} />
            </td>
            <td>
              Clicker Multiplier Level:{' '}
              <NumericDisplay value={clickersMultiplier} shortForm={false} />
              <br />
              {/*upgrade clicker multiplier*/}
              <button onClick={() => upgradeClickerMultiplier()}>
                Upgrade Clicker Multiplier
              </button>
              <CostDisplay cost={100 * Math.pow(2, clickersMultiplier - 1)} />
            </td>
          </tr>
          {Array.from({ length: maxLevel }, (_, i) => (
            <tr key={i + 1}>
              <td>
                Autoclicker Level:{' '}
                <NumericDisplay
                  value={autoClickers[i].value}
                  shortForm={false}
                />
                <br />
                {/*upgrade autoclicker (points per second)*/}
                <button onClick={() => upgradeAutoClicker(i + 1)}>
                  Upgrade Autoclicker
                </button>
                <CostDisplay
                  cost={
                    10 * Math.pow(2, autoClickers[i].value) * Math.pow(10, i)
                  }
                />
              </td>
              <td>
                Autoclicker Multiplier Level:{' '}
                <NumericDisplay
                  value={autoClickersMultiplier[i].value}
                  shortForm={false}
                />
                <br />
                {/*upgrade autoclicker multiplier*/}
                <button onClick={() => upgradeAutoClickerMultiplier(i + 1)}>
                  Upgrade Autoclicker Multiplier
                </button>
                <CostDisplay
                  cost={
                    100 *
                    Math.pow(2, autoClickersMultiplier[i].value - 1) *
                    Math.pow(10, i)
                  }
                />
              </td>
              <td>
                Autoclicker Level Bonus:{' '}
                <NumericDisplay
                  value={autoClickersLevelBonus[i].value}
                  shortForm={false}
                />
                <br />
                {/*upgrade autoclicker level bonus*/}
                <button onClick={() => upgradeAutoClickerLevelBonus(i + 1)}>
                  Upgrade Autoclicker Level Bonus
                </button>
                <CostDisplay
                  cost={
                    1e3 *
                    Math.pow(2, autoClickersLevelBonus[i].value) *
                    Math.pow(10, i)
                  }
                />
              </td>
              <td>
                Autoclicker Bonus:{' '}
                <NumericDisplay
                  value={autoClickersBonus[i].value}
                  shortForm={false}
                />
                <br />
                {/*upgrade autoclicker bonus*/}
                <button onClick={() => upgradeAutoClickerBonus(i + 1)}>
                  Upgrade Autoclicker Bonus
                </button>
                <CostDisplay
                  cost={
                    1e4 *
                    Math.pow(3, autoClickersBonus[i].value) *
                    Math.pow(10, i)
                  }
                />
              </td>
              <td>
                Autoclicker Bonus Multiplier:{' '}
                <NumericDisplay
                  value={autoClickersBonus[i].value}
                  shortForm={false}
                />
                <br />
                {/*upgrade autoclicker bonus multiplier*/}
                <button
                  onClick={() => upgradeAutoClickerBonusMultiplier(i + 1)}
                >
                  Upgrade Autoclicker Bonus Multiplier
                </button>
                <CostDisplay
                  cost={
                    1e5 *
                    Math.pow(5, autoClickersBonusMultiplier[i].value) *
                    Math.pow(10, i)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      Max Level: <NumericDisplay value={maxLevel} shortForm={false} />
      <br />
      {/*upgrade max level*/}
      <button onClick={() => upgradeMaxLevel()}>Upgrade Max Level</button>
      <CostDisplay cost={100 * Math.pow(10, maxLevel - 1)} />
    </div>
  );
}

export default App;

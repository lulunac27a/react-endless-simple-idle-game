import CostDisplay from './components/CostDisplay/CostDisplay';
import NumericDisplay from './components/NumericDisplay/NumericDisplay';
import './App.css';
import { useState, useEffect, useCallback } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
function App() {
  //app component
  const [points, setPoints] = useState(
    JSON.parse(localStorage.getItem('gameState')).points || 0,
  ); //set initial points to 0
  const [pointsPerSecond, setPointsPerSecond] = useState(
    JSON.parse(localStorage.getItem('gameState')).pointsPerSecond || 0,
  ); //set initial points per second to 0
  const [maxLevel, setMaxLevel] = useState(
    JSON.parse(localStorage.getItem('gameState')).maxLevel || 1,
  ); //set max level to 1
  const [autoClickers, setAutoClickers] = useState(
    JSON.parse(localStorage.getItem('gameState')).autoClickers || [
      { value: 0, level: 1 },
    ],
  ); //set initial auto clickers to 0
  const [autoClickersMultiplier, setAutoClickersMultiplier] = useState(
    JSON.parse(localStorage.getItem('gameState')).autoClickersMultiplier || [
      { value: 1, level: 1 },
    ],
  ); //set initial auto clickers multiplier to 1
  const [autoClickersLevelBonus, setAutoClickersLevelBonus] = useState(
    JSON.parse(localStorage.getItem('gameState')).autoClickersLevelBonus || [
      { value: 0, level: 1 },
    ],
  ); //set initial auto clickers level bonus to 0
  const [autoClickersBonus, setAutoClickersBonus] = useState(
    JSON.parse(localStorage.getItem('gameState')).autoClickersBonus || [
      { value: 0, level: 1 },
    ],
  ); //set initial auto clickers bonus to 0
  const [autoClickersBonusMultiplier, setAutoClickersBonusMultiplier] =
    useState(
      JSON.parse(localStorage.getItem('gameState'))
        .autoClickersBonusMultiplier || [{ value: 0, level: 1 }],
    ); //set initial auto clickers bonus multiplier to 0
  const [clicks, setClicks] = useState(
    JSON.parse(localStorage.getItem('gameState')).clicks || 0,
  ); //set initial clicks pressed to 0
  const [clickMultiplier, setClickMultiplier] = useState(
    JSON.parse(localStorage.getItem('gameState')).clickMultiplier || 1,
  ); //set initial click multiplier to 1
  const [clickersMultiplier, setClickersMultiplier] = useState(
    JSON.parse(localStorage.getItem('gameState')).clickersMultiplier || 1,
  ); //set initial clickers multiplier to 1
  const [timeMultiplierBonus, setTimeMultiplierBonus] = useState(
    JSON.parse(localStorage.getItem('gameState')).timeMultiplierBonus || 0,
  ); //set initial time multiplier bonus to 0
  const [clickMultiplierBonus, setClickMultiplierBonus] = useState(
    JSON.parse(localStorage.getItem('gameState')).clickMultiplierBonus || 0,
  ); //set initial click multiplier bonus to 0
  const [clickerBonus, setClickerBonus] = useState(
    JSON.parse(localStorage.getItem('gameState')).clickerBonus || 0,
  ); //set initial clicker bonus to 0
  const [clickers, setClickers] = useState(
    JSON.parse(localStorage.getItem('gameState')).clickers || 1,
  ); //set initial clickers to 1
  const [clicksMultiplier, setClicksMultiplier] = useState(
    JSON.parse(localStorage.getItem('gameState')).clicksMultiplier || 1,
  ); //set initial clicks multiplier to 1
  const [seconds, setSeconds] = useState(
    JSON.parse(localStorage.getItem('gameState')).seconds || 0,
  ); //set initial seconds played to 0
  const [secondsMultiplier, setSecondsMultiplier] = useState(
    JSON.parse(localStorage.getItem('gameState')).secondsMultiplier || 1,
  ); //set initial clicks multiplier to 1
  const [totalUpgrades, setTotalUpgrades] = useState(
    JSON.parse(localStorage.getItem('gameState')).totalUpgrades || 0,
  ); //set initial total upgrades to 0
  const [totalUpgradesMultiplier, setTotalUpgradesMultiplier] = useState(
    JSON.parse(localStorage.getItem('gameState')).totalUpgradesMultiplier || 0,
  ); //set initial total upgrades multiplier to 0
  const [upgradeLevel, setUpgradeLevel] = useState(
    JSON.parse(localStorage.getItem('gameState')).upgradeLevel || 0,
  ); //set initial upgrade level to 0
  const [totalUpgradeLevelXp, setTotalUpgradeLevelXp] = useState(
    JSON.parse(localStorage.getItem('gameState')).totalUpgradeLevelXp || 0,
  ); //set initial total upgrade level XP to 0
  const [upgradeLevelXp, setUpgradeLevelXp] = useState(
    JSON.parse(localStorage.getItem('gameState')).upgradeLevelXp || 0,
  ); //set initial upgrade level XP to 1
  const [upgradeLevelXpRequired, setUpgradeLevelXpRequired] = useState(
    JSON.parse(localStorage.getItem('gameState')).upgradeLevelXpRequired || 1,
  ); //set initial upgrade level XP required to 1
  const [upgradeLevelMultiplier, setUpgradeLevelMultiplier] = useState(
    JSON.parse(localStorage.getItem('gameState')).upgradeLevelMultiplier || 0,
  ); //set initial upgrade level multiplier to 0
  const [logLevel, setLogLevel] = useState(
    JSON.parse(localStorage.getItem('gameState')).logLevel || 0,
  ); //set initial log level to 0
  const [totalLogLevelXp, setTotalLogLevelXp] = useState(
    JSON.parse(localStorage.getItem('gameState')).totalLogLevelXp || 0,
  ); //set initial total log level XP to 0
  const [logLevelXp, setLogLevelXp] = useState(
    JSON.parse(localStorage.getItem('gameState')).logLevelXp || 0,
  ); //set initial log level XP to 0
  const [logLevelXpRequired, setLogLevelXpRequired] = useState(
    JSON.parse(localStorage.getItem('gameState')).logLevelXpRequired || 1,
  ); //set initial log level XP required to 1
  const [logLevelMultiplier, setLogLevelMultiplier] = useState(
    JSON.parse(localStorage.getItem('gameState')).logLevelMultiplier || 0,
  ); //set initial log level multiplier to 0
  const [gameState, setGameState] = useState({
    points: points,
    pointsPerSecond: pointsPerSecond,
    maxLevel: maxLevel,
    autoClickers: autoClickers,
    autoClickersMultiplier: autoClickersMultiplier,
    autoClickersLevelBonus: autoClickersLevelBonus,
    autoClickersBonus: autoClickersBonus,
    autoClickersBonusMultiplier: autoClickersBonusMultiplier,
    clicks: clicks,
    clickMultiplier: clickMultiplier,
    clickersMultiplier: clickersMultiplier,
    timeMultiplierBonus: timeMultiplierBonus,
    clickMultiplierBonus: clickMultiplierBonus,
    clickerBonus: clickerBonus,
    clickers: clickers,
    clicksMultiplier: clicksMultiplier,
    seconds: seconds,
    secondsMultiplier: secondsMultiplier,
    totalUpgrades: totalUpgrades,
    totalUpgradesMultiplier: totalUpgradesMultiplier,
    upgradeLevel: upgradeLevel,
    totalUpgradeLevelXp: totalUpgradeLevelXp,
    upgradeLevelXp: upgradeLevelXp,
    upgradeLevelXpRequired: upgradeLevelXpRequired,
    upgradeLevelMultiplier: upgradeLevelMultiplier,
    logLevel: logLevel,
    totalLogLevelXp: totalLogLevelXp,
    logLevelXp: logLevelXp,
    logLevelXpRequired: logLevelXpRequired,
    logLevelMultiplier: logLevelMultiplier,
  }); //set game state data
  const updateGameState = useCallback(() => {
    setGameState({
      points: points,
      pointsPerSecond: pointsPerSecond,
      maxLevel: maxLevel,
      autoClickers: autoClickers,
      autoClickersMultiplier: autoClickersMultiplier,
      autoClickersLevelBonus: autoClickersLevelBonus,
      autoClickersBonus: autoClickersBonus,
      autoClickersBonusMultiplier: autoClickersBonusMultiplier,
      clicks: clicks,
      clickMultiplier: clickMultiplier,
      clickersMultiplier: clickersMultiplier,
      timeMultiplierBonus: timeMultiplierBonus,
      clickMultiplierBonus: clickMultiplierBonus,
      clickerBonus: clickerBonus,
      clickers: clickers,
      clicksMultiplier: clicksMultiplier,
      seconds: seconds,
      secondsMultiplier: secondsMultiplier,
      totalUpgrades: totalUpgrades,
      totalUpgradesMultiplier: totalUpgradesMultiplier,
      upgradeLevel: upgradeLevel,
      totalUpgradeLevelXp: totalUpgradeLevelXp,
      upgradeLevelXp: upgradeLevelXp,
      upgradeLevelXpRequired: upgradeLevelXpRequired,
      upgradeLevelMultiplier: upgradeLevelMultiplier,
      logLevel: logLevel,
      totalLogLevelXp: totalLogLevelXp,
      logLevelXp: logLevelXp,
      logLevelXpRequired: logLevelXpRequired,
      logLevelMultiplier: logLevelMultiplier,
    }); //set game state data
    localStorage.setItem('gameState', JSON.stringify(gameState)); //save game state data to local storage
  }, [
    autoClickers,
    autoClickersBonus,
    autoClickersBonusMultiplier,
    autoClickersLevelBonus,
    autoClickersMultiplier,
    clickMultiplier,
    clickMultiplierBonus,
    clickerBonus,
    clickers,
    clickersMultiplier,
    clicks,
    clicksMultiplier,
    gameState,
    logLevel,
    logLevelMultiplier,
    logLevelXp,
    logLevelXpRequired,
    maxLevel,
    points,
    pointsPerSecond,
    seconds,
    secondsMultiplier,
    timeMultiplierBonus,
    totalLogLevelXp,
    totalUpgradeLevelXp,
    totalUpgrades,
    totalUpgradesMultiplier,
    upgradeLevel,
    upgradeLevelMultiplier,
    upgradeLevelXp,
    upgradeLevelXpRequired,
  ]);
  const checkUpgradeLevel = useCallback(() => {
    //check if upgrade level XP is higher than or equal to XP required
    const upgradeLevelExpected =
      totalUpgradeLevelXp === 0
        ? 0
        : Math.floor(
          Math.cbrt(
            3 * (totalUpgradeLevelXp + 0.5) +
            Math.sqrt(9 * (totalUpgradeLevelXp + 0.5) ** 2 - 1 / 27),
          ) +
          Math.cbrt(
            3 * (totalUpgradeLevelXp + 0.5) -
            Math.sqrt(9 * (totalUpgradeLevelXp + 0.5) ** 2 - 1 / 27),
          ) -
          1,
        ); //calculate level based on total upgrade level XP
    const upgradeLevelXpExpected =
      (upgradeLevelExpected *
        (upgradeLevelExpected + 1) *
        (upgradeLevelExpected + 2)) /
      6; //total upgrade level XP when specified upgrade level reached
    setUpgradeLevel(upgradeLevelExpected + 1); //set upgrade level
    setUpgradeLevelXp(totalUpgradeLevelXp - upgradeLevelXpExpected); //set upgrade level XP
    setUpgradeLevelXpRequired(
      ((upgradeLevelExpected + 1) * (upgradeLevelExpected + 2)) / 2,
    ); //set upgrade level XP required to level up
  }, [totalUpgradeLevelXp]);
  const checkLogLevel = useCallback(() => {
    //check if log level XP is higher than or equal to XP required
    const logLevelExpected =
      totalLogLevelXp === 0
        ? 0
        : Math.floor(
          Math.cbrt(
            3 * totalLogLevelXp +
            Math.sqrt(9 * totalLogLevelXp ** 2 - 1 / 27),
          ) +
          Math.cbrt(
            3 * totalLogLevelXp -
            Math.sqrt(9 * totalLogLevelXp ** 2 - 1 / 27),
          ) -
          1,
        ); //calculate level based on total log level XP
    const logLevelXpExpected =
      (logLevelExpected * (logLevelExpected + 1) * (logLevelExpected + 2)) / 6; //total log level XP when specified log level reached
    setLogLevel(logLevelExpected + 1); //set log level
    setLogLevelXp(totalLogLevelXp - logLevelXpExpected); //set log level XP
    setLogLevelXpRequired(
      ((logLevelExpected + 1) * (logLevelExpected + 2)) / 2,
    ); //set log level XP required to level up
  }, [totalLogLevelXp]);
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
          (1 + (totalUpgradesMultiplier * totalUpgrades) / 1000) *
          (1 + (upgradeLevelMultiplier * upgradeLevel) / 100) *
          (1 + (logLevelMultiplier * logLevel) / 100) *
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
    logLevel,
    logLevelMultiplier,
    seconds,
    timeMultiplierBonus,
    totalUpgrades,
    totalUpgradesMultiplier,
    upgradeLevel,
    upgradeLevelMultiplier,
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      //increase points every second
      setPoints((prevPoints) => prevPoints + pointsPerSecond); //increase points by points per second
      setSeconds((prevSeconds) => prevSeconds + secondsMultiplier); //add seconds by seconds multiplier
      updateClickers(); //update clickers value
      updateAutoClickers(); //update auto clickers value
      updateGameState(); //update game state data
    }, 1000);
    return () => {
      clearInterval(interval); //clear interval when component unmounts
    };
  }, [
    pointsPerSecond,
    secondsMultiplier,
    updateAutoClickers,
    updateClickers,
    updateGameState,
  ]);

  function checkPointsForUpgrade(points, pointsRequired) {
    //check if user has enough points to upgrade
    if (pointsRequired !== 0 && points >= pointsRequired) {
      //make sure points required is not 0 and user has enough points to upgrade
      setTotalLogLevelXp(
        (prevTotalLogLevelXp) =>
          prevTotalLogLevelXp + Math.log(Math.max(pointsRequired + 1, 1)),
      ); //increase log level XP
      checkLogLevel(); //check if log level has enough XP to level up
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
      updateGameState(); //update game state data
      return true;
    } else {
      //not enough points required to upgrade
      return false;
    }
  }

  function addPointsFromClick() {
    //add points from clicking a button
    setPoints((prevPoints) => prevPoints + clickMultiplier); //increase points by 1 when button clicked
    setClicks((prevClicks) => prevClicks + clicksMultiplier); //increase clicks made by clicks multiplier
    updateClickers(); //update clickers value
    updateAutoClickers(); //update auto clickers value
    updateGameState(); //update game state data
  }
  function upgradeClicker() {
    //upgrade clicker (points per click)
    if (checkPointsForUpgrade(points, 10 * Math.pow(2, clickers - 1))) {
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) => prevTotalUpgradeLevelXp + clickers,
      ); //increase upgrade level XP by clickers
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
      setPoints((prevPoints) => prevPoints - 10 * Math.pow(2, clickers - 1)); //spend points
      setClickers((prevClickers) => prevClickers + 1); //increase clickers by 1
      updateClickers(); //update clickers value
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
    }
  }
  function upgradeClickerMultiplier() {
    //upgrade clicker multiplier (points per click)
    if (
      checkPointsForUpgrade(points, 100 * Math.pow(2, clickersMultiplier - 1))
    ) {
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp + clickersMultiplier,
      ); //increase upgrade level XP by clickers multiplier
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
      setPoints(
        (prevPoints) => prevPoints - 100 * Math.pow(2, clickersMultiplier - 1),
      ); //spend points
      setClickersMultiplier(
        (prevClickersMultiplier) => prevClickersMultiplier + 1,
      ); //increase clickers multiplier by 1
      updateClickers(); //update clickers value
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
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
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp + autoClickers[level - 1].value * level,
      ); //increase upgrade level XP by autoclickers times level
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
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
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
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
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp +
          autoClickersMultiplier[level - 1].value * level,
      ); //increase upgrade level XP by autoclickers multiplier times level
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
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
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
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
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp +
          autoClickersLevelBonus[level - 1].value * level,
      ); //increase upgrade level XP by autoclickers level bonus times level
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
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
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
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
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp + autoClickersBonus[level - 1].value * level,
      ); //increase upgrade level XP by autoclickers bonus times level
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
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
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
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
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp +
          autoClickersBonusMultiplier[level - 1].value * level,
      ); //increase upgrade level XP by autoclickers bonus multiplier times level
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
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
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
    }
  }
  function upgradeTimeMultiplierBonus() {
    //upgrade time multiplier bonus based on number of seconds passed
    if (
      checkPointsForUpgrade(points, 2.5e3 * Math.pow(10, timeMultiplierBonus))
    ) {
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp + (timeMultiplierBonus + 1) * 3,
      ); //increase upgrade level XP by time multiplier bonus
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
      setPoints(
        (prevPoints) => prevPoints - 2.5e3 * Math.pow(10, timeMultiplierBonus),
      );
      setTimeMultiplierBonus(
        (prevTimeMultiplierBonus) => prevTimeMultiplierBonus + 1,
      ); //increase time multiplier bonus by 1
      updateAutoClickers(); //update auto clickers value
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
    }
  }
  function upgradeClickMultiplierBonus() {
    //upgrade click multiplier bonus based on number of seconds passed
    if (
      checkPointsForUpgrade(points, 5e3 * Math.pow(10, clickMultiplierBonus))
    ) {
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp + (clickMultiplierBonus + 1) * 5,
      ); //increase upgrade level XP by click multiplier bonus
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
      setPoints(
        (prevPoints) => prevPoints - 5e3 * Math.pow(10, clickMultiplierBonus),
      );
      setClickMultiplierBonus(
        (prevClickMultiplierBonus) => prevClickMultiplierBonus + 1,
      ); //increase click multiplier bonus by 1
      updateAutoClickers(); //update auto clickers value
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
    }
  }
  function upgradeClickerBonus() {
    //upgrade clicker bonus based on points per second
    if (checkPointsForUpgrade(points, 1e3 * Math.pow(10, clickerBonus))) {
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp + (clickerBonus + 1) * 3,
      ); //increase upgrade level XP by clicker bonus
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
      setPoints((prevPoints) => prevPoints - 1e3 * Math.pow(10, clickerBonus));
      setClickerBonus((prevClickerBonus) => prevClickerBonus + 1); //increase clicker bonus by 1
      updateAutoClickers(); //update auto clickers value
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
    }
  }
  function upgradeMaxLevel() {
    //upgrade max level
    if (checkPointsForUpgrade(points, 100 * Math.pow(10, maxLevel - 1))) {
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
      updateGameState(); //update game state data
    }
  }
  function upgradeSecondsMultiplier() {
    //upgrade seconds multiplier
    if (
      checkPointsForUpgrade(points, 1e5 * Math.pow(10, secondsMultiplier - 1))
    ) {
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp + secondsMultiplier * 5,
      ); //increase upgrade level XP by seconds multiplier
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
      setPoints(
        (prevPoints) => prevPoints - 1e5 * Math.pow(10, secondsMultiplier - 1),
      );
      setSecondsMultiplier(
        (prevSecondsMultiplier) => prevSecondsMultiplier + 1,
      ); //increase seconds multiplier by 1
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
    }
  }
  function upgradeClicksMultiplier() {
    //upgrade clicks multiplier
    if (
      checkPointsForUpgrade(points, 1e6 * Math.pow(10, clicksMultiplier - 1))
    ) {
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp + clicksMultiplier * 6,
      ); //increase upgrade level XP by clicks multiplier
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
      setPoints(
        (prevPoints) => prevPoints - 1e6 * Math.pow(10, clicksMultiplier - 1),
      );
      setClicksMultiplier((prevClicksMultiplier) => prevClicksMultiplier + 1); //increase clicks multiplier by 1
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
    }
  }
  function upgradeTotalUpgradesMultiplier() {
    //upgrade total upgrades multiplier
    if (
      checkPointsForUpgrade(points, 5e4 * Math.pow(10, totalUpgradesMultiplier))
    ) {
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp + (totalUpgradesMultiplier + 1) * 5,
      ); //increase upgrade level XP by total upgrades multiplier
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
      setPoints(
        (prevPoints) =>
          prevPoints - 5e4 * Math.pow(10, totalUpgradesMultiplier),
      );
      setTotalUpgradesMultiplier(
        (prevTotalUpgradesMultiplier) => prevTotalUpgradesMultiplier + 1,
      ); //increase total upgrades multiplier by 1
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      updateGameState(); //update game state data
    }
  }
  function upgradeLevelUpgradeMultiplier() {
    if (checkPointsForUpgrade(2.5e4 * Math.pow(10, upgradeLevelMultiplier))) {
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp + (upgradeLevelMultiplier + 1) * 4,
      ); //increase upgrade level XP by upgrade level multiplier
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
      setPoints(
        (prevPoints) =>
          prevPoints - 2.5e4 * Math.pow(10, upgradeLevelMultiplier),
      );
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      setUpgradeLevelMultiplier(
        (prevUpgradeLevelMultiplier) => prevUpgradeLevelMultiplier + 1,
      ); //increase upgrade level multiplier by 1
      updateGameState(); //update game state data
    }
  }
  function upgradeLogLevelMultiplier() {
    if (checkPointsForUpgrade(5e5 * Math.pow(10, logLevelMultiplier))) {
      setTotalUpgradeLevelXp(
        (prevTotalUpgradeLevelXp) =>
          prevTotalUpgradeLevelXp + (logLevelMultiplier + 1) * 5,
      ); //increase upgrade level XP by log level multiplier
      checkUpgradeLevel(); //check if upgrade level has enough XP to level up
      setPoints(
        (prevPoints) => prevPoints - 2.5e4 * Math.pow(10, logLevelMultiplier),
      );
      setTotalUpgrades((prevTotalUpgrades) => prevTotalUpgrades + 1); //increase total upgrades by 1
      setLogLevelMultiplier(
        (prevLogLevelMultiplier) => prevLogLevelMultiplier + 1,
      ); //increase log level multiplier by 1
      updateGameState(); //update game state data
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
      {/*display upgrade level*/}
      <div style={{ width: '10%', height: '10%' }}>
        <CircularProgressbarWithChildren
          value={(upgradeLevelXp / upgradeLevelXpRequired) * 100}
          styles={buildStyles({ pathColor: 'black', textColor: 'black' })}
        >
          <p>
            Upgrade level: <br />
            <span id="level-display">
              <NumericDisplay value={upgradeLevel} />
            </span>
          </p>
        </CircularProgressbarWithChildren>
      </div>
      {/*display log level*/}
      <div style={{ width: '10%', height: '10%' }}>
        <CircularProgressbarWithChildren
          value={(logLevelXp / logLevelXpRequired) * 100}
          styles={buildStyles({ pathColor: 'black', textColor: 'black' })}
        >
          <p>
            Log level: <br />
            <span id="level-display">
              <NumericDisplay value={logLevel} />
            </span>
          </p>
        </CircularProgressbarWithChildren>
      </div>
      {/*increase points from clicking a button*/}
      <button onClick={() => addPointsFromClick()}>Click to Add Points</button>
      <br />
      <tr>
        <td>
          Time Multiplier Bonus:{' '}
          <NumericDisplay value={timeMultiplierBonus} shortForm={false} />
          <br />
          +0.01% points per second bonus per seconds upgrade multiplier per
          second played
          {/*upgrade time multiplier bonus*/}
          <button onClick={() => upgradeTimeMultiplierBonus()}>
            Upgrade Time Multiplier Bonus
          </button>
          <CostDisplay cost={2.5e3 * Math.pow(10, timeMultiplierBonus)} />
        </td>
        <td>
          Click Multiplier Bonus:{' '}
          <NumericDisplay value={clickMultiplierBonus} shortForm={false} />
          <br />
          +0.01% points per second bonus per clicks upgrade multiplier per click
          made
          {/*upgrade click multiplier bonus*/}
          <button onClick={() => upgradeClickMultiplierBonus()}>
            Upgrade Click Multiplier Bonus
          </button>
          <CostDisplay cost={5e3 * Math.pow(10, clickMultiplierBonus)} />
        </td>
        <td>
          Clicker Bonus:{' '}
          <NumericDisplay value={clickerBonus} shortForm={false} />
          <br />
          +1% bonus points per second from click per clicker bonus level
          {/*upgrade clicker bonus*/}
          <button onClick={() => upgradeClickerBonus()}>
            Upgrade Clicker Bonus
          </button>
          <CostDisplay cost={1e3 * Math.pow(10, clickerBonus)} />
        </td>
        <td>
          Seconds Multiplier:{' '}
          <NumericDisplay value={secondsMultiplier} shortForm={false} />
          <br />
          {/*upgrade seconds multiplier*/}
          <button onClick={() => upgradeSecondsMultiplier()}>
            Upgrade Seconds Multiplier
          </button>
          <CostDisplay cost={1e5 * Math.pow(10, secondsMultiplier - 1)} />
        </td>
        <td>
          Clicks Multiplier:{' '}
          <NumericDisplay value={clicksMultiplier} shortForm={false} />
          <br />
          {/*upgrade clicks multiplier*/}
          <button onClick={() => upgradeClicksMultiplier()}>
            Upgrade Clicks Multiplier
          </button>
          <CostDisplay cost={1e6 * Math.pow(10, clicksMultiplier - 1)} />
        </td>
        <td>
          Total Upgrades Multiplier:{' '}
          <NumericDisplay value={totalUpgradesMultiplier} shortForm={false} />
          <br />
          +0.1% points per second bonus per total upgrades multiplier per total
          upgradedes level
          {/*upgrade total upgrades multiplier*/}
          <button onClick={() => upgradeTotalUpgradesMultiplier()}>
            Upgrade Total Upgrades Multiplier
          </button>
          <CostDisplay cost={5e4 * Math.pow(10, totalUpgradesMultiplier)} />
        </td>
        <td>
          Level Upgrade Multiplier:{' '}
          <NumericDisplay value={upgradeLevelMultiplier} shortForm={false} />
          <br />
          +1% points per second bonus per level upgrade multiplier upgrade per
          upgrade level
          {/*upgrade level upgrades multiplier*/}
          <button onClick={() => upgradeLevelUpgradeMultiplier()}>
            Upgrade Level Upgrade Multiplier
          </button>
          <CostDisplay cost={2.5e4 * Math.pow(10, upgradeLevelMultiplier)} />
        </td>
        <td>
          Log Level Multiplier:{' '}
          <NumericDisplay value={logLevelMultiplier} shortForm={false} />
          <br />
          +1% points per second bonus per log level multiplier upgrade per log
          level
          <br />
          {/*upgrade log level multiplier*/}
          <button onClick={() => upgradeLogLevelMultiplier()}>
            Upgrade Log Level Multiplier
          </button>
          <CostDisplay cost={5e5 * Math.pow(10, logLevelMultiplier)} />
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

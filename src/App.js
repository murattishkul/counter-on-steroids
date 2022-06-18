import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useRef} from 'react';

function getRandomInt(min=1, max=21) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

/*
  1. Easy – # of clicks/second – 5, overdrive chance – 33.33% , overdrive duration – 15sec     
	2. Medium – # of clicks/second – 3, overdrive chance – 10%, overdrive duration – 10sec     
	3. Hard – # of clicks/second – 1, overdrive chance – 5%, overdrive duration – 5sec
   */

  const gameSettings = {
    cps : {
      easy: 5, medium: 3, hard: 1
    },
    overdriveChance: {
      easy: 6, medium: 2, hard: 1
    },
    overdriveDuration: {
      easy: 15, medium: 10, hard: 5
    }
  }

function App() {
  const [gameMode, setGameMode] = useState('medium');
  const [count, setCount] = useState(0); //
  const [limit, setLimit] = useState(3); //
  const [clicks, setClicks] = useState(0);//
  const [buttonRed, setButtonRed] = useState(false); //
  const [override, setOverride] = useState(false); // 

  const [timerStarted, setTimerStarted] = useState(false); //
  const [decreaseTimer, setDecreaseTimer] = useState(null) //
  const [interval, changeInterval] = useState(null); //
  const [overrideTimer, setOverrideTimer] = useState(null); //
  const [overrideInterval, setOverrideInterval] = useState(null); //

  const [overrideSeconds, setOverrideSeconds] = useState(gameSettings.overdriveDuration[gameMode]); //
  const [overdriveChance, setOverdriveChance] = useState(gameSettings.overdriveChance[gameMode]); //
  const [cps, setCPS] = useState(gameSettings.cps[gameMode]); //


  const [trophies, setTrophies] = useState(0); //

  const countRef = useRef();
  const clickRef = useRef();
  const overRef = useRef();


  useEffect(()=>{
    if(count > ((trophies+1) * 10) ) {
      setTrophies(1+trophies);
    }
  },[count])

  const selectGameMode = (e) => {
    console.log(e.target.value)
    const newMode = e.target.value;

    clearInterval(decreaseTimer);
    clearTimeout(overrideTimer);

    setGameMode(newMode);

    setOverrideSeconds(gameSettings.overdriveDuration[newMode]);
    setOverdriveChance(gameSettings.overdriveChance[newMode]);
    setCPS(gameSettings.cps[newMode]);

    setClicks(0);
    setCount(0);
    setLimit(gameSettings.cps[newMode]);
    setTrophies(0);

    setOverride(false);
    setButtonRed(false);
    setDecreaseTimer(null);
    setOverrideTimer(null);

    setTimerStarted(false);
    changeInterval(null);
  }

  const handleClick =  () => {
    
    if(clicks === limit) { // you hit the limit, no more clicks please
      setTimerStarted(false)  
    } else {
      if(timerStarted) { // you are safely increment the counter
        if(override) setCount(count + 2);
        else setCount(count + 1)
        setClicks(clicks+1);
        clearInterval(decreaseTimer);
        setDecreaseTimer(emptyTimer());
        if(getRandomInt()===overdriveChance && !overrideTimer){
          console.log('OVERRIDE')
          clearTimeout(overrideTimer);
          setOverrideTimer(startOverrideTimer());
        }
      } else { // first time you starting the timer, you increment and call the settimeout to track a second.
        setTimerStarted(true);
        if(override) setCount(count + 2);
        else setCount(count + 1)
        setClicks(clicks+1);
        setTimeout( () => {
          console.log('limit settimeout callback is runnign...')
          console.log('increasing the limit...')
          setLimit(Number.parseInt(clickRef.current.innerText) + cps);
          setTimerStarted(false) 
        }, 1000)
        clearInterval(decreaseTimer);
        setDecreaseTimer(emptyTimer());
        if(getRandomInt()===overdriveChance && !overrideTimer){
          console.log('OVERRIDE')
          setOverrideTimer(startOverrideTimer());
        }
      }
    }

  }

  const startOverrideTimer = () => {
    setOverride(true);
    const overrideInterval = setInterval(() => {
      setOverrideSeconds(Number.parseInt(overRef.current.innerText) - 1);
    }, 1000)
    return setTimeout( () => {
      console.log('override callback is running...');
      setOverride(false);
      setOverrideTimer(null);
      clearInterval(overrideInterval);
      setOverrideSeconds(gameSettings.overdriveDuration[gameMode])
    }, 10000)
  };

  const emptyTimer = () => {
    return setTimeout( () => {
      console.log('empty settimeout callback is running...');
      notClicked();
    }, 10000)
  };

  const notClicked = () => {
    setButtonRed(true);
    changeInterval(setInterval(()=>{
      setCount(Number.parseInt(countRef.current.innerText) - 1);
      console.log('changed')
    }, 1000))
  }

  if(count === 0 && interval){
    clearInterval(interval);
    changeInterval(null);
    setButtonRed(false);
  }


  // console.log('timerStarted', timerStarted)
  console.log('limit', limit)
  console.log('count:', count)
  console.log('buttonRed:', buttonRed)
  console.log('overrode', override)

  console.log("gameMode", gameMode)

  return (
    <>
    <select onChange={selectGameMode} value={gameMode}>
      <option value="easy">easy</option>
      <option value="medium">medium</option>
      <option value="hard">hard</option>
    </select>
      <div ref={countRef}>{count}</div>
      <button disabled={buttonRed} onClick={handleClick} style={{'background': `${buttonRed ? 'red' : '#fff'}`}}>Click</button>
      <div ref={overRef} style={{display: 'none'}}>{overrideSeconds}</div>
      {override && `override mode! - ${overrideSeconds}s left`}
      {`clicks - ${clicks}`}
      <div ref={clickRef} style={{display: 'none'}}>{clicks}</div>
      {trophies >0 && `trophies - ${trophies}`}
    </>
  );
}

export default App;

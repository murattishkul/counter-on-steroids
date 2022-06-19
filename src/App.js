import {useEffect, useState, useRef} from 'react';
import useWindowSize from './hooks/useWindowSize'
import Confetti from 'react-confetti'
import Trophies from './components/Trophy';
import Select from './components/Select';
import Counter from './components/Counter';
import {Text} from './components/Text';
import {gameSettings, killTimers, getRandomInt} from './utils'

/*
  1. Easy – # of clicks/second – 5, overdrive chance – 33.33% , overdrive duration – 15sec     
	2. Medium – # of clicks/second – 3, overdrive chance – 10%, overdrive duration – 10sec     
	3. Hard – # of clicks/second – 1, overdrive chance – 5%, overdrive duration – 5sec
   */


function App() {
  const [gameMode, setGameMode] = useState('medium');
  const [count, setCount] = useState(0); 
  const [limit, setLimit] = useState(3); 
  const [clicks, setClicks] = useState(0);
  const [buttonRed, setButtonRed] = useState(false); 
  const [override, setOverride] = useState(false); 

  const [timerStarted, setTimerStarted] = useState(false); 
  const [decreaseTimer, setDecreaseTimer] = useState(null) 
  const [interval, changeInterval] = useState(null); 
  const [overrideTimer, setOverrideTimer] = useState(null); 
  const [overrideInterval, setOverrideInterval] = useState(null); 

  const [overrideSeconds, setOverrideSeconds] = useState(gameSettings.overdriveDuration[gameMode]); 
  const [overdriveChance, setOverdriveChance] = useState(gameSettings.overdriveChance[gameMode]); 
  const [cps, setCPS] = useState(gameSettings.cps[gameMode]); 


  const [trophies, setTrophies] = useState(0); 

  const countRef = useRef();
  const clickRef = useRef();
  const overRef = useRef();

  const {width, height} = useWindowSize();

  useEffect(()=>{
    if(overrideSeconds === 0 && overrideInterval){
      clearInterval(overrideInterval);
      setOverrideInterval(null);
    }
  })

  useEffect(()=>{
    if(count === 0 && interval){
      clearInterval(interval);
      changeInterval(null);
      setButtonRed(false);
    }
  })

  useEffect(()=>{
    if(count >= ((trophies+1) * 10) ) {
      setTrophies(1+trophies);
    }
  },[count])

  const selectGameMode = (e) => {
    const newMode = e.target.value;

    clearInterval(decreaseTimer);
    clearTimeout(overrideTimer);
    clearInterval(overrideInterval);
    clearInterval(interval);

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
    setOverrideInterval(null);

    setTimerStarted(false);
    changeInterval(null);

    killTimers();
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
          // console.log('OVERRIDE')
          clearTimeout(overrideTimer);
          startOverrideTimer();
        }
      } else { // first time you starting the timer, you increment and call the settimeout to track a second.
        setTimerStarted(true);
        if(override) setCount(count + 2);
        else setCount(count + 1)
        setClicks(clicks+1);
        setTimeout( () => {
          // limit settimeout callback is runnign...
          // increasing the limit...
          setLimit(Number.parseInt(clickRef.current.innerText) + cps);
          setTimerStarted(false) 
        }, 1000)
        clearInterval(decreaseTimer);
        setDecreaseTimer(emptyTimer());
        if(getRandomInt()===overdriveChance && !overrideTimer){
          // console.log('OVERRIDE')
          startOverrideTimer();
        }
      }
    }

  }

  const startOverrideTimer = async () => {
    setOverride(true);
    setOverrideInterval(setInterval(() => {
      setOverrideSeconds(Number.parseInt(overRef.current.innerText) - 1);
    }, 1000))
    
      setOverrideTimer( 
        setTimeout( () => { // override callback is running...
          setOverride(false);
          setOverrideTimer(null);
          clearInterval(overrideInterval);
          setOverrideInterval(null);
          setOverrideSeconds(gameSettings.overdriveDuration[gameMode])
        }, 
        (1000 + gameSettings.overdriveDuration[gameMode]*1000) 
      ))
  };

  const emptyTimer = () => {
    return setTimeout( () => { // empty settimeout callback is running...
      notClicked();
    }, 10000)
  };

  const notClicked = () => {
    setButtonRed(true);
    changeInterval(setInterval(()=>{
      setCount(Number.parseInt(countRef.current.innerText) - 1);
    }, 1000))
  }

  return (
    <>
      <Select gameMode={gameMode} selectGameMode={selectGameMode} />
      <Counter count={count} countRef={countRef} buttonRed={buttonRed} handleClick={handleClick} />
      <div ref={overRef} style={{display: 'none'}}>{overrideSeconds}</div>
      {override && 
        <>
        <Text>{`🥳 Override! - ${overrideSeconds} seconds left`}</Text>
        <Confetti
          width={width}
          height={height}
          gravity={0.5}
          initialVelocityY={20}
          recycle={overrideSeconds>2}
        />
      </>}
      <div ref={clickRef} style={{display: 'none'}}>{clicks}</div>
      <Trophies trophies={trophies}/>
    </>
  );
}

export default App;

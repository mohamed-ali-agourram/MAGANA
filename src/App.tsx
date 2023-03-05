//dependencies
import { useState, useEffect, useContext, useRef, RefObject } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
//components
import { Navbar } from './components/Navbar/Navbar'
import { ProgressBar } from './components/ProgressBar/ProgressBar'
import { Timer } from './pages/Timer/Timer'
import { Time } from './pages/Time/Time'
import { AboutUs } from './pages/AboutUs/AboutUs'
import { ThemeContext } from './context/ThemeContext'
//styles
import './assets/globalStyle.scss';
import sound from './assets/alarm.mp3';


function App() {
  
  //nav bar
  const [isMobileView, setIsMobileView] = useState(false)
  function toggleMobileNav(){
    setIsMobileView(!isMobileView)
  }

  const ThemeCntx = useContext<MyContextProps>(ThemeContext)

  const [duration , setDuration] = useState(0)
  const [ms, setMs] = useState(0)
  const [rem, setRem] = useState('12rem')
  const [isPaused, setPaused] = useState(false)
  const [reset, setReset] = useState(false)
  const [isCanceled, setIsCanceled] = useState(false)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const timerSound = new Audio(sound)
  const navigate = useNavigate();
  const location = useLocation();

  function changeTitle(title : number | any){
    document.title = title + ' - MAGANA'
  }

  function togglePause()
  {
    if(isPaused === false){
      localStorage.pause = Date.now()
      setPaused(true)
    }
    if(isPaused){
      const newEnd = +localStorage.end + (Date.now() - localStorage.pause)
      localStorage.removeItem("pause")
      localStorage.end = newEnd
      setPaused(false)
    }
  }

  function resetTimer()
  {
    setReset(true)
    const now = Date.now()
    const end = now + duration * 1000 + 500
    localStorage.end = end
    let diff = +localStorage.end - now
    setMs(diff)
    localStorage.pause = now
    setPaused(true)
  }

  function UpdateRem(myRem: string){
    setRem(myRem)
  }

  function fixRem(){
      const checkRem = +rem.split("rem")[0]
      if(document.body.offsetWidth <= 950 && (checkRem > 10 || checkRem <= 6)){
        UpdateRem('10rem')
      }
    }

  function cancelTimer()
  {
    setMs(0)
    setIsCanceled(true)
    localStorage.removeItem("end")
    localStorage.removeItem("pause")
    localStorage.removeItem("duration")
  }

  function toggleTimeUp(): void{
    timerSound.pause()
    setIsTimeUp(false)
  }

  useEffect(()=>{
    if(localStorage.pause)
    {
      setPaused(true)
    }
    if(localStorage.duration)
    {
      setDuration(localStorage.duration)
    }
  }, [])

  //how to type Ref argument for typeScript
  const fullScreen = (Ref: RefObject<HTMLDivElement>)=>{
    if(Ref.current){
      if(Ref.current.requestFullscreen){
        if (document.fullscreenElement) {
          document.exitFullscreen()
        }else{
          Ref.current.requestFullscreen()
        } 
      }
    }
  }

  useEffect(()=>{
    if(localStorage.end){
      if(isCanceled)
      {
        return
      }
      let diff;
      if(isPaused){
        diff = +localStorage.end - +localStorage.pause + 1
      }else{
        diff = +localStorage.end - Date.now()
      }
      setMs(diff)
      if(reset)
      {
        setReset(false)
        return 
      }
      if(isPaused){
        return
      }  
      const intervalId = setInterval(()=>{
        let now = Date.now()
        diff = +localStorage.end - now
        setMs(diff)
        if(diff === 0 || diff < 1.5){
          if(document.fullscreen){
            document.exitFullscreen()
          }
          setIsTimeUp(true)
          setMs(0)
          clearInterval(intervalId)
          if(location.pathname !== '/'){
            navigate('/')
          }
          localStorage.removeItem("end")
          localStorage.removeItem("pause")
          localStorage.removeItem("duration")
      }
      }, 1000)

      return ()=>{
        timerSound.pause()
        clearInterval(intervalId)
      }
    }
  }, [duration, isPaused, reset, isCanceled, location, navigate])

  useEffect(()=>{
    if(localStorage.theme)
    {
      ThemeCntx.setTheme(localStorage.theme)
    }
    window.addEventListener('resize', fixRem)

    return  ()=> {
      window.removeEventListener('resize', fixRem)
    }
  }, [])

  useEffect(()=>{
    localStorage.rem = JSON.stringify(rem)
  },[rem])

  useEffect(()=>{
    if(isTimeUp){
      const soundInterval = setInterval(()=>{
         timerSound.play()
      }, 10)
      return ()=>{
        timerSound.pause()
        clearInterval(soundInterval)
      }
    }
  }, [isTimeUp])

  return (
        <div className={"app "+ ThemeCntx.theme}>
          <Navbar isMobileView={isMobileView} toggleMobileNav={toggleMobileNav}/>
          <ProgressBar />
          <div className='fixer'>
            <Routes>
              <Route
              path='/'
              element={
                <Timer 
                  togglePause={togglePause}
                  resetTimer={resetTimer}
                  rem={rem}
                  UpdateRem={UpdateRem}
                  cancelTimer={cancelTimer}
                  duration={duration}
                  setDuration={setDuration}
                  ms={ms}
                  changeTitle={changeTitle}
                  isPaused={isPaused}
                  setPaused={setPaused}
                  setIsCanceled={setIsCanceled}
                  isTimeUp={isTimeUp}
                  toggleTimeUp={toggleTimeUp}
                  fullScreen={fullScreen}
                />} 
              />
              <Route path='/WorldTime' element={<Time changeTitle={changeTitle}/>} />
              <Route path='/AboutUs' element={<AboutUs changeTitle={changeTitle}/>} />
            </Routes>
          </div>
        </div>

  );
}

export default App;

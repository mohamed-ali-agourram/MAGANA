import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { TimerModal } from '../../components/TimerModal/TimerModal';
import { TimerUpModal } from '../../components/TimerUpModal/TimerUpModal';
import { Icons } from '../../components/Icons/Icons';
import { BsPauseCircle } from 'react-icons/bs'
import { VscDebugStart } from 'react-icons/vsc'
import { BiReset } from 'react-icons/bi'
import { ImCancelCircle } from 'react-icons/im'

export const Timer = ({
	togglePause,
	resetTimer,
	rem,
	UpdateRem,
	cancelTimer,
	duration,
	setDuration,
	ms,
	changeTitle,
	isPaused,
	setPaused,
	setIsCanceled,
	isTimeUp,
	toggleTimeUp,
	fullScreen
}: TimerProps)=>{

	const [isModal, setIsModal] = useState(false)
	const [isFull, setIsFull] = useState(false)
	const [text, setText] = useState('')
	const TimerRef = useRef<HTMLDivElement>(null)
  const [times, setTimes] = useState<Array<Times>>([
	  {id: uuidv4(), duration: 3600, time:'01:00:00', title:'1 Hour'},
	  {id: uuidv4(), duration: 7200, time:'02:00:00', title:'2 Hours'},
	  {id: uuidv4(), duration: 10800, time:'03:00:00', title:'3 Hours'},
	])

	function handleKeyStroke(event: KeyboardEvent) {
		switch (event.key) {
			case " ":
				return togglePause()
				break;
		  case "f":
		  case "F":
		  	return fullScreen(TimerRef)
		  	break;
		}
	}

	function openModal()
	{
		if (document.fullscreenElement) {
      document.exitFullscreen()
			setIsFull(false)
		}
		setIsModal(!isModal)
	}

  function deleteTimes(id: string){
    const newTimes = times.filter(time => time.id !== id)
    setTimes(newTimes)
  }

  function getTime(e: React.MouseEvent<HTMLElement>){
    const timeString = (e.target as HTMLElement).innerText
    const myTime = times.find(e=>e.time === timeString) as {time: string, duration: number};
  	const newDuration  = myTime.duration
		setDuration(newDuration);
		localStorage.duration = newDuration
		const end = Date.now() + newDuration * 1000 + 999
		localStorage.end = end
		setPaused(false)
		setIsCanceled(false)
  }

  function cancelTime()
  {
		if (document.fullscreenElement) {
			setIsFull(false)
			document.exitFullscreen()
		}
  	cancelTimer()
  }

	useEffect(()=>{
		if(localStorage.times){
        setTimes(JSON.parse(localStorage.times))
      }
	},[])

	useEffect(()=>{
		if(ms >= 0){
			changeTitle(text)
		}
	}, [text])

  useEffect(()=>{
    if(times.length <= 10){
      localStorage.times = JSON.stringify(times)
    }
  },[times])

	useEffect(()=>{
		document.addEventListener("keydown", handleKeyStroke);
		return () => {
			document.removeEventListener("keydown", handleKeyStroke);
		};
	},[isFull, isPaused])

	useEffect(()=>{
		const newValue = `${Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))>0?Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0')+':':''}${Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0')}:${Math.floor((ms % (1000 * 60)) / 1000).toString().padStart(2, '0')}`
		setText(newValue)
	}, [ms])

	useEffect(()=>{
		if(isTimeUp){
			setIsModal(false)
		}
	}, [isTimeUp])

	return <div className='content'>
		{isTimeUp ?<>
		<div className='fade'>
		<TimerUpModal cancelTimer={cancelTimer} resetTimer={resetTimer} toggleTimeUp={toggleTimeUp}/>
		</div> 
			</>: 
		null}
		{isModal ?<>
		<div className='fade' onClick={openModal}>
		</div> 
			<TimerModal times={times} setDuration={setDuration} setIsModal={setIsModal} setPaused={setPaused} setIsCanceled={setIsCanceled} setTimes={setTimes}/></>: 
		null}
		{times.length>0?<Sidebar times={times} deleteTimes={deleteTimes} getTime={getTime} />:null}
		<div ref={TimerRef} className='timer'>
		<Icons fullScreen={fullScreen} TimerRef={TimerRef} rem={rem} UpdateRem={UpdateRem}/>
			<p style={{fontSize: rem}}>{text}</p>
      <div className="btns">
	      <button onClick={openModal}>Set Time</button>
	      {ms>0?<>
		      <button onClick={togglePause}>{isPaused?<VscDebugStart />:<BsPauseCircle />}</button>
		      <button onClick={resetTimer}><BiReset /></button>
		      <button onClick={cancelTime}><ImCancelCircle /></button>
	      </>:null}
			</div>
		</div>
	</div>
}
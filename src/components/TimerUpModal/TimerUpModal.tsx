export const TimerUpModal= ({resetTimer, cancelTimer, toggleTimeUp}: timerUpModalProps)=>{
	function TimerUpMpdalReset(){
		resetTimer()
		toggleTimeUp()
	}
	function OK(){
		cancelTimer()
		toggleTimeUp()
	}
	return <div className='TimerUpModal'>
		<h1>Time UP</h1>
		<button onClick={TimerUpMpdalReset}>Restart</button>
		<button onClick={OK}>OK</button>
	</div>
}
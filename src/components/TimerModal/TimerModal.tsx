import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export const TimerModal: React.FC<CountDonwModalProps> = (props)=>{

	const { 
		times,
		setDuration, 
		setIsModal,
		setPaused,
		setIsCanceled,
		setTimes
	} = props;

	const [m, setM] = useState(0);
	const [h, setH] = useState(0);
	const [s, setS] = useState(0);
	const [title, setTitle] = useState('')

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if(h!==0 || m!==0 || s!==0){
			const totalDuration = m * 60 + h * 3600 + s;
			setDuration(totalDuration);
			localStorage.duration = totalDuration
			const end = Date.now() + totalDuration * 1000 + 999
			localStorage.end = end
			setIsModal(false)
			setPaused(false)
			setIsCanceled(false)
			const timeString =`${h<10?'0'+h:h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}`
			let MyTitle = 'Timer'
			if(title)
			{
				MyTitle = title
			}
			const newTime = {
				id:uuidv4(),
				duration: totalDuration,
				time:timeString,
				title: MyTitle.charAt(0).toUpperCase()+MyTitle.slice(1)
			}
			if(!times.find(e=>e.time === timeString)){
				if(times.length < 30){
					setTimes([newTime, ...times])
				}else if(times.length === 30){
					const newTimes = times
					newTimes.splice(6,1)
					setTimes([newTime, ...newTimes])
				}
			}else{
				const newTimes = times.filter(e=>e.time !== timeString)
				setTimes([newTime, ...newTimes])
			}
		}
	};

	return <div className='modal fadeIn'>
		<form onSubmit={handleSubmit}>
			<div className='inputs'>
				<label htmlFor='hours'>Hours:
					<div className='nInput'>
							<button type="button" onClick={()=>{if(h<99)setH(h => h+1)}}>+</button>
							<input
							id='Hours'
							name='hours'
							type='number'
							min="0"
							max="99"
							placeholder="0"
							style={{ appearance: 'none' }}
							value={h}
							onChange={e=>setH(Number(e.target.value))}
							/> 
							<button type="button" onClick={()=>{if(h>0)setH(h => h-1)}}>-</button>
					</div>
				</label>
					<label htmlFor='seconds'>Minutes:
						<div className='nInput'>
							<button type="button" onClick={()=>{if(m<99)setM(m => m+1)}}>+</button>
							<input
							id='seconds'
							name='seconds'
							type='number'
							min="0"
							max="99"
							placeholder="0"
							value={m}
							onChange={e=>setM(Number(e.target.value))}
							/>
							<button type="button" onClick={()=>{if(m>0)setM(m => m-1)}}>-</button>
						</div>
				</label>
				<label htmlFor='minutes'>Seconds:
					<div className='nInput'>
							<button type="button" onClick={()=>{if(s<99)setS(s => s+1)}}>+</button>
							<input
							id='minutes'
							name='minutes'
							type='number'
							min="0"
							max="99"
							placeholder="0"
							value={s}
							onChange={e=>setS(Number(e.target.value))}
							/>
							<button type="button" onClick={()=>{if(s>0)setS(s => s-1)}}>-</button>
					</div>
				</label>
					<label htmlFor='title'>Title:
						<div className='modal__input-group'>
						<input
						id='title'
						name='title'
						type='text'
						value={title}
						style={{width : '100%', borderRadius:'10px'}}
						onChange={e=>setTitle(e.target.value)}
						/> 
						</div>
					</label>
			</div>	
			<button className='start'  type="submit" style={{width: '100%'}}>Start</button>
		</form>
	</div>
}
import React, { useState } from 'react';

export const TimeModal = ({openTimeModal, timeZonesList, addZone}: TimeModalProps)=>{
	const [city, setCity] = useState('')
	const [cityOption, setCityOption] = useState<Array<string>>(timeZonesList)
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		if(city){
			addZone(city)
			openTimeModal()
		}else{
			console.log("set a value")
		}
	}

	return <div className='modal fadeIn'>
		<form onSubmit={handleSubmit}>
		<label>
		<p>Pick a city: </p>
			<select
				value={city}
				onChange={e=>setCity(e.target.value)}
			>
				<option style={{display:'none'}} value="" disabled>Select a City</option>
				{cityOption.map((e, index)=>{
					return <option key={index} value={e}>{e}</option>
				})}
			</select>
		</label>
			<button type='submit'>Select</button>
		</form>
	</div>
}
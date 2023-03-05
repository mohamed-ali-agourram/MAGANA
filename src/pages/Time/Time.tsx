import { useState, useEffect } from 'react';
import { timeZones } from '../../data/timeZones'
import { TiDeleteOutline } from 'react-icons/ti';
import { BsFullscreenExit } from 'react-icons/bs';
import { MdAddLocationAlt } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import 'moment-timezone';
import momentTZ from 'moment-timezone';
import moment from 'moment';
import { TimeModal } from '../../components/TimeModal/TimeModal'

export const Time = ({changeTitle}: TimeProps)=>{
	const [date, setDate] = useState(moment().format('LTS'))
	const [zones, setZones] = useState<Array<Zones>>(timeZones)
	const [isModal, setIsModal] = useState(false)

	const timeZonesList = momentTZ.tz.names();

		const fullScreen = (id: string)=>{
			if(document.body.offsetWidth>425){
				const elem = document.getElementById(id)
				if(elem){
				if(elem.requestFullscreen){
					if (document.fullscreenElement) {
						document.exitFullscreen()
					}else{
						elem.requestFullscreen()
					}	
				}
				}
		}
	}
	function addZone(zone: string){
		const newZone = {
			'id': uuidv4(),
			'zone': zone,
			'city': zone.split("/")[1]
		}
		if(!zones.find(e=>e.zone === zone)){
			if(zones.length < 25){
				setZones([newZone, ...zones])
			}else if(zones.length === 25){
				const newZones = zones
				newZones.pop()
				setZones([newZone, ...newZones])
			}
		}else{
			const newZones = zones.filter(e=>e.zone !== zone)
			setZones([newZone, ...newZones])
		}
	}

	function openTimeModal(){
		setIsModal(!isModal)
	}

	function deleteZone(id: string){
		const newZones = zones.filter(zones => zones.id !== id)
		setZones(newZones)
	}

	useEffect(()=>{
		if(localStorage.Zones){
			setZones(JSON.parse(localStorage.Zones))
		}
		changeTitle(moment().format('LTS'))
		let currentTime = setInterval(()=>{
			setDate(moment().format('LTS'))
		},1000)
		return ()=>{
			clearInterval(currentTime)
		}
	},[])

  useEffect(()=>{
  	if(zones.length <= 12){
      localStorage.Zones = JSON.stringify(zones)
  	}
  },[zones])

	useEffect(()=>{
		changeTitle(moment().format('LTS'))
	},[date])

	return <div className='time'>
	<div className="location-icon" onClick={()=>setIsModal(true)}><button><MdAddLocationAlt /></button></div>
	{isModal ?<>
	<div className='fade' onClick={openTimeModal}>
	</div> 
		<TimeModal
		openTimeModal={openTimeModal}
		timeZonesList={timeZonesList}
		addZone={addZone}
		/>
		</>: 
		null}
	<ul>
		{
			zones.map(zone=>{
				return  <li key={zone.id}>
					<div className='zone-btn'>
						<button onClick={()=>fullScreen(zone.id)} className='timeExitFull'><BsFullscreenExit /></button>
						<button onClick={()=>deleteZone(zone.id)} className='deleteZone'><TiDeleteOutline/></button>
					</div>
					<section id={zone.id} onClick={()=>fullScreen(zone.id)}>
							<p className='city'>{zone.city}</p>
							<p>{moment.tz(zone.zone).format('LTS')}</p>
					</section>
				</li>
			})
		}
	</ul>
	</div>
}
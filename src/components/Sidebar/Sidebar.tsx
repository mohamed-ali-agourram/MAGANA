import { FC } from 'react';
//components
import { TiDeleteOutline } from 'react-icons/ti';

export const Sidebar: FC<SidebarProps> = ({times, deleteTimes, getTime})=>{

	return(
	<div className='sidebar popIn'>
		<aside>
			<ul className='times'>
			{
				times.map(e=>{
					return <li key={e.id}>
						<span className="fr" style={{marginRight: '10px'}}>
						{e.title}:
						</span>
						<span className='nb'>
							<span onClick={getTime}>{e.time}</span>
							<button className='removeElem' onClick={()=>deleteTimes(e.id)}><TiDeleteOutline/></button>
						</span>
					</li>
				})
			}
			</ul>
			</aside>
	</div>
	)
}
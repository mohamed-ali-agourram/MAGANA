import { BiZoomIn } from 'react-icons/bi';
import { BiZoomOut } from 'react-icons/bi';
import { BsArrowsFullscreen } from 'react-icons/bs';

export const Icons = ({UpdateRem, rem, fullScreen, TimerRef}: IconsProps)=>{


/*document.body.offsetWidth<768*/
	function zoomOut(){
		if(document.body.offsetWidth>768){
			switch(rem) {
			case '14rem':
				UpdateRem('12rem')
				break;
			case '12rem':
				UpdateRem('10rem')
				break;
			case '10rem':
				UpdateRem('8rem')
				break;
			}
		}else{
			switch(rem) {
				case '10rem':
					UpdateRem('8rem')
					break;
				case '8rem':
					UpdateRem('6rem')
					break;
			}
		}
	}

	function zoomIn(){
		if(document.body.offsetWidth>768){
			switch(rem) {
				case '8rem':
					UpdateRem('10rem')
					break;
				case '10rem':
					UpdateRem('12rem')
					break;
				case '12rem':
					UpdateRem('14rem')
					break;
			}
		}else{
			switch(rem) {
				case '6rem':
					UpdateRem('8rem')
					break;
				case '8rem':
					UpdateRem('10rem')
					break;
			}
		}
	}

	return <div className='icons'>
		<button onClick={zoomOut}><BiZoomOut /></button>
		<button onClick={zoomIn}><BiZoomIn /></button>
		<button onClick={()=>fullScreen(TimerRef)}><BsArrowsFullscreen /></button>
	</div>
}
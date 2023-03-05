/*declare module '.*mp3';

//Timer
type getCountDownDate = (countDown: string)=>void
type ComponentProps = {getLastPath}
type deleteTmes = (id: string)=>void
type getTime = (e: React.MouseEvent<HTMLElement>)=>void
type Times = 
{
	id: string,
	time: string,
	equal: string
}
type SidebarProps = {
	times : Array<Times>,
	deleteTmes: deleteTmes,
	getTime: getTime
}
type TimerProps = {
	time: string,
	times,
	elapsed,
	rem,
	UpdateRem,
	getCountDownDate: getCountDownDate,
	deleteTmes: deleteTmes,
	clearTimer,
	resetTimer,
	startTimer,
	changeTitle,
	getTime:getTime,
	paused: boolean,
	reset: boolean,
	isTimeUp,
	toggleTimeUp,
	timerRef,
	fullScreen
}
type TimerModalProps = {
	openModal: React.Dispatch<React.SetStateAction<boolean>>,
	getCountDownDate: getCountDownDate
}
type timerUpModalProps = {
	resetTimer,
	clearTimer,
	toggleTimeUp
}
//Time
type TimeProps = {
	changeTitle,
}
type TimeModalProps = {
	openTimeModal,
	timeZonesList,
	addZone
}
type Zones = {
	id: string,
	zone: string,
	city: string
}

type IconsProps = {
	UpdateRem,
	rem,
	fullScreen
}

type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: () => void, setThemeContext: ()=>void };

//AboutUs
type AboutUsProps = {
	changeTitle: changeTitle
}

//NavBar
type NavbarProps = {
	isMobileView,
	toggleMobileNav
}*/
declare module '.*mp3';

//ThemeContextProps
type Theme = 'light' | 'dark';
type MyContextProps = {
	theme: Theme,
	setTheme,
	toggleTheme: () => void
}

//CountDonwPage
type TimerProps = {
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
}

type CountDonwModalProps = {
  times: Array<Times>,
  setDuration: (newDuration: number) => void,
  setIsModal : (newValue: boolean) => void,
  setPaused : (newValue : boolean) => void,
  setIsCanceled : (newValue: boolean) => void,
  setTimes : (newValue: Array<Times>) => void
}

type timerUpModalProps = {
  resetTimer,
  cancelTimer,
  toggleTimeUp
}

type IconsProps = {
  rem,
  UpdateRem,
  fullScreen,
  TimerRef
}

type Times = 
{
  id: string,
  duration: number,
  time: string,
  title: string
}

type SidebarProps = {
  times : Array<Times>,
  deleteTimes,
  getTime
}

//Time
type TimeProps = {
  changeTitle,
}
type TimeModalProps = {
  openTimeModal,
  timeZonesList,
  addZone
}
type Zones = {
  id: string,
  zone: string,
  city: string
}
//AboutUs
type AboutUsProps = {
  changeTitle,
}
//NavBar
type NavbarProps = {
	isMobileView,
	toggleMobileNav
}
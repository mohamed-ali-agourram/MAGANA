import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { links } from '../../data/links'
import { BiSun } from 'react-icons/bi';
import { ThemeContext } from '../../context/ThemeContext'
import { BiMoon } from 'react-icons/bi';
import { ImMenu } from 'react-icons/im';
import { TfiClose } from 'react-icons/tfi';


export const Navbar = ({isMobileView, toggleMobileNav} :NavbarProps)=>{
	const ThemeCntx = useContext<MyContextProps>(ThemeContext)

	return (
		<nav>
			<NavLink className='logo' to=''>
				MAGANA
			</NavLink>
			<div className='mobile'>
				<span onClick={ThemeCntx.toggleTheme}>{ThemeCntx.theme === "dark"?<BiMoon/>:<BiSun />}</span>
				<span onClick={toggleMobileNav}><ImMenu /></span>
			</div>
				<ul style={isMobileView?{top:'0%'}:{top:'-100%'}}>
				<li className="closeBtn" onClick={toggleMobileNav}><TfiClose /></li>
		      {
		      	links.map((link, index)=>{
		      		const { path, name } = link
			        return <li onClick={toggleMobileNav} key={index}>
			          <NavLink to={path}>{name}</NavLink>
			        </li>
		      	})
		      }
		      <li className='nav-icon'  onClick={ThemeCntx.toggleTheme}>{ThemeCntx.theme === "dark"?<BiMoon/>:<BiSun />}</li>
		      </ul>
		</nav>
	)
}
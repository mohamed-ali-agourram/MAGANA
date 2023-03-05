import { useEffect } from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { MdOutlineAlternateEmail } from 'react-icons/md'

export const AboutUs = ({changeTitle}: AboutUsProps)=>{
	useEffect(()=>{
		changeTitle('About Us')
	}, [])
	return  <div className="content__aboutus">
        <h1>About Us</h1>
        <div className="aboutus_description">
        <p>
            Welcome to <span className='aboutus__title'>MAGANA</span>! I am a fullstack developer who is passionate about creating intuitive and easy-to-use countdown timers for your projects. My app is designed to help you keep track of time and stay organized, whether you're planning a big event or just trying to stay on top of your daily tasks. With a range of customization options and a clean, modern interface, my countdown timer is the perfect tool for anyone looking to add a little bit of structure and organization to their day. Thank you for choosing <span className='aboutus__title'>MAGANA</span>!
        </p>
        </div>

        <div className="social_media_links">
            <h2>Our media: </h2>
            <div className="links">
            <p><BsGithub />github - <a target="_blank" rel="noreferrer" href="https://github.com/mohamed-ali-agourram">www.github.com/mohamed-ali-agourram</a></p>
            <p><BsLinkedin />linkedin - <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/mohamed-ali-agourram-0768a3219/">https://www.linkedin.com/in/mohamed-ali-agourram</a></p>
            </div>
        </div>


        <div className="gmail">
            <p>If you have any questions please contact us:</p>
            <p><MdOutlineAlternateEmail />email - <b>mohamedaliagourram@gmail.com</b></p>
        </div>
    </div>
}
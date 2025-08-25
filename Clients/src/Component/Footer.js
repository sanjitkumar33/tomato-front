import React from 'react';
import './Footer.css';

const Footer = () => {
    return(
        <>
        <footer>
            <hr/>
            <p className="footText">&copy; Sanjit Developer</p>
            <hr/>
            <div className="footDiv">
                <ul>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    
                </ul>
            </div>
            <div className="footDiv">
                <ul>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    
                </ul>
            </div>
            <div className="footDiv noBorder">
                <ul>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    
                </ul>
            </div>
           
            <div>
                <a href="#">
                    <img src="https://i.ibb.co/QYQxPzb/facebook.png" alt="fblogo" className="sociallogo"/>
                </a>
                <a href="#">
                    <img src="https://i.ibb.co/VgHyPMJ/insta.png" alt="fblogo" className="sociallogo"/>
                </a>
                <a href="#">
                    <img src="https://i.ibb.co/rMZxD0v/youtube1.png" alt="fblogo" className="sociallogo"/>
                </a>

            </div>
        </footer>
        
        </>
    )
}
export default Footer;
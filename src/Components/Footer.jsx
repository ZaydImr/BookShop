import React,{useRef,useState} from 'react';
import {FaPhoneAlt,FaLocationArrow,FaEnvelope} from 'react-icons/fa'
import emailjs from 'emailjs-com'

const Footer =({ContactUsEmail,ContactUsLocation,ContactUsPhoneNumber})=>{

      const name = useRef(null);
      const email = useRef(null);
      const message = useRef(null);
      const [className,setClassName] = useState('btn_send');
      const handleSend = (e) => {
            e.preventDefault();

            emailjs.sendForm('service_zyp61bj', 'template_s71p0nd', e.target, 'user_DpOCYVDYpgSB0zncoq717')
                  .then((result) => {
                        setClassName('btn_valid');
                        setInterval(()=>{
                              setClassName('btn_send');
                        },3000);
                  }, (error) => {
                  console.log(error.text);
                  });
      e.target.reset();
      }

      return (
            <footer>
                  <div className="footContact">
                        
                        <h2>Contact Us</h2><br/>
                        <h4>We'd ❤️ to help!</h4>
                        <p>We like to create things with fun, open-minded people. Feel free to say hello!</p><br/>
                        <div className="contact_frm">
                              <div className="contact_left"> 
                                    <form onSubmit={handleSend}>
                                          <input  name="name" type="text"  placeholder="Your name" ref={name} required/>
                                          <input name="email" type="email" placeholder="Email" ref={email}  required/>
                                          <textarea name="message" rows="12" placeholder="Message" ref={message}  required></textarea>
                                          <input type="submit" value="Send" className={className}/>
                                    </form>
                              </div>
                              <div className="contact_right">
                                    <div className='contact_right_div'>
                                          <FaLocationArrow/>
                                          <label> {ContactUsLocation}</label>
                                    </div>
                                    <div className='contact_right_div'>
                                          <FaPhoneAlt/><label>(+212) {ContactUsPhoneNumber}</label>
                                    </div>
                                    <div className='contact_right_div'>
                                          <FaEnvelope/><label>{ContactUsEmail}</label>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div>
                        <div className="footline"></div>
                        <div className="footDev">
                              <a id='devCopy'>Copyright © 2021 Bookshop</a>
                              <a id='devStyle'> | </a>
                              <a id='devAuth'>Developed by <a href='https://www.linkedin.com/in/zaydimr/' style={{color:'#00aeef'}}>ZAYD EL IMRANI</a></a> 
                        </div>
                  </div>
            </footer>
      )
}
export default Footer;
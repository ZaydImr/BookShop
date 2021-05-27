import React,{useRef,useState} from 'react';
import {FaPhoneAlt,FaEnvelope} from 'react-icons/fa'
import emailjs from 'emailjs-com'

const Footer =({ContactUsEmail,ContactUsPhoneNumber})=>{

      const name = useRef(null);
      const email = useRef(null);
      const message = useRef(null);
      const [className,setClassName] = useState('btn_send');
      const [val,setVal] = useState("Send");
      const [btnDis,setBtnDis] = useState("");

      const handleSend = (e) => {
            e.preventDefault();
            setBtnDis("disabled");
            setClassName('btn_sending');
            setVal("Sending...");
            emailjs.sendForm(process.env.REACT_APP_EMAIL_SERVICE,process.env.REACT_APP_EMAIL_TEMPLATE, e.target,process.env.REACT_APP_EMAIL_USER)
                  .then((result) => {
                        let a = setInterval(()=>{
                              setClassName('btn_send');
                              setVal("Send");
                              setBtnDis("");
                              clearInterval(a);
                        },3000);
                        setClassName('btn_valid');
                        setVal("Sent ✔");
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
                              <div className="contact_right"> 
                              <table>
                                    <tbody>
                                          <tr>
                                                <td><FaPhoneAlt/></td>
                                                <td>+212 {ContactUsPhoneNumber}</td>
                                          </tr>
                                          <tr>
                                                <td><FaEnvelope/></td>
                                                <td>{ContactUsEmail}</td>
                                          </tr>
                                    </tbody>
                                    
                              </table>
                                    <iframe title='maps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4723.209033717234!2d-5.3544192161731345!3d35.584928074351744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b42fdc00b2cc3%3A0xe972e797c022b538!2sMoka3ab!5e0!3m2!1sen!2sma!4v1621388287664!5m2!1sen!2sma" allowFullScreen="" loading="lazy" ></iframe>
                              </div>
                              <div className="contact_left">
                                    <form onSubmit={handleSend}>
                                          <input  name="name" type="text"  placeholder="Your name" ref={name} required/>
                                          <input name="email" type="email" placeholder="Email" ref={email}  required/>
                                          <textarea name="message" rows="7" placeholder="Message" ref={message}  required></textarea>
                                          <input disabled={btnDis} type="submit" value={val} className={className}/>
                                    </form>
                                    </div>
                        </div>
                  </div>
                  <div>
                        <div className="footline"></div>
                        <div className="footDev">
                              <a id='devCopy'>Copyright © 2021 Bookshop</a>
                              <a id='devStyle'> | </a>
                              <p id='devAuth'>Developed by <a href='https://www.linkedin.com/in/zaydimr/' style={{color:'#00aeef'}}>ZAYD EL IMRANI</a></p> 
                        </div>
                  </div>
            </footer>
      )
}
export default Footer;
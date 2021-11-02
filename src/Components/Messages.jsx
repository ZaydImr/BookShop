import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { firestore } from '../firebase/config'

const Messages = () => {

    const [isOpen,setIsOpen] = useState(false)
    const [user,setUser] = useState(null)
    const [message,setMessage] = useState('')
    const [sender,setSender] = useState('Unknown')
    const [id,setId] = useState(0)
    const [messages,setMessages] = useState([])
    const room = useRef(null)

    useEffect(()=>{
        if(localStorage.getItem('userId'))
            setId(localStorage.getItem('userId'))
        firestore.collection('Users').onSnapshot(snap=>{
            setUser(null)
            snap.forEach(doc => {
                if(doc.data().status === 'online' || doc.data().status === 'away' )
                {
                    setUser(doc.data())
                    room.current.scrollIntoView();
                }
            });
        })
        firestore.collection('Messages').orderBy('date').where('userId','==',localStorage.getItem('userId')).onSnapshot(snap=>{
            let messages = [] ;
            snap.forEach(element => {
                messages.push(element.data());
            });
            setMessages(messages)
            room.current.scrollIntoView({ behavior: 'smooth' });
        })
    },[])

    const handleSend = async () => {
        if(user && message)
        {
            await firestore.collection('Messages').add({ date: Date.now(), message , sender , userId: id }).then(res=>{
                if(!id)
                {
                    setId(res.id);
                    localStorage.setItem('userId',res.id)
                    firestore.collection('Messages').doc(res.id).update({ userId: res.id })
                }
            });
            setMessage('')
            room.current.scrollIntoView({ behavior: 'smooth' });
        }
        else
        {

        }
    }

    return ( <div className="messages">
                        <div className="chat" style={{transform: isOpen ? 'none' : 'translate(275px, 395px)', opacity: isOpen ? 1 : 0 }}>
                            <header style={{justifyContent: user ? 'space-between' : 'flex-end'}}>
                                {user && 
                                    (<>
                                        <span>
                                            <img src={user.photoUrl} alt={user.name} />
                                            <label style={{backgroundColor: user.status === 'online' ? '#78de45' : '#f2f553'}}></label>
                                            <label className="tooltip">{user.status}</label>
                                        </span>
                                        <h4>{user.name}</h4>
                                    </>)
                                }
                                <i className="bi bi-x-circle-fill" onClick={()=>{setIsOpen(!isOpen)}}></i>
                            </header>
                            {user && 
                                <div className="room">
                                    {messages.map(message=>(
                                        <Message key={message.date} {...message} />
                                    ))}
                                    <div ref={room}></div>
                                </div>
                            }
                            {!user && 
                            <>
                                <p style={{textAlign:'justify'}}>No one from the team are online now . You can write your question right here and we will reply on your email :</p>
                                <div className="input">
                                    <input type="email" placeholder="Your email address" />
                                </div>

                            </>
                            }
                            <div className="input">
                                <input type="text" placeholder="Message here .." onKeyPress={(e)=>{if(e.key === 'Enter') handleSend()}} value={message} onChange={e=>{setMessage(e.target.value)}} />
                                <div className="btns">
                                    <i class="bi bi-file-earmark-image-fill"></i>
                                    <i className="bi bi-arrow-right-square-fill" onClick={handleSend}></i>
                                </div>
                                
                            </div>
                        </div>
                    <button onClick={()=>{setIsOpen(!isOpen)}}>
                        <i className="bi bi-chat-right-dots"></i>
                    </button>
                </div> )
}

const Message = ({sender,message,date}) => {

    let datee = new Date(date)

    return(
        <div className={sender === "Unknown" ? "message flex-end" : "message"}>
            <label>{message}<p className="tooltip">{datee.getHours()+':'+datee.getMinutes()}</p></label>
        </div>
    )
}

export default Messages

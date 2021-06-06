import React, {useState,useEffect} from 'react';
import About from './About';
import Footer from './Footer';
import Navbar from './Navbar';
import {firestore} from '../firebase/config'
import loadPic from '../assets/load.gif'
import SecondHeader from './SecondHeader';
import Header from './Header';

const Home = () => {
      const [load,setLoad] = useState(true);
      const [info,setInfo] = useState({
            ContactUsEmail:'',
            ContactUsPhoneNumber:'',
            OurStoryDescription:''
      });
      const [books, setBooks] = useState([])

      useEffect(()=>{
                  let i =1;
                  const unsub = firestore.collection('Book').onSnapshot((snap)=>{
                  let books = [];
                  for (const book of snap.docs) {
                        books.push({...book.data()});
                        if(i===3)
                              break;
                        i++;
                  };
                  setBooks(books);
                  return () => unsub();
            });
      },[])

      useEffect(() =>{
            setLoad(true);
            try{
                  const unsub = firestore.collection('Home').onSnapshot((snap)=>{
                  let info = {
                        ContactUsEmail:'',
                        ContactUsPhoneNumber:'',
                        OurStoryDescription:''
                  };
                  snap.forEach(doc => {
                        info.ContactUsEmail = doc.data().ContactUsEmail;
                        info.ContactUsPhoneNumber = doc.data().ContactUsPhoneNumber;
                        info.OurStoryDescription = doc.data().OurStoryDescription;
                  });
                  setInfo(info)
                  setLoad(false);
                  if(window.location.hash === '#Contact')
                        document.getElementById('Contact').scrollIntoView();
                  else if(window.location.hash === '#About')
                        document.getElementById('About').scrollIntoView();
                  return () => unsub();
                  })}catch(err){setLoad(true)}
      },[]);
      return(<>
            {load?(
            <div className='home-loading'>
                  <img src={loadPic} alt='Loading ...'/></div>):(
            <div>
                  <Navbar/>
                  <div id='botNav' style={{height:'72px'}}/>
                  <Header/>
                  <SecondHeader books={books}/>
                  <div id='About'/>
                  <About OurStoryDescription={info.OurStoryDescription}/>
                  <div id='Contact'/>
                  <Footer ContactUsEmail={info.ContactUsEmail} ContactUsPhoneNumber={info.ContactUsPhoneNumber}/>

            </div>)}</>
      )
}

export default Home ;
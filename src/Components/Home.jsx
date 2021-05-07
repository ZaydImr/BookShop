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
            ContactUsLocation:'',
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
                  let info = [];
                  snap.forEach(doc => {
                        info.push({...doc.data(),id: doc.id});
                  });
                  setInfo(info)
                  setLoad(false);
                  return () => unsub();
                  })}catch(err){setLoad(true)}
      },[]);
      return(<>{load?(
            <div className='home-loading'>
                  <img src={loadPic} alt='Loading ...'/></div>):(
            <div>
                  <Navbar/>
                  <div style={{height:'72px'}}/>
                  <Header/>
                  <SecondHeader books={books}/>
                  <div id='About'/>
                  {info.map((item,index)=>{
                        const {ContactUsEmail,ContactUsLocation,ContactUsPhoneNumber,OurStoryDescription} = item;
                  return(
                        <React.Fragment key={index}>
                              <About OurStoryDescription={OurStoryDescription}/>
                              <div id='Contact'/>
                              <Footer ContactUsEmail={ContactUsEmail} ContactUsLocation={ContactUsLocation} ContactUsPhoneNumber={ContactUsPhoneNumber}/>
                        </React.Fragment>)
                  })}
            </div>)}</>
      )
}

export default Home ;
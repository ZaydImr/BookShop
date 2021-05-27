import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { firestore } from '../firebase/config';

const About = ({OurStoryDescription}) =>{
      const [index,setIndex] = useState(1);
      const [office,setOffice] =useState([]);

      const getPics =()=>{
            const unsub = firestore.collection('imgs').onSnapshot((snap)=>{
                  let img = [];
                  snap.forEach(doc => {
                        img.push(doc.data().imgUrl);
                  });   
                  setOffice(img);
                  return () => unsub();})
      }
      
      useEffect(()=>{
            if(index <0)
                  setIndex(office.length-1)
            if(index >= office.length)
                  setIndex(0);
      },[index])

      useEffect(()=>{
            let interval = setInterval(()=>{
                  setIndex(index+1);
            },3000);
            return () => clearInterval(interval);
      },[index])

      useEffect(()=>{
            getPics();
      },[])
      return (
            <div className='about'>
                  <h2>Our story</h2>
                  <p>{OurStoryDescription}</p>
                  <h2>Our office</h2>                  
                  <section className='section'>
                        <div className='section-center'>
                              {office.map((item,perIndex)=>{
                                    let position = 'nextSlide';
                                    if(index === perIndex)
                                          position = 'activeSlide';
                                    if(index-1 === perIndex || (index===0 && perIndex === office.length-1))
                                          position = 'lastSlide';
                                    return (
                                          <article className={position} key={perIndex}>
                                                <img src={item} alt={'Image '+(perIndex+1)} className='person-img'/>
                                          </article>)
                              })}
                              <button className='prev' onClick={() =>setIndex(index-1)}><FaChevronLeft/></button>
                              <button className='next'onClick={() =>setIndex(index+1)}><FaChevronRight/></button>
                        </div>
                  </section>;
            </div>
      )
}

export default About;
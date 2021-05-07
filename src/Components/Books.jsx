import React , {useState,useEffect} from 'react'
import Book from './Book'
import Navbar from './Navbar';
import {FaSearch} from 'react-icons/fa';
import {firestore} from '../firebase/config'
import {ImSpinner10} from 'react-icons/im'

const Books = () =>{
      const [load,setLoad] = useState(true);
      const [books,setBooks] = useState([])

      const handleSearch = (e) =>{
            e.preventDefault();
      }

      useEffect(()=>{
                  const unsub = firestore.collection('Book').onSnapshot((snap)=>{
                  let books = [];
                  snap.forEach(doc => {
                        books.push({...doc.data(),id: doc.id});
                  });
                  setBooks(()=>{
                        return [...books]
                  });
                  setLoad(false);
                  return () => unsub();
            });
      },[])

      return(
            <>
                  <Navbar/>
                  <div style={{height:'72px'}}></div>
                  <section className='search'>
                        <form className='search-form'>
                              <input type='text' placeholder='Search' className='form-input'/>
                              <button type='submit' className='submit-btn' onClick={(e)=>handleSearch(e)} ><FaSearch/></button>
                        </form>
                  </section>
                  {load?(<h2><ImSpinner10 className='rotate' style={{color:'#00aeef'}}/></h2>):(
                  <section className='books'>
                        <div className='books-center'>
                        {books.map((book,index)=>{
                              return <Book key={index} {...book}/>
                        })}
                        </div>
                  </section>)}
            </>
      )
}

export default Books;
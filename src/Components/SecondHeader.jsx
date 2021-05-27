import React from 'react'
import {Link} from 'react-router-dom'

const secondHeader = ({books}) => {
      return (
            <form className='secondHeader'>
            <div className='header-books'>
                  {books.map((book,index)=>{
                        const {ISBN,Bookname,Author,Description,Price,imgUrl} = book;
                              return(<Link to={`/book/${ISBN}`} key={index}>
                                                <article  className='book' style={{minWidth:343}}>
                                                      <div className='book-cover'>
                                                            <div className='book-img'>
                                                                  <img src={imgUrl} alt={Bookname}/>
                                                            </div>
                                                      </div>
                                                      <div className='book-info'>
                                                            <h4 className='bookname'>{Bookname}</h4>
                                                            <h4 className='author'>{Author}</h4>
                                                            <p>{Description}</p>
                                                            <h4 className='price'>{Price}$</h4>
                                                      </div>
                                                </article>
                                          </Link>)
                        })}
            </div>
            <Link to='/books'><input type='button' value='See more' /></Link>
      </form>               
      )
}

export default secondHeader

import React from 'react';
import { Link } from 'react-router-dom';

const Book =({ISBN,Bookname,Author,Description,Price,imgUrl})=> {

      return (
            <Link to={`/book/${ISBN}`}>
                  <article className='book'>
                        <div className='book-cover'>
                              <div className='book-img'>
                                    <img src={imgUrl} alt={Bookname}/>
                              </div>
                        </div>
                        <div className='book-info'>
                              <h4 className='bookname'>{Bookname}</h4>
                              <h4 className='author'>{Author}</h4>
                              <p>{Description.length > 110 ? Description.substring(0,110) + '...'  : Description}</p>
                              <h4 className='price'>{parseFloat(Price).toFixed(2)}$</h4>
                        </div>
                  </article>
      </Link>)
}

export default Book;
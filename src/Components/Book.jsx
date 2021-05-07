import React from 'react';

const Book =({Bookname,Author,Description,Price,imgUrl})=> {

      return (
      <article className='book'>
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
      </article>)
}

export default Book;
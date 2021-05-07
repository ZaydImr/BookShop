import React , {useEffect,useState} from 'react'
import {firestore} from '../../firebase/config'
import AddBook from './AddBook';

const Books = () => {
      const [books,setBooks] = useState([]);
      const [add,setAdd] = useState(false);

      useEffect(()=>{
                  const unsub = firestore.collection('Book').orderBy('Bookname').onSnapshot((snap)=>{
                  let books = [];
                  snap.forEach(doc => {
                        books.push({...doc.data()});
                  });
                  setBooks([...books]);
                  return () => unsub();
            });
      },[])

      const handleDelete = (ISBN) =>{
            firestore.collection('Book').where('ISBN','==',ISBN).get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                  doc.ref.delete();
                  });
            });
      }

      const handleClear = () => {
            firestore.collection('Book').get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                  doc.ref.delete();
                  });
            });
      }

      return (
            <div className='admin-book'>
                  <div  className="chart-container" style={{margin:'0 auto 14px auto',width:'fit-content'}}>
                        {add ||<input type='button' value='Add book' onClick={()=>{setAdd(true)}} />}
                        <input type='button' value='Clear all books' onClick={handleClear}/>
                  </div>
                  {add&& <AddBook setAdd={setAdd} />}
                  <table className='admin-book-table'>
                        <thead>
                              <tr>
                                    <th>ISBN</th>
                                    <th>Bookname</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Action</th>
                              </tr>
                        </thead>
                        <tbody>
                              {books.map((book)=>{
                              const {ISBN,Bookname,Author,Category,Price} = book;
                              return<tr key={ISBN}>
                                    <td>{ISBN}</td>
                                    <td>{Bookname}</td>
                                    <td>{Author}</td>
                                    <td>{Category}</td>
                                    <td>{Price} $</td>
                                    <td>
                                          <input type="button" value="Edit"/>
                                          <input type="button" value="Delete" onClick={()=>handleDelete(ISBN)}/>
                                    </td>
                              </tr>
                              })}
                        </tbody>
                        
                  </table>
            </div>
      )
}

export default Books

import React , {useEffect,useState} from 'react'
import {firestore} from '../../firebase/config'
import AddBook from './AddBook';
import swal from 'sweetalert';


const Books = () => {
      const [books,setBooks] = useState([]);
      const [booksBac,setBooksBac] = useState([]);
      const [add,setAdd] = useState(false);
      const [search,setSearch] = useState('');

      useEffect(()=>{
                  const unsub = firestore.collection('Book').orderBy('Bookname').onSnapshot((snap)=>{
                  let books = [];
                  snap.forEach(doc => {
                        let docId = doc.id;
                        books.push({...doc.data(),docId});
                  });
                  setBooksBac([...books]);
                  setBooks([...books]);
                  return () => unsub();
            });
      },[])
      
      const Search = () =>{
            if(search !=='') {
                  const newData = booksBac.filter(person => person.Bookname.toLowerCase().includes(search.toLowerCase()));
                  setBooks(newData);
            }
            else{
                  setBooks(booksBac);
            }
      }

      const handleDelete = (ISBN) =>{
            swal({
                  title: "Are you sure?",
                  text: "Once deleted, you will not be able to recover this book!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                  }).then((willDelete) => {
                  if (willDelete) {
                        firestore.collection('Book').where('ISBN','==',ISBN).get().then(function(querySnapshot) {
                              querySnapshot.forEach(function(doc) {
                              doc.ref.delete();
                              swal("Poof! Your book has been deleted!", {
                                    icon: "success",
                              });
                              });
                        });
                  } else {
                        swal("Your book is safe!");
                  }
                  });
      }

      const handleClear = () => {
            swal({
                  title: "Are you sure?",
                  text: "Once deleted, you will not be able to recover All the books!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                  }).then((willDelete) => {
                  if (willDelete) {
                        firestore.collection('Book').get().then(function(querySnapshot) {
                              querySnapshot.forEach(function(doc) {
                              doc.ref.delete();
                              });
                              swal("Poof! Your books has been deleted!", {
                                    icon: "success",
                              });
                        });
            } else {
                  swal("Your books is safe!");
            }
            });
      }

      const handleChangePrice = (e,docId,book)=>{
            firestore.collection('Book').doc(docId).set({...book,Price: e.target.value});
      }
      const handleChangeBookname = (e,docId,book)=>{
            firestore.collection('Book').doc(docId).set({...book,Bookname: e.target.value});
      }
      const handleChangeAuthor = (e,docId,book)=>{
            firestore.collection('Book').doc(docId).set({...book,Author: e.target.value});
      }
      const handleChangeCategory = (e,docId,book)=>{
            firestore.collection('Book').doc(docId).set({...book,Category: e.target.value});
      }

      return (
            <div className='admin-book'>
                  {add&& <AddBook setAdd={setAdd} />}
                  <div className='' style={{display:'flex',flexDirection:'column',justifyContent :'center',padding:'.5rem',background:'#fff',borderRadius:'.5rem',maxWidth:'1000px',margin:'auto'}}>
                        <div  className="chart-container" style={{background:'#fff',padding:'0rem 0 .5rem 0'}}>
                              <input type="text" style={{width:'100%'}} placeholder='Search' value={search} onKeyUp={()=>Search()} onChange={(e)=>setSearch(e.target.value)}/>
                              {add ||<input type='button' value='Add book' onClick={()=>{setAdd(true)}} />}
                              <input type='button' value='Clear all books' onClick={handleClear}/>
                        </div>
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
                                    const {ISBN,Bookname,Author,Category,Price,docId} = book;
                                    return<tr key={ISBN}>
                                          <td>{ISBN}</td>
                                          <td><input type='text' value={Bookname} onChange={(e)=>{handleChangeBookname(e,docId,book)}}/></td>
                                          <td><input type='text' value={Author} onChange={(e)=>{handleChangeAuthor(e,docId,book)}}/></td>
                                          <td><input type='text' value={Category} onChange={(e)=>{handleChangeCategory(e,docId,book)}}/></td>
                                          <td><input type='text' value={Price} onChange={(e)=>{handleChangePrice(e,docId,book)}}/></td>
                                          <td>
                                                <input type="button" value="Delete" onClick={()=>handleDelete(ISBN)}/>
                                          </td>
                                    </tr>
                                    })}
                              </tbody>
                              
                        </table>
                  </div>
                  
            </div>
      )
}

export default Books

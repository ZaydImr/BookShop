import React, {useState} from 'react'
import {firestore,storage} from '../../firebase/config'
import { FaMoneyBillWave,FaFileSignature,FaSortAmountUpAlt,FaFeatherAlt,FaBarcode, FaFileUpload,FaLayerGroup } from 'react-icons/fa'
import {ImSpinner10} from 'react-icons/im'

const AddBook = ({setAdd}) => {
      const types = ['image/png','image/jpeg'];
      const [file,setFile] =  useState(null);
      const [addClick,setAddClick] = useState(true);
      const [err,setErr] = useState('');
      const [data,setData] = useState({
            ISBN: '',
            Bookname : '',
            Author: '',
            Category:'',
            Qte:'',
            Price: '',
            Description:'',
            imgUrl:''
      })
      const validISBN= new RegExp('^[0-9]+.{5,}$');
      const validAuthor = new RegExp('^(([a-zA-Z]{2,15}){1}(\\s([a-zA-Z]{2,15}))+)$');
      const validCategory = new RegExp('^[A-Za-z]+$');
      const validQte = new RegExp('^[0-9]+$');
      const validPrice = new RegExp('^(\\d{1,5})$|^(\\d{1,5},\\d{1,2})$|^(\\d{1,2}\\.\\d{1,})$|^(\\d{1,2}\\.\\d{3,3},\\d{1,2})$');

      


      const handleAdd = (e)=>{
            setErr('');
            e.preventDefault();
            
            if (!validISBN.test(data.ISBN)) {
                  setErr('ISBN incorrect !');
                  return;
            }
            if (!validAuthor.test(data.Author)) {
                  setErr('Author name incorrect !');
                  return;
            }
            
            if (!validCategory.test(data.Category)) {
                  setErr('Category incorrect !');
                  return;
            }
            if (!validQte.test(data.Qte)) {
                  setErr('Qte incorrect !');
                  return;
            }
            if (!validPrice.test(data.Price)) {
                  setErr('Price format incorrect !');
                  return;
            }

            var {ISBN,Bookname,Author,Category,Qte,Price,Description} = data;

            if(ISBN && Bookname && Author && Category && Qte && Price && Description && file){
                  setAddClick(false);
                  var storageRef = storage.ref('Books/'+(Math.random()*10)+file.name);
                  let up = storageRef.put(file);
                  up.on('state_changed',() => {},() => {}, 
                  () => {
                        up.snapshot.ref.getDownloadURL().then((downloadURL) => {
                              data.imgUrl= downloadURL;
                              firestore.collection("Book").add(data).then(()=>{e.target.reset();setAddClick(true);}).catch((err)=>setErr(err));
                  });});
                  }
            else{
                  setErr('Please Fill Blanks');
            };
      }

      const handleFile = (e) =>{
            let selected = e.target.files[0];
            setFile(selected);
      }

      const handleReset =()=>{
            setErr('');
            setData({
                  ISBN: '',
                  Bookname : '',
                  Author: '',
                  Category:'',
                  Qte:'',
                  Price: '',
                  Description:'',
                  imgUrl:''
            })
      }
      
      return (
            <form id='frm-add-book' className='admin-book-add' onSubmit={handleAdd}>
                        <h4 style={{fontSize:'1.25rem',margin: '1.5rem'}}>Add book</h4>
                        <div className='admin-frm-cont'>
                              <div className='admin-frm-input'>
                                    <FaBarcode/>
                                    <input autoFocus type="text" placeholder='Enter ISBN' value={data.ISBN} onChange={(e)=>setData({...data, ISBN:e.target.value})}/>
                              </div>
                              <div className='admin-frm-input'>
                                    <FaFileSignature/>
                                    <input type="text" placeholder='Enter Bookname' value={data.Bookname} onChange={(e)=>setData({...data, Bookname:e.target.value})}/>
                              </div>
                              <div className='admin-frm-input'>
                                    <FaFeatherAlt/>
                                    <input type="text" placeholder='Enter Author' value={data.Author} onChange={(e)=>setData({...data, Author:e.target.value})}/>
                              </div>
                              <div className='admin-frm-input'>
                                    <FaSortAmountUpAlt/>
                                    <input type="text" placeholder='Enter Category' value={data.Category} onChange={(e)=>setData({...data, Category:e.target.value})}/>
                              </div>
                              <div className='admin-frm-input'>
                                    <FaLayerGroup/>
                                    <input type="text" placeholder='Enter quantity' value={data.Qte} onChange={(e)=>setData({...data, Qte:e.target.value})}/>
                              </div>
                              <div className='admin-frm-input'>
                                    <FaMoneyBillWave/>
                                    <input type="text" placeholder='Enter Price' value={data.Price} onChange={(e)=>setData({...data, Price:e.target.value})}/>
                              </div>
                              <div style={{margin:'auto',width:'60%',alignItems:'center',display:'flex',position:'relative'}}>
                                    <label style={{paddingLeft:5,display:'flex',alignItems:'center',textAlign:'center',cursor:'pointer'}} className='admin-frm-input'>
                                          <input style={{display:'none',width:'100%',height:'100%',cursor:'pointer',visibility:'hidden'}} type="file" accept="image/png, image/jpeg" onChange={handleFile}/>
                                          Choose File ...
                                          <FaFileUpload style={{margin:'auto',position:'relative'}} />
                                    </label>
                              </div> 
                              <textarea placeholder='Enter description' value={data.Description} onChange={(e)=>setData({...data, Description:e.target.value})}>

                              </textarea>
                              
                        </div>
                        <div className='admin-frm-btn'>
                              {err && (<><span style={{display:'inline-block',color:'red',fontSize:14,margin:5}}>{err}</span><br/></>)}
                              {addClick?(<><input type="submit" value="Add"/>
                              <input type="reset" value="Reset" onClick={handleReset}  />
                              <input type="button" value="Cancel" onClick={()=>setAdd(false)}/></>):(
                                    <><ImSpinner10 className='rotate'/></>
                              )}
                              
                        </div>
                  </form>
      )
}

export default AddBook

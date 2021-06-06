import { firestore } from '../../firebase/config';
import React, { useEffect,useState } from 'react'
import {Line} from 'react-chartjs-2'

const AdminLeft = () => {
      const [client,setClient] = useState(100);
      const [book,setBookNb] = useState(50);
      const [users,setUsers] = useState(50);
      
      const books = (book,nb) =>{
            return (book/(nb/100)).toFixed();
      }

      useEffect(()=>{
            var todayMoi = new Date();
            todayMoi.setDate(todayMoi.getDate()-29);
            var dd = String(todayMoi.getDate()).padStart(2, '0');
            var mm = String(todayMoi.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = todayMoi.getFullYear();
            todayMoi = mm + '_' + dd + '_' + yyyy;
            firestore.collection("Visitors").get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                        if(doc.id >= todayMoi){
                              setClient(doc.data().counter)
                        }
                  });
            });
            firestore.collection('Book').get().then(snap => {
                  setBookNb (snap.size);
            });
            firestore.collection('Users').get().then(snap => {
                  setUsers (snap.size);
            });
      })

      return(
            <React.Fragment>
                  <div className="dashboard_infos">
                        <div className="chart-container-wrapper">
                              <div className="chart-container">
                                    <div className="chart-info-wrapper">
                                          <h2>Visitors</h2>
                                          <span>{client}</span>
                                    </div>
                                    <div className="chart-svg" style={{opacity:0}}>
                                                <svg viewBox="0 0 36 36" className="circular-chart pink">
                                          <path className="circle-bg" d="M18 2.0845
                                          a 15.9155 15.9155 0 0 1 0 31.831
                                          a 15.9155 15.9155 0 0 1 0 -31.831" ></path>
                                          <path className="circle"  d="M18 2.0845
                                          a 15.9155 15.9155 0 0 1 0 31.831
                                          a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                                          <text x="18" y="20.35" className="percentage">%</text>
                                    </svg>
                                    </div>
                              </div>
                        </div>
                        <div className="chart-container-wrapper">
                        <div className="chart-container">
                        <div className="chart-info-wrapper">
                              <h2>Books</h2>
                              <span>{book}</span>
                        </div>
                        <div className="chart-svg">
                              <svg viewBox="0 0 36 36" className="circular-chart blue">
                        <path className="circle-bg" d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <path className="circle" strokeDasharray={books(book,100)+", 100"} d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <text x="18" y="20.35" className="percentage">{books(book,100)}%</text>
                  </svg>
                        </div>
                        </div>
                        </div>
                        <div className="chart-container-wrapper">
                        <div className="chart-container">
                        <div className="chart-info-wrapper">
                              <h2>Users</h2>
                              <span>{users}</span>
                        </div>
                        <div className="chart-svg">
                              <svg viewBox="0 0 36 36" className="circular-chart orange">
                        <path className="circle-bg" d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <path className="circle" strokeDasharray={users*10+", 100"} d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <text x="18" y="20.35" className="percentage">{users*10}%</text>
                  </svg>
                        </div>
                        </div>
                        </div>
                  </div>
                  <Line
                        data={{
                              labels : ['red','green','blue'],
                              data : [12,19,3],
                              backgroundColor:'red',
                        }}
                        width={500}
                        height={300}
                  />
            </React.Fragment>)
}

export default AdminLeft;
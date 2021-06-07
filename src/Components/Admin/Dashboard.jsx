import { firestore } from '../../firebase/config';
import React, { useEffect,useState } from 'react'
import {Line} from 'react-chartjs-2'

const AdminLeft = () => {
      const [loading,setLoad] = useState(false);
      const [client,setClient] = useState(0);
      const [book,setBookNb] = useState(0);
      const [users,setUsers] = useState(0);
      const [labelsChart,setLabels] = useState([]);

         const [dataChart,setData]  = useState([]);   
      const books = (book,nb) =>{
            return (book/(nb/100)).toFixed();
      }
      useEffect(()=>{
            setLoad(false);
            var todayMoi = new Date();
            todayMoi.setDate(todayMoi.getDate()-29);
            var dd = String(todayMoi.getDate()).padStart(2, '0');
            var mm = String(todayMoi.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = todayMoi.getFullYear();
            todayMoi = mm + '_' + dd + '_' + yyyy;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '_' + dd + '_' + yyyy;
            firestore.collection("Visitors").get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                        if(doc.id >= todayMoi){
                              setClient(doc.data().counter+1);
                        }
                  });
                  let i=-29;
                        while(i<=0)
                        {
                              var daytst = new Date();
                              daytst.setDate(daytst.getDate()+i);
                              var dd = String(daytst.getDate()).padStart(2, '0');
                              var mm = String(daytst.getMonth() + 1).padStart(2, '0'); //January is 0!
                              var yyyy = daytst.getFullYear();
                              daytst = mm + '_' + dd + '_' + yyyy;
                              labelsChart.push('Day : '+dd)
                              i++;
                              let cp ;
                              querySnapshot.forEach((doc) => {
                                    if(doc.id == daytst){
                                          dataChart.push(doc.data().counter);
                                          cp = true;
                                    }
                              });
                              if(!cp)
                                    dataChart.push(0);
                        }
            });
      },[])

      useEffect(()=>{
            firestore.collection('Book').get().then(snap => {
                  setBookNb (snap.size);
            });
            firestore.collection('Users').get().then(snap => {
                  setUsers (snap.size);
                  setLoad(true);
            });
      },[])

      let gradient;
      function getGradient(ctx, chartArea) {
            gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, '#01081f');
            gradient.addColorStop(0.8, '#3d7eff');

      return gradient;
      }
      return(
            loading ?(<React.Fragment>
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
                  <div className="chart">
                        <div>
                              <h2>Top Visitors</h2>
                              <span>Last 30 days</span>
                        </div>
                        <Line
                              data={
                                    {
                                          labels: labelsChart,
                                          datasets: [{
                                                label: '',
                                                data: dataChart,
                                                backgroundColor: function(context) {
                                                      const chart = context.chart;
                                                      const {ctx, chartArea} = chart;
                                                      if (!chartArea) {
                                                      // This case happens on initial chart load
                                                            return null;
                                                      }
                                                      return getGradient(ctx, chartArea);
                                                },
                                                borderColor: '#fff',
                                                borderWidth: 2,
                                                pointBackgroundColor:'#fff',
                                                pointHoverBackgroundColor:'#fff',
                                                pointHoverBorderColor:'#fff',
                                                pointHoverBorderWidth:4,
                                                fill:true,
                                                tension:0.3
                                          }]
                                    }
                              }
                              options ={{
                                    scales: {
                                    y: {
                                          stacked: false,
                                          beginAtZero: true
                                    }
                                    }
                              }}
                        />
                  </div>
            </React.Fragment>):(<p>...</p>)
            )
            
}

export default AdminLeft;
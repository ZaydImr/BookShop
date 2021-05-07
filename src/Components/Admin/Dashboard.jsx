import React, { useState } from 'react'

const AdminLeft = () => {
      const [client,setClient] = useState(100);
      const [book,setBookNb] = useState(50);
      const [users,setUsers] = useState(50);
      
      const books = (book,nb) =>{
            return (book/(nb/100)).toFixed();
      }

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
                        <path className="circle" strokeDasharray={books(book,150)+", 100"} d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <text x="18" y="20.35" className="percentage">{books(book,150)}%</text>
                  </svg>
                        </div>
                        </div>
                        </div>
                        <div className="chart-container-wrapper">
                        <div className="chart-container">
                        <div className="chart-info-wrapper">
                              <h2>Users</h2>
                              <span>{}</span>
                        </div>
                        <div className="chart-svg">
                              <svg viewBox="0 0 36 36" className="circular-chart orange">
                        <path className="circle-bg" d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <path className="circle" strokeDasharray={users+", 100"} d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <text x="18" y="20.35" className="percentage">{users}%</text>
                  </svg>
                        </div>
                        </div>
                        </div>
                  </div>
                  
            </React.Fragment>)
}

export default AdminLeft;
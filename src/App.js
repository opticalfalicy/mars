import React from 'react';
import './index.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>MARS</h1>

      <div className="data">
        <ul className='data-list'>
          <li className='data-item at'>Temperature</li>
          <li className='data-item hws'>Wind Speed</li>
          <li className='data-item pre'>Atmospheric Pressure</li>
          <li className='data-item season'>Season</li>
          <li className='data-item last-utc'>Time of Last Datum</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

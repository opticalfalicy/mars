import React from 'react';
import './index.css';
import './App.css';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      sol: null
    }

  }

  

  async componentDidMount(){
    const url = "https://api.nasa.gov/insight_weather/?api_key=lb96rqTKlAn28jteWtjnR5SP04xTcmawNMzV5Djc&feedtype=json&ver=1.0"
    const response = await fetch(url);
    const data = await response.json();
    let solK = data.sol_keys[0];
    this.setState({
      sol: data[solK]
    })
    console.log(this.state.sol);
  }
  

  render(){
  let sol = this.state.sol;

  if(this.state.sol !== null){
  return (
    <div className="App">
      <h1>Mars</h1>

      <div className="data">
        <ul className='data-list'>
          <li className='data-item at'>Temperature</li>
          <li className='data-item hws'>Wind Speed</li>
          <li className='data-item pre'>Atmospheric Pressure</li>
          <li className='data-item season'>Season: {this.state.sol.Season}</li>
          <li className='data-item last-utc'>Time of Last Datum</li>
        </ul>
      </div>
    </div>
  );
}

else{
  return(
    <div style={{color: 'white'}}>Hold Up</div>
  )
}
  }
}


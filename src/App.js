import React from 'react';
import './index.css';
import './App.css';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      sol: null,
      currSol: null,
      temp: null,
      wind: null,
      utc: null,
      pressure: null,
      season: null
    }

  }

  

  async componentDidMount(){
    const url = "https://api.nasa.gov/insight_weather/?api_key=lb96rqTKlAn28jteWtjnR5SP04xTcmawNMzV5Djc&feedtype=json&ver=1.0"
    const response = await fetch(url);
    const data = await response.json();
    let solK = data.sol_keys[6];
    this.setState({
      sol: data[solK],
      currSol: data.sol_keys[6],
      temp: data[solK].AT.av,
      wind: data[solK].HWS.av,
      utc: data[solK].Last_UTC,
      pressure: data[solK].PRE.av,
      season: data[solK].Season

    })
    console.log(this.state);
  }

  pressConv(pressure){
    return Math.round(pressure * 100) / 100;
  }

  tempConv(cel){
    let far = (cel * 9/5) + 32;
    return far;
  }

  winConv(ms){
    let mph = (ms * 3600 / 1610.3*1000)/1000;
    return Math.round(mph * 100) / 100;
  }

  utcConv(ut){
    // let localUT = new Date(ut);
    // let lUT = localUT.toISOString();

    var uT = new Date(ut); // Or the date you'd like converted.
    var lT = new Date(uT.getTime() - (uT.getTimezoneOffset() * 60000)).toISOString();
    let dTarr = lT.split('T');    
    console.log(dTarr)
    let date = dTarr.shift();
    let time = dTarr.pop();
    let suffix = time 
    time = time.replace(/.000z/gi, " ");
    return date + " " + time;
  }

  render(){
  let sol = this.state.sol;

  if(this.state.sol !== null){
  return (
    <div className="App">
      <h1>Mars: Sol {this.state.currSol}</h1>

      <div className="data">
        <ul className='data-list'>
          <li className='data-item at' sol={this.sol}>Temperature: {this.tempConv(this.state.temp)}℉</li>
          <li className='data-item hws' sol={this.sol}>Wind Speed: {this.winConv(this.state.wind)} mph</li>
          <li className='data-item pre' sol={this.sol}>Atmospheric Pressure: {this.pressConv(this.state.pressure)} Pa</li>
          <li className='data-item season' sol={this.sol}>Season: {this.state.season}</li>
          <li className='data-item last-utc' sol={this.sol}>Time of Last Recorded Data: {this.utcConv(this.state.utc)}</li>
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


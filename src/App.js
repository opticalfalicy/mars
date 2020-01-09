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
    // console.log(Object.keys(this.state.sol), 'state');
    // let solChk = Object.keys(this.state.sol);
    // let nullify;

    // for(let i = 0; i < solChk.length; i++){
    //   if(solChk[0] !== 'AT') this.setState({temp: null})
    //   if(solChk[0] === 'AT') this.setState({temp: this.state.AT.av});
      
    // }

    // let sol = this.state.sol

    // for(let i = 0; i < this.state.sol.length)
  }

  pressConv(pressure){
    if(pressure == undefined) return 'Currently Unavailable';
    else {
      
      return Math.round(pressure * 100) / 100 + 'Pa'
  };
  }

  tempConv(cel){
    if(cel == undefined) return 'Currently Unavailable';
    else {
      let far = (cel * 9/5) + 32;
      return Math.round(far * 100) / 100 + '℉';
    }
  }

  winConv(ms){
    if(ms == undefined) return 'Currently Unavailable';
    else{
    let mph = (ms * 3600 / 1610.3*1000)/1000;
    return Math.round(mph * 100) / 100 + 'mph';
    }
  }

  seasonConv(seas){
    if(seas == null) return 'Currently Unavailable';
    else return seas.toUpperCase();
  }

  utcConv(ut){
    // let localUT = new Date(ut);
    // let lUT = localUT.toISOString();

    if(ut == undefined) return 'Currently Unavailable';

    else{
    var uT = new Date(ut); // Or the date you'd like converted.
    var lT = new Date(uT.getTime() - (uT.getTimezoneOffset() * 60000)).toISOString();
    let dTarr = lT.split('T');    
    console.log(dTarr)
    let date = dTarr.shift();
    let time = dTarr.pop();
    let suffix = time;
    time = time.replace(/.000z/gi, " ");
    return date + " " + time;
    }
  }

  render(){
  let sol = this.state.sol;

  if(this.state.sol !== null){
  return (
    <div className="App">
{/*  */}
      <div className='bg-div'>
        {/* <img className='bg' src={require("../src/OSIRIS_Mars_true_color.jpg")} /> */}
        <img className='bg'/>
      </div>


      <div className="title-div">
        <h1 className="title">Mars</h1>
        <h2 className="subtitle">SOL {this.state.currSol}</h2>
      </div>

      <div className="data">
        <div className='data-list'>
          <h3 className='data-title last-utc' sol={this.sol}> Time of Recorded Data <p className="data-item">{this.utcConv(this.state.utc)}</p></h3>
          <h3 className='data-title season' sol={this.sol}> Season <p className="data-item">{this.seasonConv(this.state.season)}</p></h3>
          <h3 className='data-title at' sol={this.sol}> Temperature <p className="data-item">{this.tempConv(this.state.temp)}</p></h3>
          <h3 className='data-title hws' sol={this.sol}> Wind Speed  <p className="data-item">{this.winConv(this.state.wind)}</p></h3>
          <h3 className='data-title pre' sol={this.sol}> Atmospheric Pressure <p className="data-item">{this.pressConv(this.state.pressure)}</p></h3>
        </div>
      </div>

      <footer>
        <item>Data By <a href="https://mars.nasa.gov/insight/weather/">NASA</a></item>
        <item>Image By <a href="http://www.esa.int/ESA_Multimedia/Images/2007/02/True-colour_image_of_Mars_seen_by_OSIRIS">ESA</a></item>
        <item>Webpage By <a href="http://www.opticalfalicy.com/">opticalfalicy</a></item>
      </footer>
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


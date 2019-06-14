import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Circle, Marker, InfoWindow } from "react-google-maps";
import Geocode from "react-geocode";
import './Geofy.css';

//import { Map,  Popup, TileLayer } from 'react-leaflet'
Geocode.setApiKey("AIzaSyBVQ69HV10ISsi9NKqW9P4OT3wKhigYDrc");
 
// Enable or disable logs. Its optional.
Geocode.enableDebug();

/*fetchLatLng = (lat,lng) =>{
  Geocode.fromLatLng(lat, lng).then(
  response => {
    let address = response.results[0].formatted_address;
    this.setState({address:address});
    console.log(this.state.address);
    return "done"
  }
);
    }*/
var result = "gf";
function displayStarRating(lat,lng) {
  
   Geocode.fromLatLng(lat, lng).then(
  response => {

    result = response.results[0].formatted_address;
   
    console.log("1",result);
    }
);
console.log(result);
return result;
}

const Mapl = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultZoom={10}
            center={{ lat: props.latc, lng: props.lngc }}
            onClick={e => props.onMapClick(e)}
        >
            {props.marks.map((mark, index) => (
                <Circle
                    key={index}
                    center={mark}
                    radius={1000}
                    options={{
                        strokeColor: "#66009a",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: `#66009a`,
                        fillOpacity: 0.35,
                        zIndex: 1
                    }}
                />
         

            ))}
	{props.latlng.map((ll,index) => (
	<Marker 
	key={index}
	
	draggable={false}
	
	position={ll}
	onClick={() => props.onmarkerClick(ll)}
	/>
	))}
	{props.latlng.map((ll,index) => (<InfoWindow key={index}
	position={ll} 
	>
	<div >
	<span style={{ padding: 0, margin: 0 }}>{ ll.con }</span>
	</div>
	</InfoWindow>))}
        </GoogleMap>
    ))
);

class Geofy extends Component {
    state = {
        marks: [],
	latlng: [{lat: -33.34, lng: 145.56, con:"flood"}, {lat: -36.34, lng: 144.56, con:"earthquake"},{lat: -34.397, lng: 150.644, con:"flood"}],
	latc: 150.42,
	lngc: 152.41,
	latcu:'',
	lngcu:'',	
	input:"",
        cont:"",
	address:"",
	
    };

    setMark = e => {
	console.log(this.state.marks,e.latLng.lng(),e.latLng.lat());
        this.setState({ marks: [...this.state.marks, e.latLng] });
       var x= window.prompt(); 
       console.log(x);
       this.setState((prevState) =>{return{ latlng: prevState.latlng.concat({lat:e.latLng.lat(),lng:e.latLng.lng(),con:x})}})

    };
    handleClick = () =>{
	
	Geocode.fromAddress(`${this.state.input}`).then(
  		response => {
    		    this.setState((prevState) =>{return{ latlng: prevState.latlng.concat({lat:response.results[0].geometry.location.lat,lng:response.results[0].geometry.location.lng,con:prevState.cont})}})
    		    console.log("geocdoe",this.state.latlng);
  },
  error => {
    console.error(error);
  }
);    
	};
    markerClick=(l)=>
		(alert(l))
	
    handleChangeAdd= (e)=>{
		this.setState({input:e.target.value});	
	}
    handleChangeCon=(e)=>{
		this.setState({cont:e.target.value});    
	}
    handleLocation=(lat,lng)=>{
			console.log(lat,lng)
			this.setState({latc:parseFloat(lat),lngc:parseFloat(lng)})
			console.log(this.state.latc,this.state.lngc)
}
	fetchData=()=>{
		fetch('http://localhost:5000/find')
	.then(res => res.json())
	.then(data => {
		console.log(data[1].input);
		data.map((d,i)=>{
			Geocode.fromAddress(`${d.input}`).then(
  		response => {
    		    this.setState((prevState) =>{return{ latlng: prevState.latlng.concat({lat:response.results[0].geometry.location.lat,lng:response.results[0].geometry.location.lng,con:d.cont})}})
    		    console.log("geocdoe",this.state.latlng);
  },
  error => {
    console.error(error);
  }
);    		
		})
		
	});	
	}

    showCurrentLocation=()=>{
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			this.setState({latcu:position.coords.latitude,lngcu:position.coords.longitude})
			console.log(this.state.latcu,this.state.lngcu);
	})
	}
    }
    componentWillMount(){
		//console.log("will mount")
		this.showCurrentLocation();
			
	}
    componentDidMount(){
		
		
		this.fetchData();
		//console.log("did");	
	}

    render() {
        const { marks,latlng,latc,lngc } = this.state;
        return (
            <div className="body">
		<form method="post" action='http://localhost:5000/save' className="form">
		<input type="text" onChange={this.handleChangeAdd} value={this.state.input} name='input' placeholder="enter address..." className="location"/>
		<input type="text" onChange={this.handleChangeCon} value={this.state.cont} name='cont'  placeholder="enter problem..." className="disaster"/>
		
                <input type="submit" className="submit" placeholder="submit"/>
		</form>
		<button  onClick={this.handleClick}>click me</button>
		<div className="map">                
		<Mapl
                    googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyAef5QTmsK376KK-53594VgCfHKn6nE71k"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onMapClick={this.setMark}
                    marks={marks}
		    latlng={latlng}
		    onmarkerClick={this.markerClick}
		    latc={latc}
		    lngc={lngc}
		    
                />
		</div>
		<div>
		<ul className="list">
		<li className="heading"  onClick={()=>this.handleLocation(this.state.latcu,this.state.lngcu)}>CURRENT LOCATION</li><br/>
		<li className="heading">UPDATES</li><br/>
		
		{latlng.map((lt,id)=>(
			<li key={id} onClick={()=>this.handleLocation(lt.lat,lt.lng)}  className="listPart"> <p className="li" > Address: {displayStarRating(lt.lat,lt.lng)} </p><p className="li"> Problem: {lt.con} </p></li>)
		)}
		</ul>
		</div>
            </div>
        );
    }
}

export default Geofy;

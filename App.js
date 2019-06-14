import React, { Component } from 'react';
import Geofy from "./components/Geofy";
import Weather from "./components/Weather"
import Header from "./components/Header"
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class App extends Component {
render() {
return (
/*<div className="App">
<SimpleMap
google={this.props.google}
center={{lat: 18.5204, lng: 73.8567}}
height='300px'
zoom={15}
/>*/
<div>
<BrowserRouter>
    	<div>
    		<Header/>
    			<Switch>
    				<Route path="/" component={Geofy} exact/>
    				<Route path="/weather" component={Weather} exact/>
    			</Switch>
    	</div>
	
    	</BrowserRouter>
</div>
);
}
}

export default App;

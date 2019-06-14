import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import MenuItem from 'react-bootstrap/lib/MenuItem'
import NavDropdown from 'react-bootstrap/lib/Navbar'
class Header extends Component{
	render(){
		return(
		<div>
		<Navbar style={{ height: '30px' }}>
			<Nav>
			<NavItem>
			<Link to="/">USER</Link>
			</NavItem>
			<NavItem>
			<Link to="/weather">WEATHER</Link>
			</NavItem>
			</Nav>
		</Navbar>
		</div>	
	)	
	}
}

export default Header;

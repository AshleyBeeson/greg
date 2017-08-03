import React, { Component } from 'react';
import Routes from './Routes';

import Header from './components/Header';


export default class App extends Component {
	render() {
		return(
			<div className="mdl-layout mdl-js-layout">
				<Header />
				<Routes />
			</div>
		);
	}
}
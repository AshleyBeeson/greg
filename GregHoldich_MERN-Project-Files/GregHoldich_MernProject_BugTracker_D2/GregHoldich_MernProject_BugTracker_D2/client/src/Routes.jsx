import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import BugTable from './pages/index/BugTable';


export default class Routes extends Component {

	render(props) {
		return (
		<div id="content">
			<Switch>
			  <Route path="/" component={() => <BugTable url='http://localhost:8081/api/bugs' pollInterval={2000} />}/>
			</Switch>
		</div>
		);
	}
}
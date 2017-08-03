import React, { Component } from 'react';
import style from '../pages/style';

export default class Header extends Component {
	render() {
		return(
			<div className="mdl-layout--fixed-header">
			  <header className="mdl-layout__header mdl-layout--fixed-header">
				<div className="mdl-layout__header-row" style={ style.header_width }>
				  <span className="mdl-layout-title"><h6>Bug Tracker</h6></span>
				  <div className="mdl-layout-spacer"></div>
				  <nav className="mdl-navigation">
					<a className="mdl-navigation__link">
						<span style={ style.button_text}>Submit Bug</span>
						<button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
							<i className="material-icons">add</i>
						</button>
					</a>
				  </nav>
				</div>
			  </header>
			</div>
		);
	}
}
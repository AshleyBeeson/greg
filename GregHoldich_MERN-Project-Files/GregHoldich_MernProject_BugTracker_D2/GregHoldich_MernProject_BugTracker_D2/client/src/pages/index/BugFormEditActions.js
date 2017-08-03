import React, { Component } from 'react';

class BugFormEditActions extends Component {
   
   handleChange(e) {
	   this.props.handleActionChange(this.props.index, [e.target.name], e.target.value);
   }
   
  render() {
		const { user, action } = this.props;
    return (
		<div className="action_childBlock">
			<div className="mdl-textfield mdl-js-textfield">
				<span className="input_binder">
					<div className="inputTitle_text">User:</div>
					<input className="mdl-textfield__input" value={user} name="user" id="user" onChange={this.handleChange.bind(this)} />
				</span>
			</div>
			<div className="mdl-textfield mdl-js-textfield">
				<span className="input_binder">
					<div className="inputTitle_text">Action:</div>
					<input className="mdl-textfield__input" value={action} name="action" id="action" onChange={this.handleChange.bind(this)} />
				</span>
			</div>
		</div>
    );
  }
}
export default BugFormEditActions;

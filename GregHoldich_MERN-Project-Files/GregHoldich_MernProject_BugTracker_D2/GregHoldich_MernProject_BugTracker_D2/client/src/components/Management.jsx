import React, { Component } from 'react';
import update from 'immutability-helper';

import BugFormEditActions from '../pages/index/BugFormEditActions';

class Management extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: props.data.status,
			highPriority: props.data.highPriority,
			severity: props.data.severity,
			assignedUser: props.data.assignedUser,
			summary: props.data.summary,
			description: props.data.description,
			actions: props.data.actions
		}
	}
	
	handleChange(e) {
		  this.setState({
					[e.target.name]: e.target.value
		  });
	}
	
	handleSelectChange(e) {
		this.setState({ [e.target.name]: e.target.options[e.target.selectedIndex].text });
	}
	
	handleActionChange(index, name, value) {
		var actions = this.state.actions,
			updatedAction = update(actions[index], {[name]: {$set: value}}),
			newAction = update(actions, {
						$splice:[[index, 1, updatedAction]]
						});
		this.setState({ actions: newAction});
	}
	
	displayOptions(options, selector) {
		return options.map((option, index) => {
				return (
					<option value={index} key={index} selected={option === selector}>{option}</option>
				); 			
		});
		
	}
	
	displayActions() {
		return this.state.actions.map((action, index) => {
			return(
				<BugFormEditActions {...action} key={index} index={index} handleActionChange={this.handleActionChange.bind(this)} />
			);
		});
	}
	
	handleSubmit(e) {
		e.preventDefault();
		const status = this.state.status.trim(),
			  highPriority = this.state.highPriority.trim(),
			  severity = this.state.severity.trim(),
			  assignedUser = this.state.assignedUser.trim(),
			  summary = this.state.summary.trim(),
			  description = this.state.description.trim(),
			  actions = this.state.actions;
		if (!status || !highPriority || !severity || !assignedUser || !summary || !description) {
			return;
		}
		const data = {
			status: status,
			highPriority: highPriority,
			severity: severity,
			assignedUser: assignedUser,
			summary: summary,
			description: description,
			actions: actions
		},
		formData = Object.keys(data)
						 .map(key=>encodeURIComponent(key)+'='+encodeURIComponent(data[key]))
						 .join('&');
		this.props.handleBugUpdate(this.props.data.id, formData, true);
		this.props.close()
	}
	
  render() {
		const {status, highPriority, severity, assignedUser, summary, description, actions  } = this.state;
		const statusOptions = ['TO DO', 'IN PROGRESS', 'IN REVIEW', 'IN TEST', 'IN DEMO', 'DONE'];
		const highPriorityOptions = ['TRUE', 'FALSE'];
		const severityOptions = ['HIGH', 'MEDIUM', 'LOW'];
    return (
		<div className="management_block">
			<div className="inner_content">
				<div className="management-card-square mdl-card mdl-shadow--2dp">
				  <div className="mdl-card__title mdl-card--expand">
					<h2 className="mdl-card__title-text">Edit bug({this.props.data.issueId})</h2>
					<button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored" onClick={() => this.props.close()}>
					  <i className="material-icons">clear</i>
					</button>
				  </div>
				  <div className="mdl-card__supporting-text">
					<form onSubmit={this.handleSubmit.bind(this)}>
					
					  <div className="mdl-selectfield mdl-textfield">
						<span className="input_binder">
							<div className="inputTitle_text">Status:</div>			
							<select className="mdl-textfield__input" name="status" id="status" onChange={this.handleSelectChange.bind(this)}>
							  <option disabled>Choose your option</option>
							  {this.displayOptions(statusOptions, status)}
							</select>
						</span>
					  </div>
					  <div className="mdl-selectfield mdl-textfield">
						<span className="input_binder">
							<div className="inputTitle_text">High Priority:</div>			
							<select className="mdl-textfield__input" name="highPriority" id="highPriority" onChange={this.handleSelectChange.bind(this)}>
							  <option value="" disabled>Choose your option</option>
							  {this.displayOptions(highPriorityOptions, highPriority)}
							</select>
						</span>
					  </div>
					  <div className="mdl-selectfield mdl-textfield">
						<span className="input_binder">
							<div className="inputTitle_text">Severity:</div>			
							<select className="mdl-textfield__input" name="severity" id="severity" onChange={this.handleSelectChange.bind(this)}>
							  <option value="" disabled>Choose your option</option>
							  {this.displayOptions(severityOptions, severity)}
							</select>
						</span>
					  </div>
					  <div className="mdl-textfield mdl-js-textfield">
						<span className="input_binder">
						<div className="inputTitle_text">AssignedUser:</div>
						<input className="mdl-textfield__input" value={assignedUser} name="assignedUser" id="assignedUser" onChange={this.handleChange.bind(this)} />
						</span>
					  </div>
					  <div className="mdl-textfield mdl-js-textfield">
						<span className="input_binder">
						<div className="inputTitle_text">Summary:</div>
						<textarea className="mdl-textfield__input" value={summary} name="summary" id="summary" onChange={this.handleChange.bind(this)} />
						</span>
					  </div>
					  <div className="mdl-textfield mdl-js-textfield">
						<span className="input_binder">
						<div className="inputTitle_text">Description:</div>
						<textarea className="mdl-textfield__input" value={description} name="description" id="description" onChange={this.handleChange.bind(this)} />
						</span>
					  </div>
					  <div className="mdl-textfield mdl-js-textfield">
					  { actions.length > 0 ? 
												<div className="inputTitle_text">Action:</div>
												:
												 ''
					  }
					  {this.displayActions()}
					</div>
					</form>
				  </div>
					<div className="mdl-card__actions mdl-card--border">
						<button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.handleSubmit.bind(this)}>
							Edit Bug
						</button>
					</div>
				</div>
			</div>
		</div>
    );
  }
}
export default Management;

import React, { Component } from 'react';
import style from '../style';


class Bug extends Component {
	
   getActions() {
		return this.props.actions.map(action => {
					return(
					<div style={ style.bug_action }>
						<div>user: {action.user}</div>
						<div>action: {action.action}</div>
						<div>date: {action.dateCreated}</div>
					</div>
					);
			});
   }
   
   handleEdit(e) {
	   this.props.editBug(this.props);
   }
   
  render() {
    return (
      <tr style={ style.bug }>
        <td className="mdl-data-table__cell--non-numeri">id: {this.props.id}</td>
        <td className="mdl-data-table__cell--non-numeri">{this.props.issueId}</td>
		<td className="mdl-data-table__cell--non-numeri">{this.props.summary}</td>
		<td className="mdl-data-table__cell--non-numeri">{this.props.highPriority}</td>
		<td className="mdl-data-table__cell--non-numeri">{this.props.severity}</td>
		<td className="mdl-data-table__cell--non-numeri">{this.props.reporter}</td>
		<td className="mdl-data-table__cell--non-numeri">{this.props.assignedUser}</td>
		<td className="mdl-data-table__cell--non-numeri">{this.props.status}</td>
		<td className="mdl-data-table__cell--non-numeri">{this.props.dateCreated}</td>
		<td className="mdl-data-table__cell--non-numeri">
		<i className="material-icons clickable" style={ style.icon_dark_blue }>launch</i>
		<i style={ style.icon_orange } className="material-icons clickable" onClick={this.handleEdit.bind(this)}>mode_edit</i>
		<i className="material-icons clickable">delete</i>
		</td>
      </tr>
    );
  }
}
//		<td className="mdl-data-table__cell--non-numeri">{this.props.description}</td>
//		<td className="mdl-data-table__cell--non-numeri"><span>{this.getActions()}</span></td>
export default Bug;

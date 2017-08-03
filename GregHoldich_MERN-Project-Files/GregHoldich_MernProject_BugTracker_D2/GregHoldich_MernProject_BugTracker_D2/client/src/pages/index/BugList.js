import React, { Component } from 'react';
import Bug from './Bug';
import style from '../style';

class BugList extends Component {
	
	toggleSortCol(e, name) {
		if(!e.target.className.includes("actice-sort")) {
		var ths = document.querySelectorAll("table.mdl-data-table tr th.sortable");
			[].forEach.call(ths, (th) => {
				th.classList.remove("actice-sort");
				th.querySelector("i").classList.remove("actice-sort");
			});
			e.target.classList.add("actice-sort");
			this.props.handleSort(name, false);
		} else {
			e.target.classList.remove("actice-sort");
		}
	}	
	
  render() {
    let bugs = this.props.data.map(bug => {
      return (
        <Bug
          key={ bug['_id'] }
		  editBug={this.props.editBug.bind(this)}
		  {...bug}
		/>
      );
    });
    return (
      <table style={ style.table_center } className="mdl-data-table mdl-shadow--2dp">
		<thead>
		  <tr>
			 <th className="mdl-data-table__cell--non-numeric sortable" onClick={(evt) => this.toggleSortCol(evt, 'id')}>ID<i className="material-icons small-icon">swap_vert</i></th>
			 <th className="mdl-data-table__cell--non-numeric sortable" onClick={(evt) => this.toggleSortCol(evt, 'issueId')}>Issue ID<i className="material-icons small-icon">swap_vert</i></th>
			 <th className="mdl-data-table__cell--non-numeric sortable" onClick={(evt) => this.toggleSortCol(evt, 'summary')}>Summary<i className="material-icons small-icon">swap_vert</i></th>
			 <th className="mdl-data-table__cell--non-numeric sortable" onClick={(evt) => this.toggleSortCol(evt, 'highPriority')}>High Priority<i className="material-icons small-icon">swap_vert</i></th>
			 <th className="mdl-data-table__cell--non-numeric sortable" onClick={(evt) => this.toggleSortCol(evt, 'severity')}>Severity<i className="material-icons small-icon">swap_vert</i></th>
			 <th className="mdl-data-table__cell--non-numeric sortable" onClick={(evt) => this.toggleSortCol(evt, 'reporter')}>Reporter<i className="material-icons small-icon">swap_vert</i></th>
			 <th className="mdl-data-table__cell--non-numeric sortable" onClick={(evt) => this.toggleSortCol(evt, 'assignedUser')}>AssignedUser<i className="material-icons small-icon">swap_vert</i></th>
			 <th className="mdl-data-table__cell--non-numeric sortable" onClick={(evt) => this.toggleSortCol(evt, 'dateCreated')}>Status<i className="material-icons small-icon">swap_vert</i></th>
			 <th className="mdl-data-table__cell--non-numeric sortable" onClick={(evt) => this.toggleSortCol(evt, 'id')}>Date Created<i className="material-icons small-icon">swap_vert</i></th>
			 <th className="mdl-data-table__cell--non-numeric">Manage</th>
		  </tr>
		 </thead>
		 <tbody>
        { bugs }
		</tbody>
      </table>
    );
  }
}

export default BugList;

import React, { Component } from 'react';
import axios from 'axios';
import BugList from './BugList';
import BugFilterBar from './BugFilterBar';
import Management from '../../components/Management';
import style from '../style';

class BugTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
			data: [],
			requireUpdate: false,
			toEdit: [],
			displayEditDialog: false
	};
    this.loadBugsFromAPI = this.loadBugsFromAPI.bind(this);
	this.handleBugUpdate = this.handleBugUpdate.bind(this);
	this.monitorForUpdates = this.monitorForUpdates.bind(this);
  }
  
    loadBugsFromAPI(cb) {
    return axios.get(`${this.props.url}/fetch`)
      .then(res => {
        this.setState({
					data: res.data.bugs,
					requireUpdate: false
				});
	}).then(cb);
  }
  
   handleBugUpdate(id, updatedBug, willUpdate) {
    axios.put(`${this.props.url}/update/${id}`, updatedBug)
      .catch(err => {
        console.log(err);
      }).then(res => {
        this.setState({
					requireUpdate: willUpdate
			});
	  });
  }
  
  handleSearch(q) {
	const exclude = ['__v', '_id']
	  let data = this.state.data.filter(documentRow => {
		  	for (var key in documentRow) {
			  if (documentRow.hasOwnProperty(key) && exclude.indexOf(key) === -1) {
				if(documentRow[key].toString().toLowerCase().includes(q)) {
					return true;
				}				
			  }
			}
			return false;
	  });
	  this.setState({
			data: data
	  });
  }
  
  handleSort(field, reverse, primer, then) {
	  let data = this.state.data;
	  this.setState({
		  data: data.sort(this.sortBugsBy(field, reverse, primer, then))
	  });
  }
  
  sortBugsBy(field, reverse, primer, then) {
    var get = ((obj, field) => {
            if (field) {
                field = field.split('.');
                for (var i = 0, len = field.length - 1; i < len; i++) {
                    obj = obj[field[i]];
                };
                return obj[field[len]];
            }
            return obj;
        }),
        prime = ((obj) => {
            return primer ? primer(get(obj, field)) : get(obj, field);
        });
    
    return ((a, b) => {
        var A = prime(a),
            B = prime(b);
        
        return (
            (A < B) ? -1 :
            (A > B) ?  1 :
            (typeof then === 'function') ? then(a, b) : 0
        ) * [1,-1][+!!reverse];
    });
  }
  
  reFetchThenSearch(q) {
		this.loadBugsFromAPI(cb => {
			this.handleSearch(q);
		});
  }

  monitorForUpdates() {
	  if(this.state.requireUpdate) {
			this.loadBugsFromAPI();
	  }
  }
  
  editBug(bug) {
	  this.setState({ 
				toEdit: bug,
				displayEditDialog: true
			});
  }
  
  stopEditingBug() {
	  this.setState({ 
				toEdit: [],
				displayEditDialog: false
			});
  }
  
  displayEditDialog() {
	  return(
		<Management data={this.state.toEdit} close={this.stopEditingBug.bind(this)} handleBugUpdate={this.handleBugUpdate.bind(this)} />
	  ); 
  }
  
  componentDidMount() {
    this.loadBugsFromAPI();
	setInterval(this.monitorForUpdates, this.props.pollInterval);
  }
  
  render() {
    return (
		<div style={ style.bug_container }>
			<BugFilterBar handleSearch={this.handleSearch.bind(this)} reFetchThenSearch={this.reFetchThenSearch.bind(this)} />
			{this.state.data.length > 0 ? 
							<BugList data={ this.state.data } editBug={this.editBug.bind(this)} handleSort={this.handleSort.bind(this)} /> 
									:
							<div className="noResults_block">
								<span className="noResults">No results found...</span>
							</div>
			}
			{this.state.displayEditDialog ? this.displayEditDialog() : ''}
		</div>
    );
  }
}

export default BugTable;

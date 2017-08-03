import React, { Component } from 'react';


class BugFilterBar extends Component {
	constructor() {
		super();
		this.state = {
			cachedSearch: ''
		}
	}
		
	handleInput(e) {
		if(e.target.value.startsWith(this.state.cachedSearch)) {
			this.setState({
				cachedSearch: e.target.value	
			});
			this.props.handleSearch(e.target.value);
		} else {
				this.setState({
					cachedSearch: e.target.value
				});
				this.props.reFetchThenSearch(e.target.value);	
		}
	}
		
	handleSearchQuery(e) {
		this.props.handleSearch()
	}
	
		
  render() {
    return (
<div className="filter-card-wide mdl-card mdl-shadow--2dp">
  <div className="mdl-card__title">
    <h2 className="mdl-card__title-text">Welcome</h2>
  </div>

  <div className="mdl-card__actions mdl-card--border">
	<div className="mdl-card__supporting-text">
		<div id="filter_block">Filter: <i className="material-icons filter-icon">tune</i></div>
		<div id="search_block">
      <div className="mdh-expandable-search mdl-cell--hide-phone">
        <i className="material-icons">search</i>
        <form action="#">
          <input type="text" placeholder="Search" size="20" value={this.state.cachedSearch} onChange={this.handleInput.bind(this)} />
        </form>
      </div>
		</div>
	</div>
  </div>
</div>
    );
  }
}
export default BugFilterBar;

import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Results from './Results';
import CheckType from './CheckType';
import Api from '../api/entriesApi';

const STATES = require('../data/states');

class StatesField extends React.Component{

	state = {
		entriesType: 'users',
		fetching: false,
		loadingInit: true,
		searchable: this.props.searchable,
		selectValue: null,
		clearable: true,
		entries:[],
		users:[],
		sites:[]
	  };

	componentDidMount = () => {
		Api.init()
		.then((initData) => {
			initData = initData.data;
			this.setState({
				loadingInit: false,
				users: initData.users,
				sites: initData.sites
			})
		})
	};

	getDefaultProps = () => {
		return {
			label: ' ',
			searchable: true,
		};
	};

	switchEntryType = (e) => {
		var newType = e.target.value;
		this.setState({
			entriesType: newType,
			selectValue: null,
			entries: []
		});
	};
	updateValue = (newValue) => {

		if (!newValue){
			this.setState({
				selectValue: null
			});
			return;
		}

		console.log('State changed to ' + JSON.stringify(newValue));

		var userName = newValue.value;
		
		this.setState({
			selectValue: newValue,
			fetching:true
		});

		Api.getEntries(userName)
		.then((result) => {
			result = result.data;
			this.setState({
				entries: result,
				fetching:false
			});
		})
	};
	focusStateSelect = () => {
		this.refs.stateSelect.focus();
	};
	itemClicked = (e) => {
		console.log(e.value)
	};

	// helper function to convert the data we got from server, to the data for the component 'Select'
	convertApiData(apiData) {
		return apiData.map((entry) => {
			return {value: entry, label: entry};
		});
	};

	render () {
		var options = STATES[this.state.entriesType];

		var usersData = this.convertApiData(this.state.users);
		var userssitesDataData = this.convertApiData(this.state.sites);
		
		console.log(usersData);

		return (

			<div className="section">
				{this.state.loadingInit ? 
					<h3>Loading, please wait...</h3>
					:
					<div>
						<h3 className="section-heading">{this.props.label}</h3>
						<CheckType checked={this.state.entriesType} switchEntryType={this.switchEntryType} fetching={this.state.fetching}/>
						<Select onValueClick={this.itemClicked} ref="stateSelect" autoFocus options={usersData} clearable={this.state.clearable} name="selected-state" disabled={this.state.fetching} value={this.state.selectValue} onChange={this.updateValue} searchable={this.state.searchable} />
						<Results fetching={this.state.fetching} entries={this.state.entries}/>
					</div>
				}
			</div>
		);
	}
};


module.exports = StatesField;

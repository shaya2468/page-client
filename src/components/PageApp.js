import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Results from './Results';
import CheckType from './CheckType';
import Api from '../api/entriesApi';

class PageApp extends React.Component {

	state = {
		entriesType: 'users',
		fetching: false,
		loadingInit: true,
		searchable: true,
		selectValue: null,
		clearable: true,
		entries: [],
		users: [],
		sites: []
	};

	// When the page loads for the first time bring
	// 1. the ip address of the user, which is identified as his user name
	// 2. list of users and sites from the server
	componentDidMount = () => {

		Promise.all([Api.init(), Api.getMyUserName()])
			.then((result) => {
				var initData = result[0].data;
				var userName = result[1].data.ip;
				this.setState({
					loadingInit: false,
					users: initData.users,
					sites: initData.sites
				})
				//check if current user exists on server(maybe he has no entries, first time user)
				if (initData.users.indexOf(userName) > -1) {
					this.updateValue(userName)
				}

			})
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

		if (!newValue) {
			this.setState({
				selectValue: null,
				entries: []
			});
			return;
		}

		var name = newValue.value;
		this.setState({
			selectValue: newValue,
			fetching: true
		});

		Api.getEntries(this.state.entriesType, name)
			.then((result) => {
				result = result.data;
				this.setState({
					entries: result,
					fetching: false
				});
			})
	};
	
	itemClicked = (e) => {
		// for now just log the value
		console.log(e.value)
	};

	// helper function to convert the data we got from server, to the data for the component 'Select'
	convertApiData(apiData) {
		return apiData.map((entry) => {
			return { value: entry, label: entry };
		});
	};

	render() {

		var entriesDisplay = this.convertApiData(this.state[this.state.entriesType]);

		return (

			<div className="section">
				{this.state.loadingInit ?
					<h3>Loading, please wait...</h3>
					:
					<div>
						<h3 className="section-heading"> </h3>
						<CheckType checked={this.state.entriesType} switchEntryType={this.switchEntryType} fetching={this.state.fetching} />
						<Select  onValueClick={this.itemClicked} 
								 autoFocus 
								 options={entriesDisplay}
								 clearable={this.state.clearable}
								 name="selected-state" 
								 disabled={this.state.fetching} 
								 value={this.state.selectValue} 
								 onChange={this.updateValue} 
								 searchable={this.state.searchable} />
						<Results entriesType={this.state.entriesType} fetching={this.state.fetching} entries={this.state.entries} />
					</div>
				}
			</div>
		);
	}
};


module.exports = PageApp;

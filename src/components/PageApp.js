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
		searchable: this.props.searchable,
		selectValue: null,
		clearable: true,
		entries:[]
	  };

	componentDidMount = () => {
		Api.init()
		.then((users) => {
			console.log(users.data);
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
		console.log('new type is ' + newType);
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

		var fakeApi = STATES[newValue.value]();

		this.setState({
			selectValue: newValue,
			fetching:true
		});

		fakeApi.then((result) => {
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
	render () {
		var options = STATES[this.state.entriesType];
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>

				<CheckType checked={this.state.entriesType} switchEntryType={this.switchEntryType} fetching={this.state.fetching}/>
				
				<Select onValueClick={this.itemClicked} ref="stateSelect" autoFocus options={options} clearable={this.state.clearable} name="selected-state" disabled={this.state.fetching} value={this.state.selectValue} onChange={this.updateValue} searchable={this.state.searchable} />
				<Results fetching={this.state.fetching} entries={this.state.entries}/>
				
			</div>
		);
	}
};


module.exports = StatesField;

import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Results from './Results';

const STATES = require('../data/states');

var StatesField = createClass({
	displayName: 'StatesField',
	propTypes: {
		label: PropTypes.string,
		searchable: PropTypes.bool,
	},
	getDefaultProps () {
		return {
			label: ' ',
			searchable: true,
		};
	},
	getInitialState () {
		return {
			country: 'Users',
			fetching: false,
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true,
			entries:[]
		};
	},
	switchCountry (e) {
		var newCountry = e.target.value;
		console.log('Country changed to ' + newCountry);
		this.setState({
			country: newCountry,
			selectValue: null,
		});
	},
	updateValue (newValue) {
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
	},
	focusStateSelect () {
		this.refs.stateSelect.focus();
	},
	itemClicked (e) {
		console.log(e.value)
	},
	render () {
		var options = STATES[this.state.country];
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select onValueClick={this.itemClicked} ref="stateSelect" autoFocus options={options} clearable={this.state.clearable} name="selected-state" disabled={this.state.fetching} value={this.state.selectValue} onChange={this.updateValue} searchable={this.state.searchable} />
				<Results fetching={this.state.fetching} entries={this.state.entries}/>
				
			</div>
		);
	}
});


module.exports = StatesField;

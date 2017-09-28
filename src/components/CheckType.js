import React from 'react';

const CheckType = (props) => (
    <div className="checkbox-list">
        <label className="checkbox">
            <input type="radio" className="checkbox-control" checked={props.checked === 'users'} value="users" onChange={props.switchEntryType} disabled={props.fetching} />
            <span className="checkbox-label"> Users</span>
        </label>
        <label className="checkbox">
            <input type="radio" className="checkbox-control" checked={props.checked === 'sites'} value="sites" onChange={props.switchEntryType} disabled={props.fetching} />
            <span className="checkbox-label"> Sites</span>
        </label>
    </div>
);

export default CheckType;


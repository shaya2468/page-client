import React from 'react';

const Entry = (props) => (
    <tr>
        <td><div> {props.time}</div></td>
        <td><div> {props.info}</div></td>
        <td><div> {props.referrer}</div></td>
    </tr>
);

export default Entry;

import React from 'react';

import Entry from './Entry';

const Results = (props) => (
  <div className="results-title">
    <table>
      <tbody className="tbody-res">
        <tr>
          <th>Time</th>
          <th>{props.entriesType === 'sites' ? "User" : 'Site'}</th>
          <th>Referrer</th>
        </tr>

        {
          !props.fetching &&

            props.entries.map((entry, index) => (
              <Entry
                key = {index}
                time={entry.time}
                info={entry[props.entriesType === 'sites' ? "user_name" : 'site_name']}
                referrer={entry.referrer}
              />
            ))
        }
        </tbody>
    </table>
    {
      props.fetching &&

        <p className="fetching-data">Fetching data please wait...</p>
    }
  </div>
);


export default Results;

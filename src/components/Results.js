import React from 'react';

import Entry from './Entry';

const Results = (props) => (
  <div className="results-title">
    <table>
      <tr>
        <th>Time</th>
        <th>Site</th>
        <th>Referrer</th>
      </tr>

      {
        !props.fetching &&

          props.entries.map((entry, index) => (
            <Entry
              key = {index}
              time={entry.time}
              info={entry.site_name}
              referrer={entry.referrer}
            />
          ))
      }
    </table>
    {
      props.fetching &&

        <p className="fetching-data">Fetching data please wait...</p>
    }
  </div>
);


export default Results;

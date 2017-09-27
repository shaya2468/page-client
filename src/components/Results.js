import React from 'react';

import Entry from './Entry';

const Results = (props) => (
  <div className="results-title">
    <p>Your results are:</p>
    <table>

      <tr>
        <th>Company</th>
        <th>Contact</th>
        <th>Country</th>
      </tr>
      <Entry
        optionText={'bbbbb'}
        count={3 + 1}
      />
      <Entry
        optionText={'bbbbb'}
        count={3 + 1}
      />
      <Entry
      optionText={'bbbbb'}
      count={3 + 1}
    />
    </table>
  </div>
);


export default Results;

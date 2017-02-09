import React from 'react';
import * as Redux from 'react-redux';

export class About extends React.Component {
  onLogout(e) {
    var {dispatch} = this.props;

    e.preventDefault();

    dispatch(actions.startLogout());
  }
  render() {
    return (
      <div>
        <div className="about">
          <h4 className="page-title">GiftVote - The Collaborative Shopping Platform</h4>
          <ul>
            <li>Enables groups of users to discover products they most prefer through live voting.</li>
            <li>Incorporates Amazon-Product-API into Node.js to display product information.</li>
            <li>Enables real-time updates to all users simultaneously utilizing Firebase database and event listeners.</li>
            <li>Calculates and displays user's individual vote percentage and sum of all users’ percentages with JavaScript algorithm.</li>
          </ul>
        </div>
      </div>
    )
  }
};

export default Redux.connect()(About);

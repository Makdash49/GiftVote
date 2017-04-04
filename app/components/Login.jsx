import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export class Login extends React.Component {

  constructor (props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    var {dispatch} = this.props;
    this.refs.btn.setAttribute("disabled", "disabled");
    dispatch(actions.startLogin());
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h1>GiftVote</h1>
              <button className="button" ref="btn" onClick={this.onLogin}>Click to Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Redux.connect()(Login);

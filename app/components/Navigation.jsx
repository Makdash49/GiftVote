var React = require('react');
var {Link, IndexLink} = require('react-router');
import firebase from 'app/firebase/';


var Navigation = () => {
  var vote = "";
  var about = "";

  if (firebase.auth().currentUser) {
    vote = "Vote";
    about = "About";
  }

  return (
    <div className ="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">
            GiftVote
          </li>
          <li>
            <IndexLink to="/" activeClassName="active-link">{vote}</IndexLink>
          </li>
          <li>
            <Link to="about" activeClassName="active-link">{about}</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          <li className="menu-text">
            Created by <a href="http://www.linkedin.com/in/markmcquillen" target="_blank">Mark McQuillen</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

module.exports = Navigation;

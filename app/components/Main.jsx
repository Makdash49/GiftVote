var React = require('react');
var Navigation = require('Navigation');

var Main = (props) => {
  return (
    <div>
      <Navigation/>
      <div className="row">
          {props.children}
      </div>
    </div>
  );
};

module.exports = Main;

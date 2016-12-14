import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class Product extends React.Component {

  handleClick (e) {
    e.preventDefault();
    var {dispatch, id, counter} = this.props;
    dispatch(actions.startIncrementProduct(id, counter));
    }



  render() {
    var {text, image, counter} = this.props;
    console.log('Counter:', counter);

    var myComponent = () => {
      return (
        <div>
          <div className="productImage">
            <img src={image} alt={text}/>
            <p>{text}</p>
            <button className="plusBox" onClick={this.handleClick.bind(this)}>+</button>
            <p>{counter}</p>
          </div>
        </div>
      );
    };


    return (
      <div>
        {myComponent()}
      </div>
    )
  }
};

export default connect()(Product);

// export default connect(
//   (state) => {
//     return state;
//   }
// )(Product);
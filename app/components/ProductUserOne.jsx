import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class ProductUserOne extends React.Component {

  handlePlus (e) {
    e.preventDefault();
    var {dispatch, id, counterUserOne, userOneTotal} = this.props;
    dispatch(actions.startIncrementProductUserOne(id, counterUserOne));
    }

  handleMinus (e) {
    e.preventDefault();
    var {dispatch, id, counterUserOne} = this.props;
    dispatch(actions.startDeincrementProductUserOne(id, counterUserOne));
    }

  render() {
    var {text, image, link, counterUserOne, userOneTotal, userNumber} = this.props;
    var votesWord = "Votes";

    if (counterUserOne === 1) {
      votesWord = "Vote"
    }

    var percentage = Math.round(counterUserOne / userOneTotal * 100);
    isNaN(percentage) ? percentage = 0 : percentage = percentage;

    var myComponent = () => {
      if (userNumber === "ONE") {
        return (
          <div>
            <div className="productImage">
              <div className="increments">
                <h4>{counterUserOne}</h4>
                <h6>{votesWord}</h6>
                <button className="plusBox" onClick={this.handlePlus.bind(this)}>+</button>
                <button className="minusBox" onClick={this.handleMinus.bind(this)}>-</button>
              </div>
              <div className="photo">
                <a href={link} target="_blank">
                  <img className="thePhoto" src={image} alt={text}/>
                </a>
              </div>
              <div className="percentage">
                <h4>{percentage}%</h4>
              </div>
              <div>
                <p className="product-description">{text}</p>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <div className="otherUserProductImage">
              <div className="increments">
                <h4>{counterUserOne}</h4>
                <h6>{votesWord}</h6>
              </div>
              <div className="photo">
                <a href={link} target="_blank">
                  <img className="thePhoto" src={image} alt={text}/>
                </a>
              </div>
              <div className="percentage">
                <h4>{percentage}%</h4>
              </div>
              <div>
                <p className="product-description">{text}</p>
              </div>
            </div>
          </div>
        )
      }
    };

    return (
      <div>
        {myComponent()}
      </div>
    )
  }
};

export default connect()(ProductUserOne);

import React from 'react';
import {connect} from 'react-redux';
import ProductUserOne from 'ProductUserOne';
import ProductUserTwo from 'ProductUserTwo';
import ProductFinalTotal from 'ProductFinalTotal';
import ProductAPI from 'ProductAPI'
import UserAPI from 'UserAPI';
import ReactMotionFlip from "react-motion-flip"



import * as actions from 'actions';
var socket = io();



export class Amazon extends React.Component {

  onLogout(e) {
    var {dispatch} = this.props;

    e.preventDefault();

    dispatch(actions.startLogout());
  }

  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props

    var todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';

      dispatch(actions.startAddProduct(todoText));
    } else {
      this.refs.todoText.focus();
    }
  }



  render() {
    var userIDs = UserAPI.filterUsers(this.props.userIDs);
    var currentUser = this.props.auth.uid;
    var currentUserIndex;

    for (var i = 0; i < userIDs.length; i++) {
      if (currentUser === userIDs[i].uid) {
        currentUserIndex = i;
      }
    }

    var lastUser = userIDs[userIDs.length - 1]
    var userNumber;

    if (currentUserIndex % 2 === 0) {
      userNumber = "ONE"
    } else {
      userNumber = "TWO"
    };

    var {products} = this.props;

    var userOneTotal = 0;
    var userTwoTotal = 0;
    products.forEach((product) => {
      userOneTotal = userOneTotal + product.counterUserOne;
      userTwoTotal = userTwoTotal + product.counterUserTwo;
    });

    var renderProductsUserOne = () => {
      var filteredProducts = ProductAPI.userOneFilterProducts(products);
      return filteredProducts.map((product) => {
        return (
          <ProductUserOne key={product.id} {...product} userOneTotal={userOneTotal} userNumber={userNumber}/>
        );
      });
    }

    var renderProductsUserTwo = () => {
      var filteredProducts = ProductAPI.userTwofilterProducts(products);
      return filteredProducts.map((product) => {
        return (
          <ProductUserTwo key={product.id} {...product} userTwoTotal={userTwoTotal} userNumber={userNumber}/>
        );
      });
    }

    var renderProductsUsersTotals = () => {
      var filteredProducts = ProductAPI.totalFilterProducts(products, userOneTotal, userTwoTotal);
      return filteredProducts.map((product) => {
        return (
          <ProductFinalTotal key={product.id} {...product} userOneTotal={userOneTotal} userTwoTotal={userTwoTotal}/>
        );
      });
    }

    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
        </div>
        <div className="title-instructions">
          <h4 className="page-title">What should we buy Mom for Mother's Day?</h4>
          <ul>
            <li>Use the form at the bottom of the page to find products at Amazon.com to vote on.</li>
            <li>Increment votes for a product multiple times with [ + ] and [ - ] to express your enthusiasm for it.</li>
            <li>Percentages will be calculated and summed and the order of products will be resorted by most popular.</li>
            <li>Logout and login to vote as the other user.  Use two browsers at the same time to see live updates. (e.g. Chrome and Safari)</li>
          </ul>
        </div>

          <div className="row" className="products-box">
            <div className="productContainer">
              <h5>Paul - Total Votes: {userOneTotal}</h5>
              <ReactMotionFlip>
                {renderProductsUserOne()}
              </ReactMotionFlip>
            </div>
            <div className="productContainer">
              <h5>Kathy - Total Votes: {userTwoTotal}</h5>
              <ReactMotionFlip>
                {renderProductsUserTwo()}
              </ReactMotionFlip>
            </div>
            <div className="productContainer">
              <h5>Totals out of 200%</h5>
              <ReactMotionFlip>
                {renderProductsUsersTotals()}
              </ReactMotionFlip>
            </div>
          </div>


        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="todoText" placeholder="Search Amazon.com"/>
          <button className="button expanded">Find Product</button>
        </form>

      </div>
    )
  }
};

// export default Redux.connect()(Amazon);

export default connect(
  (state) => {
    return state;
  }
)(Amazon);

import moment from 'moment';

import firebase, {firebaseRef} from 'app/firebase/'

var socket = io();

export var addProduct = (product) => {
  return {
    type: 'ADD_PRODUCT',
    product
  };
};

export var addUserID = (userID) => {
  return {
    type: 'ADD_USER_ID',
    userID
  };
};

export var startAddProduct = (text) => {
  return (dispatch, getState) => {
    socket.emit('search', text, function (text, image) {
      var product = {
        text,
        image,
        counterUserOne: 0,
        counterUserTwo: 0,
        completed: false,
        createdAt: moment().unix(),
        completedAt: null,
        edit: false
      };
      var uid = getState().auth.uid;
      var productRef = firebaseRef.child(`products`).push(product);
    });
  };
};

export var addProducts = (products) => {
  return {
    type: 'ADD_PRODUCTS',
    products
  };
};

export var startAddProducts = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var productsRef = firebaseRef.child(`products`);

    return productsRef.once('value').then((snapshot) => {
      var products = snapshot.val() || {};
      var parsedProducts = [];

      Object.keys(products).forEach((productId) => {
        parsedProducts.push({
          id: productId,
          ...products[productId]
        });
      });
      dispatch(addProducts(parsedProducts));
    });
  };
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    firebase.auth().signInAnonymously().then((result) => {
      var userID = {
        uid: result.uid,
        createdAt: moment().unix()
      };

      var productRef = firebaseRef.child(`userIDs`).push(userID);
    }, (error) => {
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut();
  };
};


export var updateProduct = (id, updates) => {
  return {
    type: 'UPDATE_PRODUCT',
    id,
    updates
  };
};


export var startIncrementProductUserOne = (id, counterUserOne) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var productRef = firebaseRef.child(`products/${id}`);
    var updates = {
      counterUserOne: counterUserOne + 1
    };
    return productRef.update(updates);
  };
};

export var startIncrementProductUserTwo = (id, counterUserTwo) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var productRef = firebaseRef.child(`products/${id}`);
    var updates = {
      counterUserTwo: counterUserTwo + 1
    };
    return productRef.update(updates);
  };
};


export var startDeincrementProductUserOne = (id, counterUserOne) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var productRef = firebaseRef.child(`products/${id}`);
    if (counterUserOne === 0) {
      counterUserOne = 1
    }
    var updates = {
      counterUserOne: counterUserOne - 1
    };
    return productRef.update(updates);
  };
};

export var startDeincrementProductUserTwo = (id, counterUserTwo) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var productRef = firebaseRef.child(`products/${id}`);
    if (counterUserTwo === 0) {
      counterUserTwo = 1
    }
    var updates = {
      counterUserTwo: counterUserTwo - 1
    };
    return productRef.update(updates);
  };
};

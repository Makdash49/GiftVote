import moment from 'moment';

import firebase, {firebaseRef, githubProvider} from 'app/firebase/'

var socket = io();

// export var setSearchText = (searchText) => {
//   return {
//     type: 'SET_SEARCH_TEXT',
//     searchText
//   };
// };

// export var startSetSearchText = (searchText = '') => {
//   return (dispatch, getState) => {
//     var uid = getState().auth.uid;
//     // var newState = getState().showCompleted;
//     var toggleRef = firebaseRef.child(`users/${uid}/searchText`).set(searchText);
//   };
// };

// export var toggleShowCompleted = () => {
//   return {
//     type: 'TOGGLE_SHOW_COMPLETED'
//   };
// };

// export var startToggleShowCompleted = () => {
//   return (dispatch, getState) => {
//     var uid = getState().auth.uid;
//     var newState = getState().showCompleted;
//     var toggleRef = firebaseRef.child(`users/${uid}/showCompleted`).set(!newState);
//   };
// };

// export var startToggleEdit = () => {
//   return (dispatch, getState) => {
//     var uid = getState().auth.uid;
//     var newState = getState().edit;
//     var toggleRef = firebaseRef.child(`users/${uid}/showCompleted`).set(!newState);
//   };
// };

// export var setShowCompleted = (boolean) => {
//   return {
//     type: 'SET_SHOW_COMPLETED',
//     boolean
//   };
// };

// export var setEdit = (boolean) => {
//   return {
//     type: 'SET_EDIT',
//     boolean
//   };
// };

// export var addTodo = (todo) => {
//   return {
//     type: 'ADD_TODO',
//     todo
//   };
// };

// export var deleteTodo = (id) => {
//   return {
//     type: 'DELETE_TODO',
//     id
//   };
// };

// export var startAddTodo = (text) => {
//   return (dispatch, getState) => {
//     var todo = {
//       text,
//       completed: false,
//       createdAt: moment().unix(),
//       completedAt: null,
//       edit: false
//     };
//     var uid = getState().auth.uid;
//     var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);
//
//     return todoRef.then(() => {
//       // dispatch(addTodo({
//       //   ...todo,
//       //   id: todoRef.key
//       // }))
//     });
//   };
// };

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

      return productRef.then(() => {
      });
    });
  };
};

// export var startDeleteTodo = (id) => {
//   return (dispatch, getState) => {
//     var uid = getState().auth.uid;
//
//     var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`).remove();
//
//     return todoRef.then(() => {
//       // dispatch(deleteTodo(id));
//     });
//   };
// };

// export var addTodos = (todos) => {
//   return {
//     type: 'ADD_TODOS',
//     todos
//   };
// };

// export var startAddTodos = () => {
//   return (dispatch, getState) => {
//     var uid = getState().auth.uid;
//     var todosRef = firebaseRef.child(`users/${uid}/todos`);
//
//     return todosRef.once('value').then((snapshot) => {
//       var todos = snapshot.val() || {};
//       var parsedTodos = [];
//
//       Object.keys(todos).forEach((todoId) => {
//         parsedTodos.push({
//           id: todoId,
//           ...todos[todoId]
//         });
//       });
//       // dispatch(addTodos(parsedTodos));
//     });
//   };
// };


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

// export var autoAdd = () => {
//   return {
//     type: 'AUTO_ADD',
//     todo
//   };
// };


// export var updateTodo = (id, updates) => {
//   return {
//     type: 'UPDATE_TODO',
//     id,
//     updates
//   };
// };

// export var startToggleTodo = (id, completed) => {
//   return (dispatch, getState) => {
//     var uid = getState().auth.uid;
//     var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
//     var updates = {
//       completed,
//       completedAt: completed ? moment().unix() : null
//     };
//     return todoRef.update(updates).then(() => {
//       // dispatch(updateTodo(id, updates));
//     });
//   };
// };

// export var startToggleEdit = (id, edit) => {
//   return (dispatch, getState) => {
//     var uid = getState().auth.uid;
//     var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
//     var updates = {
//       edit
//     };
//     return todoRef.update(updates).then(() => {
//       // dispatch(updateTodo(id, updates));
//     });
//   };
// };

// export var startAddEdit = (id, text) => {
//   return (dispatch, getState) => {
//     var uid = getState().auth.uid;
//     var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
//     var updates = {
//       edit: false,
//       text
//     };
//     return todoRef.update(updates).then(() => {
//       // dispatch(updateTodo(id, updates));
//     });
//   };
// };

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    firebase.auth().signInAnonymously().then((result) => {
      // // // console.log('UID', result.uid);
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
    return firebase.auth().signOut().then(() => {
    });
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
    return productRef.update(updates).then(() => {
      // dispatch(updateProduct(id, updates));
    });
  };
};

export var startIncrementProductUserTwo = (id, counterUserTwo) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var productRef = firebaseRef.child(`products/${id}`);
    var updates = {
      counterUserTwo: counterUserTwo + 1
    };
    return productRef.update(updates).then(() => {
      // dispatch(updateProduct(id, updates));
    });
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
    return productRef.update(updates).then(() => {
      // dispatch(updateProduct(id, updates));
    });
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
    return productRef.update(updates).then(() => {
      // dispatch(updateProduct(id, updates));
    });
  };
};


// export var startDeincrementProduct = (id, counter) => {
//   return (dispatch, getState) => {
//     // // // // // console.log('GET STATE', getState());
//     var uid = getState().auth.uid;
//     var productRef = firebaseRef.child(`products/${id}`);
//     var updates = {
//       counter: counter - 1
//     };
//     return productRef.update(updates).then(() => {
//       dispatch(updateProduct(id, updates));
//     });
//   };
// };

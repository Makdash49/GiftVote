var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    case 'SET_SHOW_COMPLETED':
        return action.boolean;
    default:
      return state;
  };
};

export var todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ];
    case 'UPDATE_TODO':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            ...action.updates
          };
        } else {
          return todo;
        }
      });
    case 'ADD_TODOS':
      return [
        ...state,
        ...action.todos
      ];
    case 'LOGOUT':
      return [];
    case 'DELETE_TODO':
      for (var i = 0; i < state.length; i++) {
        if (state[i].id === action.id) {
          state.splice(i, 1);
        };
      };
      return [...state];
    default:
      return state;
  };
};

export var productsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [
        ...state,
        action.product
      ];
    case 'UPDATE_PRODUCT':
      // // // // console.log("IN UPATE_PRODUCT");
      // // // // console.log('action', action);
      // // // // // console.log('state', state);
      return state.map((product) => {
        if (product.id === action.id) {
          return {
            ...product,
            ...action.updates
          };
        } else {
          return product;
        }
      });
    case 'ADD_PRODUCTS':
      return [
        ...state,
        ...action.products
      ];
    case 'LOGOUT':
      return [];
    // case 'DELETE_TODO':
    //   for (var i = 0; i < state.length; i++) {
    //     if (state[i].id === action.id) {
    //       state.splice(i, 1);
    //     };
    //   };
      // return [...state];
    default:
      return state;
  };
};

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
     return {
       uid: action.uid
     };
    case 'LOGOUT':
      return {};
    default:
      return state;
  };
};

export var userIDsReducer = (state = [], action) => {
  // // console.log('STATE', state);
  // // console.log('ACTION.USERID', action.userID);
  switch (action.type) {
     case 'ADD_USER_ID':
      return [
        ...state,
        action.userID
      ];
      case 'LOGOUT':
        return [];
    default:
      return state;
  };
};


// When log out, wipes auth object.
// Todos array, is still in redux store.
// Handler for logout wipes all data.
// Update reducer on logout to wipe data.
// Make new test.  Start with data.
// Trigger log out action.  Verify it got wiped out.
// All in reducers.
//
// Add handler log todos reducer.  Return empty array.

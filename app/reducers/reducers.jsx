export var productsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [
        ...state,
        action.product
      ];
    case 'UPDATE_PRODUCT':
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

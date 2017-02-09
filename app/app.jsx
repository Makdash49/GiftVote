var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

var actions = require('actions');
var store = require('configureStore').configure();
import firebase, {firebaseRef, githubProvider} from 'app/firebase/'
import router from 'app/router/';


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));

    hashHistory.push('/amazon');

    var productsRef = firebaseRef.child(`products`);
    var userIDsRef = firebaseRef.child(`userIDs`);

    var id;
    var product;

    productsRef.on('child_added', (snapshot) =>{
      product = snapshot.val();
      id = snapshot.key;
      store.dispatch(actions.addProduct({...product, id}));
    });

    productsRef.on('child_changed', (snapshot) =>{
      product = snapshot.val();
      id = snapshot.key;
      store.dispatch(actions.updateProduct(id, product));
    });

    userIDsRef.on('child_added', (snapshot) =>{
      var userID = snapshot.val();
      id = snapshot.key;
      store.dispatch(actions.addUserID(userID));
    });



  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});



// Load foundations
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
    <Provider store={store}>
      {router}
    </Provider>,
    document.getElementById('app')
);

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
    // store.dispatch(actions.startAddTodos());
    // store.dispatch(actions.startAddProducts());

    hashHistory.push('/amazon');
    // var notesRef = firebaseRef.child(`users/${user.uid}/todos`);
    // var toggleRef = firebaseRef.child(`users/${user.uid}/showCompleted`);
    // var searchRef = firebaseRef.child(`users/${user.uid}/searchText`);
    // var editRef = firebaseRef.child(`users/${user.uid}/edit`);
    var productsRef = firebaseRef.child(`products`);
    var userIDsRef = firebaseRef.child(`userIDs`);
    // var productRef = firebaseRef.child(`users/${user.uid}/products`);

    // var todo;
    var id;
    var product;

    // searchRef.on('value', (snapshot) =>{
    //   // // // // // // console.log('value', snapshot.key, snapshot.val());
    //   var searchText = snapshot.val();
    //   store.dispatch(actions.setSearchText(searchText));
    // });

    // toggleRef.on('value', (snapshot) =>{
    //   var boolean = snapshot.val();
    //   store.dispatch(actions.setShowCompleted(boolean));
    // });

    // editRef.on('value', (snapshot) =>{
    //   // // // // // // console.log('value', snapshot.key, snapshot.val());
    //   var boolean = snapshot.val();
    //   store.dispatch(actions.setEdit(boolean));
    // });

    // notesRef.on('child_added', (snapshot) =>{
    //   // // // // // // console.log('child_added', snapshot.key, snapshot.val());
    //   todo = snapshot.val();
    //   id = snapshot.key;
    //   store.dispatch(actions.addTodo({...todo, id}));
    // });

    // editRef.on('value', (snapshot) =>{
    //   // // // // // // console.log('value', snapshot.key, snapshot.val());
    //   var boolean = snapshot.val();
    //   store.dispatch(actions.setEdit(boolean));
    // });

// **********************************************************************
    productsRef.on('child_added', (snapshot) =>{
      // // // console.log('PRODUCT ADDED!!!!!', snapshot.key, snapshot.val());
      product = snapshot.val();
      // // // // // console.log('PRODUCT****************************', product);
      id = snapshot.key;
      store.dispatch(actions.addProduct({...product, id}));
    });

    productsRef.on('child_changed', (snapshot) =>{
      // // // console.log('PRODUCT CHANGED!!!', snapshot.key, snapshot.val());
      product = snapshot.val();
      // // // // console.log('PRODUCT****************************', product);
      id = snapshot.key;
      // // // // console.log('productsRef', id);
      store.dispatch(actions.updateProduct(id, product));
    });

    // notesRef.on('child_changed', (snapshot) =>{
    //   // // // // console.log('NOTES REF:  child_changed', snapshot.key, snapshot.val());
    //   id = snapshot.key;
    //   // // // // console.log('notesRef', id);
    //   todo = snapshot.val();
    //   store.dispatch(actions.updateTodo(id, todo));
    // });

    // notesRef.on('child_removed', (snapshot) =>{
    //   // // // // // // console.log('child_removed', snapshot.key, snapshot.val());
    //   id = snapshot.key
    //   store.dispatch(actions.deleteTodo(id));
    // });

    userIDsRef.on('child_added', (snapshot) =>{
      // // console.log('UID_ADDED!!!!!!', snapshot.key, snapshot.val());
      var userID = snapshot.val();
      // // // // // console.log('PRODUCT****************************', product);
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

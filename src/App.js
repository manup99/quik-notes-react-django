import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Routing1 from './components/Routing1'
import {loaduser} from './actions/Auth'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Navbar1 from './components/Navbar1'
import Register1 from './components/Register1'
import Main2 from './components/Main2'
import store from './store'
class App extends Component{
  componentDidMount(){
    store.dispatch(loaduser())
  }
  render(){
    return(
      <div>
        <Navbar1 />
        <Routing1 />
      </div>

    )
  }
}
App.propTypes={
  loaduser:PropTypes.func.isRequired
}

export default connect(null,{loaduser})(App);

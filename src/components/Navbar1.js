import React, { Component } from 'react';
import {Navbar,Nav} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../actions/Auth'
import './login.css'
class Navbar1 extends Component {

    render() {
        const show=this.props.auth.isAuthenticated &&( <div>
            <Nav>
            <Nav.Link><h4 style={{color:'white'}} className="nav">Hi! {this.props.auth.user.username}</h4></Nav.Link>
            <Nav.Link eventKey={2} style={{color:'white'}}><button onClick={this.props.logout}>Logout!</button></Nav.Link>
            </Nav>
            
        </div>    )
        return (
        
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
  <Navbar.Brand href="#home" className="nav"><h2>QuikNotes</h2></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link className="navi" style={{color:'white'}}> </Nav.Link>

    <Nav.Link className="navi" style={{color:'white'}}>    Save all your notes and ideas here!</Nav.Link>
    
    </Nav>
            {show}


  </Navbar.Collapse>
</Navbar>
            
        );
    }
}
Navbar.propTypes={
    auth:PropTypes.object.isRequired,
    logout:PropTypes.func.isRequired
}
const mapStateToProps=(state)=>({
    auth:state.auth,
})

export default connect(mapStateToProps,{logout})(Navbar1);
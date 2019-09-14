import React, { Component } from 'react'
import {Nav,NavDropdown,Navbar, Container, Row, Col} from 'react-bootstrap'
import './login.css'
import Navbar1 from './Navbar1'
import {BrowserRouter as Router,Link,NavLink,Route,Redirect} from 'react-router-dom'
import {login} from '../actions/Auth'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:''
        }
    }
    change=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submit=(e)=>{
        e.preventDefault()
        this.props.login(this.state.username,this.state.password)
    }
    render() {
        if(this.props.isAuthenticated){
            return(
                <Redirect to="/main" />
            )
        }
        return (
            <div>
<Container fluid style={{marginTop:"200px"}}>
    <Row>
        <Col md={{span:4,offset:4}} style={{border:'2px solid black',overflow:'hidden',borderRadius:'10px'}}>
                <Container>
                    <form onSubmit={this.submit}>
                        <Row className="my-3">
                            <Col md={{span:8,offset:2}}>
                                <h1 style={{textAlign:'center'}}>Login</h1>
                            </Col>
                        </Row>
                        <Row className="my-3">
                        <Col md={6} style={{overflow:'hidden',textAlign:'center'}}>
                                <label style={{fontSize:'20px'}}>Username:</label>
                        </Col>
                        <Col md={6} style={{overflow:'hidden',textAlign:'center'}}>
                        <input type="text" name="username" style={{width:'100%',borderRadius:'10px'}} value={this.state.username} onChange={this.change} />
                        </Col>
                        </Row>
                        <Row className="my-3">
                        <Col md={6} style={{overflow:'hidden',textAlign:'center'}}>
                                <label style={{fontSize:'20px'}}>Password:</label>
                        </Col>
                        <Col md={6} style={{overflow:'hidden',textAlign:'center',borderRadius:'10px'}}>
                        <input type="password" name="password" style={{width:'100%',borderRadius:'10px'}}  value={this.state.password} onChange={this.change} />
                        </Col>
                        </Row>
                        <Row className="my-5">
                            <Col md={{span:8,offset:2}} style={{textAlign:'center'}}>
                                <button type="submit" style={{borderRadius:'10px',background:'transparent',border:'2px solid black',width:'100px'}}>Log In</button>
                            </Col>
                        </Row>
                        <Row className="my-5">
                            <Col md={{span:8,offset:2}} style={{textAlign:'center'}}>
                            <Link to="/register"><button style={{borderRadius:'10px',background:'transparent',border:'2px solid black',width:'100px'}}>Register</button></Link> 
                            </Col>
                        </Row>
                    </form>

                   
                </Container>

        </Col>
    </Row>
</Container>
            </div>
        )
    }
}
Login.propTypes={
    login:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    isAuthenticated:PropTypes.bool
}
const mapStateToProps=(state)=>({
    auth:state.auth,
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login)

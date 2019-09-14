import React, { Component } from 'react'
import {Nav,NavDropdown,Navbar, Container, Row, Col} from 'react-bootstrap'
import './login.css'
import {BrowserRouter as Router,Link,NavLink,Route,Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {register} from '../actions/Auth'
class Register1 extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password1:'',
            email:'',
            password2:''
        }
    }
    change=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submit=(e)=>{
        e.preventDefault()
        this.props.register(this.state.username,this.state.email,this.state.password1,this.state.password2)
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
                            <h1 style={{textAlign:'center'}}>Register</h1>
                        </Col>
                    </Row>
                    <Row className="my-3">
                    <Col md={6} style={{overflow:'hidden',textAlign:'center'}}>
                            <label style={{fontSize:'20px'}}>Username:</label>
                    </Col>
                    <Col md={6} style={{overflow:'hidden',textAlign:'center'}}>
                    <input type="text" name="username" onChange={this.change} value={this.state.username} style={{width:'100%',borderRadius:'10px'}} />
                    </Col>
                    </Row>
                    <Row className="my-3">
                    <Col md={6} style={{overflow:'hidden',textAlign:'center'}}>
                            <label style={{fontSize:'20px'}}>Email:</label>
                    </Col>
                    <Col md={6} style={{overflow:'hidden',textAlign:'center',borderRadius:'10px'}}>
                    <input type="email" name="email" onChange={this.change} value={this.state.email} style={{width:'100%',borderRadius:'10px'}} />
                    </Col>
                    </Row>
                    <Row className="my-3">
                    <Col md={6} style={{overflow:'hidden',textAlign:'center'}}>
                            <label style={{fontSize:'20px'}}>Password1:</label>
                    </Col>
                    <Col md={6} style={{overflow:'hidden',textAlign:'center',borderRadius:'10px'}}>
                    <input type="password" name="password1" value={this.state.password1} onChange={this.change} style={{width:'100%',borderRadius:'10px'}} />
                    </Col>
                    </Row>
  
                    <Row className="my-3">
                    <Col md={6} style={{overflow:'hidden',textAlign:'center'}}>
                            <label style={{fontSize:'20px'}}>Password2:</label>
                    </Col>
                    <Col md={6} style={{overflow:'hidden',textAlign:'center',borderRadius:'10px'}}>
                    <input type="password" name="password2" value={this.state.password2} onChange={this.change} style={{width:'100%',borderRadius:'10px'}} />
                    </Col>
                    </Row>
                    <Row className="my-5">
                        <Col md={{span:8,offset:2}} style={{textAlign:'center'}}>
                            <button type="submit" style={{borderRadius:'10px',background:'transparent',border:'2px solid black',width:'100px'}}>Register</button>
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
Register1.propTypes={
    register:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    isAuthenticated:PropTypes.bool
}
const mapStateToProps=(state)=>({
    auth:state.auth,
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{register})(Register1)

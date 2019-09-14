import React, { Component } from 'react'
import {Container,Col,Row, Dropdown} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {BrowserRouter as Router,Link,NavLink,Route,Redirect} from 'react-router-dom'

class Main2 extends Component {
    _isMounted=false
  constructor(props){
    super(props)
    this.state={
      value:'',
      not:{},
      title:''
    }
  }
  change=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  componentWillMount(){
      this._isMounted=true
    const id=this.props.match.params.id;
    const token=localStorage.getItem('token')
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    if(token){
        config.headers["Authorization"]=`Token ${token}`
    }
    axios.get(`http://localhost:8000/notes/${id}`,config)
    .then(res=>{
      this.setState({
        not:res.data
      })
      this.setState({
          value:this.state.not.body,
          title:this.state.not.title
      })
      console.log(this.state.not)
    })

  }
  componentWillUnmount(){
      this._isMounted=false
  }
  update=(e)=>{
      e.preventDefault()
      const id=this.props.match.params.id;
      const token=localStorage.getItem('token')
      const config={
          headers:{
              "Content-Type":"application/json"
          }
      }
      if(token){
          config.headers["Authorization"]=`Token ${token}`
      }
      const body={
          'title':this.state.title,
          'body':this.state.value
      }
      axios.put(`http://localhost:8000/notes/${id}/`,body,config)
      .then(res=>{
        this.setState({
          not:res.data
        })
        this.setState({
            value:this.state.not.body,
            title:this.state.not.title
        })
        console.log(this.state.not)
      })
      alert("Updated Successfully")
      this.props.history.push("/main")
  }
  delete=(e)=>{
      e.preventDefault()
    const id=this.props.match.params.id;
    const token=localStorage.getItem('token')
    console.log(token)
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    if(token){
        config.headers["Authorization"]=`Token ${token}`
    }
    axios.delete(`http://localhost:8000/notes/${id}/`,config)
    .then(
      this.setState({
        not:{}
    })
    )
    this.props.history.push("/main")

  }
  
  render() {
    const bold=()=>{
      let yo=document.getElementById('yo')
      if(yo.style.fontWeight==='bold'){
        yo.style.fontWeight="normal"
      }
      else{
        yo.style.fontWeight="bold"
      }
    }
    const italic=()=>{
      let yo=document.getElementById('yo')
      if(yo.style.fontStyle==='normal'){
        yo.style.fontStyle="italic"
      }
      else{
        yo.style.fontStyle="normal"
      }
    }
    const selectkarlo=()=>{
      let y1=document.getElementById('select')
      let y=document.getElementById('yo')
      if(y1.value==="heading1"){
        y.style.fontSize="50px"
      }
      else if(y1.value==="heading2"){
        y.style.fontSize="40px"
      }
      else if(y1.value==="heading3"){
        y.style.fontSize="30px"
      }
      else{
        y.style.fontSize="20px"
      }
    }
    const dot=()=>{
      let y=document.getElementById('yo')
      y.value=y.value+'•'      
    }
    if(localStorage.getItem('token')){
        return(
<Container fluid>
          <Row>
            <Col md={2} style={{height:'800px',border:'3px solid black',padding:'0px'}}>
            <Container fluid>
              <Row>
                <Col style={{borderBottom:'3px solid black'}}>
                <h3 className="my-5" style={{textAlign:'center'}}>{this.state.title}</h3>
                </Col>
              </Row>
              
            </Container>
            </Col>
            <Col md={10} style={{height:'800px',border:'3px solid black',padding:'0px'}}>
            <Container fluid>
              <Row>
                <Col style={{borderBottom:'4px black solid',padding:'0px',height:'45px'}}>
                  <select style={{background:'transparent',height:'100%',border:'1px solid black'}} id="select" onChange={selectkarlo}>
                    <option value="default">Default</option>
                    <option value="heading1">Heading 1</option>
                    <option value="heading2">heading 2</option>
                    <option value="heading3">Heading 3</option>
                  </select>
                  <button style={{background:'transparent',height:'100%',border:'1px solid black',width:'40px',fontWeight:'bold'}} onClick={bold} id="bold">B</button>
                  <button style={{background:'transparent',height:'100%',border:'1px solid black',width:'40px',fontStyle:'italic'}} id="italic" onClick={italic}>I</button>
                  <button style={{background:'transparent',height:'100%',border:'1px solid black',width:'40px',fontWeight:'bold'}} onClick={dot}  id="dot"><span id="span" style={{  height: '10px',
  width: '10px',
  background: 'black',
  borderRadius: '50%',
  display: 'inline-block'}}></span></button>
                  <button style={{background:'transparent',height:'100%',border:'1px solid black',position:'absolute',right:'0px',width:'80px'}} onClick={this.update}>Save</button>
                  <button style={{background:'transparent',height:'100%',border:'1px solid black',position:'absolute',right:'80px',width:'80px',marginRight:'auto'} } onClick={this.delete}>Delete</button>
                </Col>
              </Row>
              <Row>
                <Col style={{padding:'0px'}}>
                  <textarea style={{background:'#e0e0d1',width:'100%',height:'750px',fontSize:'20px',border:'none',fontWeight:'normal',fontStyle:'normal'}} value={this.state.value} id="yo" name="value" onChange={this.change}>
                  </textarea>
                  <label style={{width:'10%',textAlign:'center'}}><h2>Title:</h2></label><input type="text" onChange={this.change} value={this.state.title} name="title" style={{width:'90%',height:'40px'}} />
                </Col>
              </Row>
            </Container>
            </Col>
          </Row>
        </Container>
        )
    }
    return (
        
        <Redirect to="/" />
  
    )
  }
}
Main2.propTypes={
    isAuthenticated:PropTypes.bool
}
const mapStateToProps=(state)=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{})(Main2)
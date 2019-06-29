import React from 'react';
import './login.css';
import { InputGroup, Input, Button } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                name:"",
                password:""
            },
            false:false,
            toMain:false,
        }
    }
    handleCha(e,index){
        let _form = this.state.form;
        _form[index] = e.target.value;
        this.setState({form:_form})
        this.setState({false:false})
    }
    login(e){
        e.preventDefault();
        let _this = this;
        
        axios.post('http://localhost:2005/api/login',{
            name:this.state.form.name,
            password:this.state.form.password
        })
        .then(function(res){
            _this.setState({toMain:true})
        })
        .catch(function(err){
            _this.setState({false:true})
        })
        
    }
    render(){
        if(this.state.toMain===true){
            return <Redirect to="/regist"/>
        }
        return(
            <div className="section-login">
                <div className="loginContainer">
                     <div className="login-items-block">
                         {this.state.false === true?<h1>
                             password is doesnt rigth
                         </h1>:<h1>NOTES</h1>}
                        <div className="inputs">
                            <div>
                                <InputGroup>
                                    <Input placeholder="name"
                                    onChange={(e)=>this.handleCha(e,"name")}
                                    value={this.state.form.name} />
                                </InputGroup>
                            </div>
                            <div>
                                <InputGroup>
                                    <Input placeholder="password"
                                    onChange={(e)=>this.handleCha(e,"password")}
                                    value={this.state.form.password}
                                    type="password" />
                                </InputGroup>
                            </div>
                        </div>
                        <div className="buttons">
                            <Button onClick={(e)=>this.login(e)} color="success">login</Button>
                            <Link to="/regist">
                                <Button color="primary">
                                    or regist
                                </Button>
                            </Link>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}
export default LoginPage;
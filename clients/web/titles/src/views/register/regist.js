import React from 'react';
import '../login/login.css';
import { InputGroup, Input, Button } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class RegisterPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                name:"",
                password:""
            },
            toLoginPage:false,
            falseWithReg:false,
        }
    }
    handleCha(e,index){
        let _form = this.state.form;
        _form[index] = e.target.value;
        this.setState({form:_form})
        this.setState({falseWithReg:false})
    }
    regist(e){
        e.preventDefault();
        let _this = this;
        
        axios.post('http://localhost:2005/api/regist',{
            name:this.state.form.name,
            password:this.state.form.password
        })
        .then(function(res){
            setTimeout(_this.setState({toLoginPage:true}), 2000)
        })
        .catch(function(err){
            _this.setState({falseWithReg:true})
        })
        
    }
    render(){
        if(this.state.toLoginPage===true){
            return <Redirect to="/"/>
        }
        return(
            <div className="section-login">
                <div className="loginContainer">
                     <div className="login-items-block">
                         {this.state.falseWithReg === false?
                         <h1>Register page</h1>:
                         <h1>we have this login already, please try somethimg else</h1>}
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
                            <Button onClick={(e)=>this.regist(e)} color="success">regist</Button>
                            <Link to="/">
                                <Button color="primary">
                                    back to login
                                </Button>
                            </Link>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}
export default RegisterPage;
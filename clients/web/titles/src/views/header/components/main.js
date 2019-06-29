import React from 'react';
import './main.css';
import {  FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';
import { thisExpression } from '@babel/types';

class NoteMaingSide extends React.Component{
    constructor(props){
        super(props);
        this.state={
            size:"",
            form:{
                name:"",
                text:""
            },
            success:false,

        }
    }
    sizeChang(e){
        this.setState({size:e.target.value})
        let areaI = document.querySelector('.areaI')
        areaI.style.fontSize = e.target.value + "px"
    }
    handle(e,index){
        let _form = this.state.form;
        _form[index] = e.target.value;
        this.setState({form:_form});
        this.setState({success:false})
    }
    send(e){
        e.preventDefault();
        let _this = this;
        if(this.state.form.text === "")return alert("text is empty");
        if(this.state.form.name === "")return alert("names not defined")
        axios.post('http://localhost:2005/api/note',{
            name:this.state.form.name,
            text:this.state.form.text
        })
        .then(function(res){
            _this.setState({success:true})
        })
        .catch(function(err){

        })
        let inp1 = document.getElementById("2");
        let inp2 = document.getElementById("3")
        inp1.value = "";
        inp2.value = "";
    }
    render(){return(<div className="main">
        <div className="contMain">
            <div className="optionsBlock">
                <FormGroup>
                    <Label for="exampleSelect">note name</Label>
                    <Input onChange={(e)=>this.handle(e,"name")} id="2">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">size select</Label>
                    <Input onChange={(e)=>this.sizeChang(e)}
                    value={this.state.size}
                    type="select" name="select" id="exampleSelect">
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option><option>13</option><option>14</option>
                        <option>15</option><option>16</option><option>17</option>
                        <option>18</option><option>19</option><option>20</option>
                    </Input>
                </FormGroup>
                <Button onClick={(e)=>this.send(e)} color="success">Save</Button>
                {this.state.success === true?<h4>your note has been saved!</h4>:null}
            </div>
            <div className="noteAreablock">
            <textarea onChange={(e)=>this.handle(e,"text")} id="3" className="areaI">

            </textarea>
            </div>
        </div>
    </div>)}
}
export default NoteMaingSide;
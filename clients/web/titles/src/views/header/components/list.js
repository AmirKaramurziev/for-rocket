import React from 'react';
import './main.css';
import axios from "axios";

class NoteList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fromExpress:[],
            _id:"",
            oneMoreId:"",
            form:{
                name:"",
                text:""
            }
        }
    }
    componentDidMount(){
        this.some();
    }
    some(){
        let _this = this;
        axios.get('http://localhost:2005/api/get_all')
        .then(function(res){
            _this.setState({fromExpress:res.data})
        })
        .catch(function(err){

        })
    }
    deleteThis(e,index){
        e.preventDefault();
        let _this = this;
        
        axios.post('http://localhost:2005/api/delete_note',{
            name:index.name,
            text:index.text,
        })
        .then(function(res){
            _this.setState({fromExpress:res.data})
        })
        .catch(function(err){
            
        })  
    }
    read(e,index){
        this.setState({_id:index})
    }
    closeThis(e){
        this.setState({_id:""})
    }
    changeThis(e,index){
        if(index === false)return this.setState({oneMoreId:""})
        this.setState({oneMoreId:index._id})
    }
    changeAll(e,index){
        let _form = this.state.form;
        _form[index] = e.target.value;
        this.setState({form:_form})
    }
    allDone(e){
        e.preventDefault();
        if(this.state.form.name === "")return console.log("no");
        if(this.state.form.text === "")return console.log("no");

        let _this = this;
        
        axios.post('http://localhost:2005/api/update_note',{
            name:this.state.form.name,
            text:this.state.form.text,
            _id:this.state.oneMoreId,
        })
        .then(function(res){
            _this.some();
            console.log(res.data);
            _this.setState({oneMoreId:""})
        })
        .catch(function(err){
            console.log(err)
        })
    }
    render(){return(<div className="main">
        <div className="contMainOne">
            <div className="lists">
                <h1>list side</h1>
                {this.state.fromExpress.map((index)=>{
                    return(
                        <div>
                            <div className="list-one">
                                <h4>
                                    {this.state.oneMoreId === index._id?
                                    <input
                                    placeholder={index.name} onChange={
                                        (e)=>this.changeAll(e,"name")
                                    }/>:<div>{index.name}</div>}
                                </h4>
                                <div className="li-one">
                                    {this.state._id === index._id?
                                    <button onClick={
                                        (e)=>this.closeThis(e)
                                    }>закрыть</button>:
                                    <button onClick={
                                        (e)=>this.read(e,index._id)
                                    }>читать</button>}
                                    {this.state.oneMoreId === index._id?
                                    <div className="dive">
                                        <button onClick={
                                            (e)=>this.allDone(e)
                                        }>да</button>
                                        <button onClick={
                                            (e)=>this.changeThis(e,false)
                                        }>отмена</button>
                                    </div>:
                                    <button onClick={
                                        (e)=>this.changeThis(e,index)
                                    }>изменить</button>}
                                    <button onClick={
                                        (e)=>this.deleteThis(e,index)
                                    }>удалить</button>
                                </div>
                            </div>
                            {this.state._id === index._id?
                            <div className="textSide"
                            >{index.text}</div>:null}
                            {this.state.oneMoreId === index._id?
                            <textarea
                            placeholder={index.text} className="txtinp" onChange={
                                (e)=>this.changeAll(e,"text")
                            }/>:null}
                        </div>
                    )
                })}
            </div>
        </div>
    </div>)}
}
export default NoteList;
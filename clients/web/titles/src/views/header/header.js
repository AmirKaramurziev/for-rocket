import React from 'react';
import './header.css'
import { Nav, NavItem, NavLink } from 'reactstrap';
import NoteMaingSide from './components/main';
import NoteList from './components/list';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            page:"list",
            modal:false,
        };
        this.toggle = this.toggle.bind(this);
    }
    changePage(e,index){
        if(index === "list"){
            this.setState({modal:true})
        }else(this.setState({page:index}))
    }
    goList(){
        this.setState({page:"list"});
        this.setState({modal:false})
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render(){
        return(
            <div>
                <div className="header">
                    <div className="contHeader">
                        <div className="items-header">
                            <h1>NOTES SITE</h1>
                            <Nav>
                                <NavItem>
                                    <NavLink onClick={
                                        (e)=>this.changePage(e,"createNew")
                                    } ><a>create new</a></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={
                                        (e)=>this.changePage(e,"list")
                                    }><a
                                    onClick={this.toggle}>go to notes list</a></NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                </div>
                {this.state.page === "createNew"?<NoteMaingSide/>:null}
                {this.state.page === "list"?<NoteList/>:null}



                <div>
                    <Modal isOpen={this.state.modal}>
                    <ModalBody>
                       are you sure to living this page?
                        what you wrote will not be saved
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.goList.bind(this)}>yes, i am sure</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>no</Button>
                    </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default Header;
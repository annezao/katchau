import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Notification from "./Notification";
import Settings from '../../views/Settings/Settings';
import './style.css'

//Icones
import { MdClose } from 'react-icons/md';
// reactstrap components
import {
  // Collapse,
  InputGroup,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Modal,
 // Alert,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // NavLink,
  // DropdownItem,
} from "reactstrap";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // collapseOpen: false,
      modalSearch: false,
      modalNotification:false,
      // color: "navbar-transparent"
    };
  }
  toggleModalNotification = () => {
    this.setState({
      modalNotification: !this.state.modalNotification
    });
  };

  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch
    });
  };
  render() {
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="md"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <Nav className="ml-auto" navbar>
              <InputGroup>
              <button
                  aria-label="Toggle navigation"
                  className="btn btn-link"
                  data-target="#searchModal"
                  data-toggle="modal"
                  id="navigation"
                  type="button"
                  onClick={this.toggleModalNotification}
                >
                  <div className="notification" />
                  <i className="tim-icons icon-sound-wave" id="iconNotification" />
                </button>
                {  this.props.brandText.indexOf("Painel de controle") !== -1 ? (<button
                  aria-label="Toggle navigation"
                  className="btn btn-link"
                  data-target="#searchModal"
                  data-toggle="modal"
                  id="navigation"
                  type="button"
                  onClick={this.toggleModalSearch}
                >
                  <span className="navbar-toggler-bar navbar-kebab" />
                  <span className="navbar-toggler-bar navbar-kebab" />
                  <span className="navbar-toggler-bar navbar-kebab" />
                </button>): null}
              </InputGroup>
            </Nav>
          </Container>
        </Navbar>
        {/* Modal de Notificações */}
        <Modal 
          modalClassName="modal-notification"
          isOpen={this.state.modalNotification}
          toggle={this.toggleModalNotification}
          id="modalNoti">
          <div className="modal-header white-content">
          <button
            aria-label="Toggle navigation"
            className="btn btn-link"
            data-toggle="modal"
            id="buttonClose"
            type="button"
            onClick={this.toggleModalNotification}
          >
           <MdClose/>
          </button>
            <p>Notificações</p>
          </div>
          <div className="modal-body  white-content">
            <Notification/>
          </div>
        </Modal>
        {/* Modal Configurações do dispositovo */}
        <Modal
          modalClassName="modal-search"
          isOpen={this.state.modalSearch}
          toggle={this.toggleModalSearch}
        >
          <div className="modal-header white-content">
          <button
            aria-label="Toggle navigation"
            className="btn btn-link"
            data-toggle="modal"
            id="buttonClose"
            type="button"
            onClick={this.toggleModalSearch}
          >
           <MdClose/>
          </button>
            <h3 id="header">Configurações do dispositivo</h3>
          </div>
          <div className="modal-body  white-content">
                <Settings/>
          </div>
        </Modal>
      </>
    );
  }
}

export default AdminNavbar;

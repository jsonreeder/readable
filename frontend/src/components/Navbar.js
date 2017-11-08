import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fromActions from '../actions';

class Navbar extends Component {
  render() {
    const { openModal, setFilter } = this.props;
    return (
      <nav className="navbar" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <h2 className="title is-2">
              <i className="fa fa-book" /> readable
            </h2>
          </div>
        </div>
        <div className="navbar-menu is-active">
          <div className="navbar-end">
            <div className="navbar-item">
              <button className="button is-info" onClick={openModal}>
                <p>
                  <i className="fa fa-pencil" /> New Post
                </p>
              </button>
            </div>
            <div className="navbar-item">
              <div className="dropdown">
                <div className="dropdown-trigger">
                  <button
                    className="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span>Dropdown button</span>
                    <span className="icon is-small">
                      <i className="fa fa-angle-down" aria-hidden="true" />
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <a href="#" className="dropdown-item">
                      Dropdown item
                    </a>
                    <a className="dropdown-item">Other dropdown item</a>
                    <a href="#" className="dropdown-item is-active">
                      Active dropdown item
                    </a>
                    <a href="#" className="dropdown-item">
                      Other dropdown item
                    </a>
                    <hr className="dropdown-divider" />
                    <a href="#" className="dropdown-item">
                      With a divider
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = {
  openModal: fromActions.toggleModal,
  setFilter: input => console.log(input),
};

export default connect(null, mapDispatchToProps)(Navbar);

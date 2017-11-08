import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fromActions from '../actions';

class Navbar extends Component {
  state = {
    dropdownActive: false,
  };

  toggleDropdown() {
    this.setState({
      dropdownActive: !this.state.dropdownActive,
    });
  }

  render() {
    const { openModal, setFilter } = this.props;
    const { dropdownActive } = this.state;

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
                  <i className="fa fa-pencil" /> New post
                </p>
              </button>
            </div>
            <div className="navbar-item">
              <div className={`dropdown ${dropdownActive && 'is-active'}`}>
                <div className="dropdown-trigger">
                  <button
                    className="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    onClick={() => this.toggleDropdown()}
                  >
                    <span>Sort posts</span>
                    <span className="icon is-small">
                      <i className="fa fa-angle-down" aria-hidden="true" />
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <a href="#" className="dropdown-item">
                      votes up
                    </a>
                    <a href="#" className="dropdown-item is-active">
                      votes down
                    </a>
                    <a href="#" className="dropdown-item">
                      date up
                    </a>
                    <a href="#" className="dropdown-item">
                      date down
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

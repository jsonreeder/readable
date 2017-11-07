import React from 'react';
import { connect } from 'react-redux';
import * as fromActions from '../actions';

const Navbar = ({ openModal }) =>
  <nav className="navbar" role="navigation" aria-label="main navigation">
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
      </div>
    </div>
  </nav>;

const mapDispatchToProps = {
  openModal: fromActions.toggleModal,
};

export default connect(null, mapDispatchToProps)(Navbar);

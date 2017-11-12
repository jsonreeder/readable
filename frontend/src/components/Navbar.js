import React from 'react';
import { connect } from 'react-redux';
import * as fromActions from '../actions';

const Navbar = ({ openModal, setFilter, sortFilter }) =>
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
          <div className="dropdown">
            <div className="select is-success">
              <select
                value={sortFilter}
                onChange={e => setFilter(e.target.value)}
              >
                <option>Sort posts</option>
                <option value="voteScoreUp">votes up</option>
                <option value="voteScoreDown">votes down</option>
                <option value="dateUp">date up</option>
                <option value="dateDown">date down</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>;

const mapStateToProps = state => ({
  sortFilter: state.sort.sortFilter,
});

const mapDispatchToProps = {
  openModal: fromActions.toggleModal,
  setFilter: fromActions.setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fromActions from '../actions';

class Navbar extends Component {
  state = {
    optionSelected: '',
  };

  selectOption(option) {
    this.setState({ optionSelected: option });
  }

  render() {
    const { openModal, setFilter } = this.props;
    const { optionSelected } = this.state;

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
              <div className="dropdown">
                <div className="select is-success">
                  <select
                    value={optionSelected}
                    onChange={e => this.selectOption(e.target.value)}
                  >
                    <option>Sort posts</option>
                    <option value="votes up">votes up</option>
                    <option value="votes down">votes down</option>
                    <option value="date up">date up</option>
                    <option value="date down">date down</option>
                  </select>
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

import React, { Component } from 'react';
import * as api from '../api';
import Error from './Error';

class NameInput extends Component {
  state = {
    name: '',
    err: null,
  };
  render() {
    const { err } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter your name:{' '}
            <input
              type="text"
              id="name-input"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          <button>submit</button>
        </form>
        {err && <Error msg={err} />}
      </div>
    );
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value });
  };

  handleSubmit = event => {
    const { name } = this.state;
    event.preventDefault();
    api
      .getUserByName(name)
      .then(user => {
        this.setState({ name: '', err: null });
        this.props.updateUser(user);
      })
      .catch(() => {
        this.setState({ err: 'User not found' });
      });
  };
}

export default NameInput;

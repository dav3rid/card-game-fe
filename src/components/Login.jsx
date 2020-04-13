import React, { Component } from 'react';
import * as api from '../api';
import Error from './Error';

class Login extends Component {
  state = {
    name: '',
    err: null,
  };
  render() {
    const { name, err } = this.state;
    return (
      <div>
        <label>
          Enter your name:{' '}
          <input
            type="text"
            id="name-input"
            onChange={this.handleChange}
            value={name}
          />
        </label>
        <button onClick={this.handleSignIn}>Sign in</button>
        <button onClick={this.handleSignUp}>Sign up</button>

        {err && <Error msg={err} />}
      </div>
    );
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value });
  };

  handleSignIn = () => {
    const { name } = this.state;
    api
      .getUserByName(name)
      .then(user => {
        this.props.updateUser(user);
      })
      .catch(() => {
        this.setState({ err: 'User not found.' });
      });
  };

  handleSignUp = () => {
    const { name } = this.state;
    api
      .postUser(name)
      .then(() => {
        this.handleSignIn();
      })
      .catch(() => {
        this.setState({ err: 'User name is taken.' });
      });
  };
}

export default Login;

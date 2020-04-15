import React, { Component } from 'react';
import * as api from '../api';

class HostGame extends Component {
  state = {
    title: '',
  };

  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter game title:{' '}
          <input
            type="text"
            id="title-input"
            onChange={this.handleChange}
            value={title}
          />
        </label>
        <button>Host game</button>
      </form>
    );
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ title: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title } = this.state;
    const { user_id } = this.props;
    api.hostGame({ title, host_id: user_id });
  };
}

export default HostGame;

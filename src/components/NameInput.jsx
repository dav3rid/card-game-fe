import React, { Component } from 'react';

class NameInput extends Component {
  state = {
    name: '',
  };
  render() {
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
        </form>
      </div>
    );
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ name: '' });
    this.props.updateDetails(this.state.name);
  };
}

export default NameInput;

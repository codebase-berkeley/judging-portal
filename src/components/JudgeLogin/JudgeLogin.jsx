import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './JudgeLogin.css';

const options = ['Parth', 'Lawrence', 'Julia', 'Andrew', 'Anant', 'Kris', 'Jaijeet'];

class JudgeLogin extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            curr_password: '',
            logininfo: []
        };
        this._onSelect = this._onSelect.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    _onSelect(option) {
        this.setState({ selected: option });
    }

    handlePassword(event) {
        this.setState({
          curr_password: event.target.value
        });
    }

    submitLogin() {
        console.log(this.state.curr_password);
        this.setState({
            logininfo: this.state.logininfo.concat([
                [this.state.curr_password, this.state.selected.label]
            ]),
            curr_password: '',
            selected: ''
          });
    }

    render() {
        const defaultOption = this.state.selected;
        return (
            <div className="j-login-container">
                <div className="j-login-title">LOGIN</div>

                <div className="j-login-dropdown">
                <Dropdown
                  options={options}
                  onChange={this._onSelect}
                  value={defaultOption}
                  placeholder="Name"
                />
                </div>

                <input
                className="j-login-name"
                placeholder="Password"
                value={this.state.curr_password}
                onChange={this.handlePassword}
                type="password"
                />

                <button
                className="j-login-button"
                type="button"
                onClick={this.submitLogin}
                >
                LOGIN
                </button>
            </div>
            
        )
    }
}

export default JudgeLogin;
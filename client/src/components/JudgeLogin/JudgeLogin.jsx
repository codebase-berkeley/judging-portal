import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './JudgeLogin.css';
import { constants } from 'fs';

class JudgeLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selected: '',
            id: '',
            dict: {},
            curr_password: '',
            logininfo: []
        } 
        this._onSelect = this._onSelect.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.routeToNext = this.routeToNext.bind(this);
    }

    async componentDidMount() {
        const res = await fetch(`/api/judgenames`);
        const res_json = await res.json();
        let pairs = {}
        let names = []
        for (let i = 0; i < res_json.length; i++) {
                names.push(res_json[i].name);
                pairs[res_json[i].name] = res_json[i].judgeid;
        }
        this.setState({ 
            options: names,
            dict: pairs
         });
    }

    routeToNext() {
        this.props.history.push({
            pathname: '/instructions',
            state: {
                judgeId: this.state.id
            }
        });
    }

    _onSelect(option) {
        this.setState({ 
            id: this.state.dict[option.value],
            selected: option.value
        });
    }

    handlePassword(event) {
        this.setState({
          curr_password: event.target.value
        });
    }

    submitLogin() {
        this.setState({
            logininfo: this.state.logininfo.concat([
                [this.state.selected.label, this.state.curr_password]
            ]),
            curr_password: '',
            selected: ''
          });
    }

    render() {
        const defaultOption = this.state.selected;
        return (
            <div className="j-login-container">
                <div className="j-login-components">
                    <div className="j-login-title">CALHACKS 6.0</div>

                    <div className="j-login-dropdown">
                    <Dropdown
                    options={this.state.options}
                    onChange={this._onSelect}
                    value={defaultOption}
                    placeholder="Name"
                    />
                    </div>

                    <input
                    className="j-login-password"
                    placeholder="Password"
                    value={this.state.curr_password}
                    onChange={this.handlePassword}
                    type="password"
                    />

                    <button
                    className="j-login-button"
                    type="button"
                    onClick={(event) => {this.submitLogin(event); this.routeToNext();}}
                    >
                    LOGIN
                    </button>
                </div>
            </div>
            
        )
    }
}

export default JudgeLogin;
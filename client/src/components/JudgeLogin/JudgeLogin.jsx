import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './JudgeLogin.css';

class JudgeLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            APIdata: [],
            selected: '',
            curr_password: '',
            logininfo: []
        };
        this._onSelect = this._onSelect.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.routeToNext = this.routeToNext.bind(this);
    }

    componentDidMount() {
        this.getJudgeName().then(result => this.setState({
            APIdata: result.name
        }))
    }

    async getJudgeName() {
        let res = await fetch('/api/judgenames');
        let res_json = res.json();
        console.log(res_json);
        console.log(res_json);
        let name = [];
        for (let i = 0; i < res_json.length; i++) {
            name.push(res_json[i].name);
        }
        console.log(name);
        return name
    }

    routeToNext() {
        let path = "/instructions";
        this.props.history.push(path);
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
        this.setState({
            logininfo: this.state.logininfo.concat([
                [this.state.selected.label, this.state.curr_password]
            ]),
            curr_password: '',
            selected: ''
          });
          console.log(this.state.logininfo);
    }

    render() {
        const defaultOption = this.state.selected;
        return (
            <div className="j-login-container">
                <div className="j-login-components">
                    <div className="j-login-title">CALHACKS 6.0</div>

                    <div className="j-login-dropdown">
                    <Dropdown
                    options={this.state.APIdata}
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
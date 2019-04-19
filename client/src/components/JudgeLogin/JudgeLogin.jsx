import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './JudgeLogin.css';

class JudgeLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selected: '',
            judgeId: '',
            dict: {},
            curr_password: '',
            logininfo: []
        };
        this._onSelect = this._onSelect.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.routeToNext = this.routeToNext.bind(this);
    }

    async componentDidMount() {
        const res = await fetch(`/api/judgenames`);
        const resJson = await res.json();
        const pairs = {}
        const names = []
        for (let i = 0; i < resJson.length; i += 1) {
                names.push(resJson[i].name);
                pairs[resJson[i].name] = resJson[i].judgeid;
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
                judgeId: this.state.judgeId
            }
        });
    }

    _onSelect(option) {
        this.setState((prevState) => { 
            const id = prevState.dict[option.value];
            return {
                judgeId: id,
                selected: option.value
            }
        });
    }

    handlePassword(event) {
        this.setState({
          curr_password: event.target.value
        });
    }

    submitLogin() {
        this.setState((prevState) => {
            const newlogininfo = prevState.logininfo.concat([
                [prevState.selected.label, prevState.curr_password]
            ])
            return {
                logininfo: newlogininfo,
                curr_password: '',
                selected: ''
            }
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
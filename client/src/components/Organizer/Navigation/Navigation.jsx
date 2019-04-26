import React, { Component } from 'react';
import '../OrganizerPortal.css';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <div className="page-background">
        <div className="nav-container">
          <div className="nav-title">NAVIGATE TO</div>
            <ul className="nav-list">
                <li><Link className="nav-link" to='/data-entry'>DATA ENTRY</Link></li>
                <li><Link className="nav-link" to='/judge-info'>JUDGE INFORMATION</Link></li>
                <li><Link className="nav-link" to='/project-breakdown'>PROJECT BREAKDOWN</Link></li>
                <li><Link className="nav-link" to='/hacker-spreadsheet'>HACKER SPREADSHEET</Link></li>
                <li><Link className="nav-link" to='/winners'>WINNERS</Link></li>
            </ul>
        </div>
      </div>
    );
  }
}
export default Navigation;
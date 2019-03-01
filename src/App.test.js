/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import JudgeName from './JudgeName';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JudgeName />, div);
  ReactDOM.unmountComponentAtNode(div);
});

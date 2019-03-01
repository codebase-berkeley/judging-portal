/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import JudgeInput from './JudgeInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JudgeInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/* eslint-disable */
import React, { Component } from 'react';

import './App.css';

import CategoryInput from './components/Organizer/CategoryInput/CategoryInput';
import DataEntry from './components/Organizer/DataEntry/DataEntry';
import JudgeInfo from './components/Organizer/JudgeInfo/JudgeInfo';
import JudgeLogin from './components/JudgeLogin/JudgeLogin';

class App extends Component {

  // changeActive(event){
  //   var header = document.getElementById("dot-navbar");
  //   var dots = header.getElementsByClassName("dot");
  //   for (var i = 0; i < dots.length; i++) {
  //     dots[i].addEventListener("click", function() {
  //       var current = document.getElementsByClassName("active");
  //       current[0].className = current[0].className.replace(" active", "");
  //       this.className += " active";
  //     });
  //   }
  // }

  render() {
    return (
      <div className="App">
        <hr/>
        <div className="dot-navbar">
            <nav>
                <ul>
                    <a href="#CategoryInput" className="dot active"/>
                    <a href="#DataEntry" className="dot"/>
                    <a href="#JudgeInfo" className="dot"/>
                    <a href="#CategoryInput" className="dot"/>
                </ul>
            </nav>
        </div>
      	<CategoryInput />
        <DataEntry />
        <JudgeInfo />
        <JudgeLogin />
      </div>
    );
  }
}

export default App;

import { Component, useState, useEffect } from 'react';
import firebase from './firebase.js';
import Goals from './Goals.js';
import AddGoals from './AddGoals.js';
import './App.scss';
require("firebase/auth");

//define global variables
const GOAL = 'GOAL';
const ADDGOAL = 'ADDGOAL';

class App extends Component{  
  constructor(){
    
    super();
    this.state = {
      currentComponent:GOAL,
      currentGoal: {},
      userId:''    
    };
    
    this.updateGoal = this.updateGoal.bind(this);
    this.showComponent = this.showComponent.bind(this);

    // create a unique user id that will help to have own list of goals
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let userId = user.uid;
        this.setState({
          userId:userId
        })
      } 
    });
  }
  
// function that displays component
  showComponent(name){
    // to close hamburger menu on click
    let menu = document.getElementById("toggle-menu");
    menu.checked = false
    this.setState({
      currentComponent:name
    })  
    
    // document.getElementById("navbar").style.display = "none";  
  }
 
  // create function that passes goalObj with id that passes data back to the form 
  updateGoal(goal){
    this.setState({
      currentGoal: goal
    })
    this.showComponent(ADDGOAL);
  }

  render(){    
    return (
      <div className="App">
        <div className="appMain appWrapper">
          <div className="sideSection">
            <input type="checkbox" id="toggle-menu" className="toggle-menu" />
            <div className="hamburger"></div>
            <ul className="menu">
              <li className="userBox">
                <div className="goalQuote">
                  <p>Dreams don't work unless you do.</p>
                </div>
              </li>
              <li className="goalBox">
                <button onClick={() => this.showComponent(GOAL)}>
                  <span>My goal list</span>
                </button>
              </li>
              <li className="addGoalBox">
                <button
                  id="addGoalButton"
                  onClick={() => this.showComponent(ADDGOAL)}
                >
                  <span>Add new goal</span>
                </button>
              </li>
              <li className="logoutBox"></li>
            </ul>
          </div>
          <div className="mainSection">
            {this.state.currentComponent === GOAL && this.state.userId && (
              <Goals
                userId={this.state.userId}
                updateGoal={(goal) => this.updateGoal(goal)}
                displayGoals={() => this.showComponent(GOAL)}
              />
            )}
            {this.state.currentComponent === ADDGOAL && (
              <AddGoals
                userId={this.state.userId}
                currentGoal={this.state.currentGoal}
                displayGoals={() => this.showComponent(GOAL)}
              />
            )}
          </div>
        </div>
      </div>
    );
  } 
}

export default App;

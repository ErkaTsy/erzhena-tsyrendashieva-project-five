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
  
 
  showComponent(name){
    this.setState({
      currentComponent:name
    })
  }
  
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
            <div className="userBox">
              <div className="goalQuote">
                <blockquote><p>Dreams don't work unless you do.</p></blockquote>
              </div>
            </div>
            <div className="goalBox">
              <button onClick={() => this.showComponent(GOAL)}>
                <span>My goal list</span>
              </button>
            </div>
            <div className="addGoalBox">
              <button onClick={() => this.showComponent(ADDGOAL)}>
                <span>Add new goal</span>
              </button>
            </div>
            <div className="logoutBox">
              <div className="webAuthor">
                <span>Build by E.T.</span>
              </div>
            </div>
          </div>
          <div className="mainSection">
            {this.state.currentComponent === GOAL&& this.state.userId && (
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

import { Component, useState } from 'react';
import firebase from './firebase.js';
import Goals from './Goals.js';
import AddGoals from './AddGoals.js';
import './App.css';

//define global variables
const GOAL = 'GOAL';
const ADDGOAL = 'ADDGOAL';

class App extends Component{
  constructor(){
    super();
    this.state = {
      currentComponent:GOAL
    };

    this.showComponent = this.showComponent.bind(this);
  }
  
  showComponent(name){
    this.setState({
      currentComponent:name
    })
  }
  

  render(){  
    const { goals} =this.state;
  
    return (
      <div className="App">
        <div className="App-wrapper App-main">
          <div className="Side-section">
            <button>userAccount</button>
            <button onClick={() => this.showComponent(ADDGOAL)}>Add your goal</button>
           
          </div>
          <div className="Main-section">
            {this.state.currentComponent === GOAL && <Goals />}
            {this.state.currentComponent === ADDGOAL && <AddGoals displayGoals={()=>this.showComponent(GOAL)}/>}
          </div>
        </div>
      </div>
    );
  } 
}

export default App;

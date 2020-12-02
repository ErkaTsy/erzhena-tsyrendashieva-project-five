import { Component, useState} from 'react';
import firebase from "./firebase.js";

class Goals extends Component {
  constructor() {
    super();
    this.state = {
      // goalId: [],
      goals: [],
      // goalName: "",
      // goalDeadline: "",
      // goalNote: "",
    };
  }

  componentDidMount() {
    // make a reference to the database
    const dbRef = firebase.database().ref();
    // get data from the database
    dbRef.on("value", (data) => {
      const firebaseDataObj = data.val();
      console.log(firebaseDataObj, "states property");

      const newGoals = Object.keys(firebaseDataObj).map((key) => {
        return { ...firebaseDataObj[key], id: key }; //pass key as variable id to the newGoals object
      });
      this.setState({
        goals: newGoals,
      });
      console.log(newGoals, "states property");
    });
  }
  // function that deletes goal from the db
  removeGoal = (goalId) => {
    const dbRef = firebase.database().ref();
    dbRef.child(goalId).remove();
  };

  // function that updates goals
  updateGoal = (goalId) => {
    
  };

  render() {
    return (
      <div>
        <h1>Here are goal lists</h1>
        <ul className="displayedGoals">
          {this.state.goals.map((goal, index) => {
            return (
              <li key={index}>
                <div className="goalName">
                  <span>Name of goal:</span>
                  <p>{goal.goalName}</p>
                </div>
                <div className="goalDeadLn">
                  <span>Deadline:</span>
                  <p>{goal.goalDeadline}</p>
                </div>
                <div className="goalDeadLn">
                  <span>Note:</span>
                  <p>{goal.goalNote}</p>
                </div>
                <button
                  onClick={() => {
                    this.updateGoal(goal.id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    this.removeGoal(goal.id);
                  }}
                >
                  Delete
                </button>
                <button>Accomplished</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default Goals;
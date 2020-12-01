import { Component, useState} from 'react';
import firebase from "./firebase.js";

class Goals extends Component {
  constructor() {
    super();
    this.state = {
      goals: []
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
      // console.log(firebaseDataObj);
      // make an empty array 

      const newGoals = Object.keys(firebaseDataObj).map((key) => firebaseDataObj[key]);
      // console.log(newGoals);
      this.setState(
        {
          goals: newGoals
        }
      )
        console.log(this.state.goals, "states property");
       })
  }

  render() {
    return (
      <div>
        <h1>Here are goal lists</h1>
        <ul>
          {this.state.goals.map((goal, index) => {
            return (
              <li key={index}>
                <p>{goal.goalName}</p>
                <p>{goal.goalDeadline}</p>
                <p>{goal.goalNote}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default Goals;
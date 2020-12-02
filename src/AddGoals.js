import { Component, useState } from "react";
import firebase from './firebase.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Goals from './Goals.js';

class AddGoals extends Component {
  constructor() {
    super();
    this.state = {
        goalName: "",
        goalDeadline: new Date(),
        goalNote: ""
    };
    this.formSubmitNewGoal = this.formSubmitNewGoal.bind(this);
  }

   

  componentDidMount() {
    // make a reference to the database
    const dbRef = firebase.database().ref();
    // get data from
    
    // console.log(this.props.displayGoals, "props");
  }

  //create function that changes date was selected by user
  setGoalDeadline(date) {
    this.setState({
      goalDeadline: date
    });
  }

  addNewGoal = (e) => {
    e.preventDefault(); 
    // convert date to dd/mm/yyyy 
    let date = 
      this.state.goalDeadline.getDate() +
      "/" +
      parseInt(this.state.goalDeadline.getMonth() + 1) +
      "/" +
      this.state.goalDeadline.getFullYear();

    const dbRef = firebase.database().ref();
    const userNewGoal = {
      goalName: this.state.goalName,
      goalDeadline: date,
      goalNote: this.state.goalNote,
    };    
    dbRef.push(userNewGoal);
    
    this.props.displayGoals();
  };

  //form submition
  formSubmitNewGoal = (e) => {
    this.setState({
      userNewGoal: e.target.value
    });
    
  };

  render() {
    return (
      <div className="add-goals-container">
        <form onChange={this.formSubmitNewGoal}>
          <label htmlFor="newGoalName">Name of your goal</label>
          <input
            type="text"
            id="newGoalName"
            onChange={(event) =>
              this.setState({ goalName: event.target.value })
            }
          />
          <label htmlFor="goalDeadline">Deadline</label>
          <DatePicker
            selected={this.state.goalDeadline}
            onChange={(date) => this.setGoalDeadline(date)}
          />
          <label htmlFor="goalNote">Note</label>
          <textarea
            onChange={(event) =>
              this.setState({ goalNote: event.target.value })
            }
          ></textarea>
          <button onClick={this.addNewGoal}>Add new goal</button>
        </form>
      </div>
    );
  }
}

export default AddGoals;
import { Component, useState } from "react";
import firebase from './firebase.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class AddGoals extends Component {
  constructor() {
    super();
    this.state = {
      goalName: "",
      goalDeadline: "",
      goalNote: "",
      selectedDate: new Date(),
      userNewGoal: ''
    };
  }

  componentDidMount() {
    // make a reference to the database
    const dbRef = firebase.database().ref();
    // get data from
  }

//create function that changes date was selected by user
  setSelectedDate(date) {
    this.setState({
      selectedDate: date,
    });
  }

  addNewGoal = (e) => {
    e.preventDefault();
     const dbRef = firebase.database().ref();
     dbRef.push(this.state.userNewGoal);   
  };

  inputNewGoal = (e) =>{
    this.setState({
        userNewGoal: e.target.value,
    });
  }

  render() {
    return (
      <div className="add-goals-container">
        <form onChange={this.inputNewGoal}>
          <label htmlFor="newGoalName">Name of your goal</label>
          <input type="text" id="newGoalName" />
          <label htmlFor="goalDeadline">Deadline</label>
          <DatePicker
            selected={this.state.selectedDate}
            onChange={(date) => this.setSelectedDate(date)}
          />
          <label htmlFor="goalNote">Note</label>
          <textarea></textarea>
          <button onClick={this.addNewGoal}>Add new goal</button>
        </form>
      </div>
    );
  }
}

export default AddGoals;
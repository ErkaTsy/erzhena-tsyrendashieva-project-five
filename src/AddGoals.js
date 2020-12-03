import { Component } from "react";
import firebase from './firebase.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Goals from './Goals.js';

const ADD = 'ADD';
const UPDATE = 'UPDATE';

class AddGoals extends Component {
  constructor() {
    super();
    this.state = {
        goalView: ADD,
        goalId: "",
        goalName: "",
        goalDeadline: new Date(),
        goalNote: ""
    };
    this.formSubmitNewGoal = this.formSubmitNewGoal.bind(this);
  }

   

  componentDidMount() {
    // check if goal object is not empty, if it not empty do something
    if (Object.keys(this.props.currentGoal).length !== 0 && this.props.currentGoal.constructor === Object){    
    // split "/" from the deadline date for converting string to the object
    let dateParts = this.props.currentGoal.goalDeadline.split("/");
    // save goal that user wants to update
    let goalId = this.props.currentGoal.id;
    let goalName = this.props.currentGoal.goalName;
    let goalDeadline = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);    
    let goalNote = this.props.currentGoal.goalNote;
    // console.log(goalDeadline,'goalDeadline from current');
    this.setState({  
      goalView: UPDATE,   
      goalId: goalId,
      goalName: goalName,
      goalDeadline: goalDeadline,
      goalNote: goalNote
    })

  }
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
    // make a reference to the database
    const dbRef = firebase.database().ref();
    const userNewGoal = {
      goalName: this.state.goalName,
      goalDeadline: date,
      goalNote: this.state.goalNote
    };  

    // console.log(userNewGoal, "check the username goal")
    dbRef.push(userNewGoal);
    
    this.props.displayGoals();
  };

  //form submition
  formSubmitNewGoal = (e) => {
    this.setState({
      userNewGoal: e.target.value
    });    
  };

  //update goal
  editCurrentGoal = (goalId) =>{
    // convert date to dd/mm/yyyy 
    // let date =
    //   this.state.goalDeadline.getDate() +
    //   "/" +
    //   parseInt(this.state.goalDeadline.getMonth() + 1) +
    //   "/" +
    //   this.state.goalDeadline.getFullYear();
    const dbRef = firebase.database().ref();
    dbRef.child(goalId).update({
      goalName: this.state.goalName,
      goalDeadline: this.state.goalDeadline,
      goalNote: this.state.goalNote
    });
  }
  
  render() {
    return (
      <div className="add-goals-container">
        <form onChange={this.formSubmitNewGoal}>
          <label htmlFor="newGoalName">Name of your goal</label>
          <input
            type="text"
            id="newGoalName"
            value={this.state.goalName}
            onChange={(event) =>
              this.setState({ goalName: event.target.value })
            }
          />
          <label htmlFor="goalDeadline">Deadline</label>
          <DatePicker
            selected={this.state.goalDeadline}
            value={this.state.goalDeadline}
            onChange={(date) => this.setGoalDeadline(date)}
          />
          <label htmlFor="goalNote">Note</label>
          <textarea
            value={this.state.goalNote}
            onChange={(event) =>
              this.setState({ goalNote: event.target.value })
            }
          ></textarea>
          {this.state.goalView === ADD && <button onClick={this.addNewGoal}>Add new goal</button>}
          {this.state.goalView === UPDATE && <button onClick={ () => {this.editCurrentGoal(this.state.goalId)}}>Update goal</button>}
         
        </form>
      </div>
    );
  }
}

export default AddGoals;
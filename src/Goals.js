import { Component } from 'react';
import firebase from "./firebase.js";

class Goals extends Component {
  constructor() {
    super();
    this.state = {
      goals: [],
      active: [],
      dbRef: null,
      achieved: false
    };
    console.log(this.state.active, "ttt");
  }

  componentDidMount() {
    console.log("tripp", this.props.userId);
    // make a reference to the database by user
    const dbRef = firebase.database().ref("users/" + this.props.userId);
    this.setState({
      dbRef: dbRef,
    });
    // get data from the database
    dbRef.on("value", (data) => {
      const firebaseDataObj = data.val(); // get by userId obj
      if (firebaseDataObj) {
        const newGoals = Object.keys(firebaseDataObj).map((key) => {
          return { ...firebaseDataObj[key], id: key }; //pass key as variable id to the newGoals object
        });
        this.setState({
          goals: newGoals,
        });
      } else {
        this.setState({
          goals: [],
        });
      }
    });
  }

  // function that deletes goal from the db
  removeGoal = (goalId) => {
    const dbRef = firebase.database().ref("users/" + this.props.userId);
    dbRef.child(goalId).remove();
  };

  // function that updates goals
  updateGoal = (goal) => {
    this.props.updateGoal(goal);
  };

  achieveGoal = (id) => {
    this.setState({
      achieved: true
    })
    let oneGoalElement = document.getElementById(id + "oneGoal");
    oneGoalElement.style.background = "#FE0000FF";
  }

  // show the more goal info
  handleShow = (event, id) => {
    event.stopPropagation();
    let goalNameElement = document.getElementById(id + "goalName");
    let fullGoalInfoElement = document.getElementById(id + "fullGoalInfo");

    if (goalNameElement.style.display === "none") {
      goalNameElement.style.display = "block";
      fullGoalInfoElement.style.display = "none";
    } else {
      goalNameElement.style.display = "none";
      fullGoalInfoElement.style.display = "block";
    }
  };

  render() {
    return (
      <div className="goalContainer">
        <h1>My goal list</h1>
        <div className="moreGoalInfoButton clearfix">
          <ul>
            {this.state.goals.map((goal, index) => {
              return (
                <li
                  onClick={(e) => this.handleShow(e, goal.id)}
                  id={goal.id + "oneGoal"}
                  className="oneGoal"
                  key={goal.id}
                >
                  <div id={goal.id + "goalName"} className="goalName">
                    <li>
                      <h4>{goal.goalName}</h4>
                    </li>
                    <li>
                      <p>Read more</p>
                    </li>
                  </div>

                  <div
                    id={goal.id + "fullGoalInfo"}
                    className="fullGoalInfo hide"
                  >
                    <li>
                      <span>Goal Name:</span>
                    </li>
                    <li>
                      <p>{goal.goalName}</p>
                    </li>
                    <li>
                      <span>Deadline:</span>
                    </li>
                    <li>
                      <p>{goal.goalDeadline}</p>
                    </li>
                    <li>
                      <span>Note:</span>
                    </li>
                    <li>
                      <p>{goal.goalNote}</p>
                    </li>

                    <button
                      onClick={() => {
                        this.updateGoal(goal);
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
                    <button
                      onClick={() => {
                        this.achieveGoal(goal.id);
                      }}
                    >
                      Done
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default Goals;
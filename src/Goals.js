import { Component } from 'react';
import firebase from "./firebase.js";

class Goals extends Component {
  constructor() {
    super();
    this.state = {
      goals: []
    };
  }

  componentDidMount() {
    // make a reference to the database
    const dbRef = firebase.database().ref();
    // get data from the database
    dbRef.on("value", (data) => {      
      const firebaseDataObj = data.val();
      if (firebaseDataObj){
        const newGoals = Object.keys(firebaseDataObj).map((key) => {
          return { ...firebaseDataObj[key], id: key }; //pass key as variable id to the newGoals object
        });
        this.setState({
          goals: newGoals,
        });
      }else{
        return null;
      }

      
    });
  }
  // function that deletes goal from the db
  removeGoal = (goalId) => {
    const dbRef = firebase.database().ref();
    console.log("remove here", goalId)
    dbRef.child(goalId).remove();    
  };

  // function that updates goals
  updateGoal = (goal) =>{
    this.props.updateGoal(goal);
  };

  render() {
    return (
      <div>
        <h1>Here are goal lists</h1>
        <ul className="displayedGoals">
          {this.state.goals.map((goal) => {
            return (
              
              <li key={goal.id}>
                {/* <div className="toggleBar">

                </div> */}
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
                <button >Accomplished</button>
              </li> 
                                         
            );
          })}
        </ul>
      </div>
    );
  }
}
export default Goals;
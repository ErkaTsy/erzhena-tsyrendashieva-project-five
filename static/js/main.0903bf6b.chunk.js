(this["webpackJsonperzhena-tsyrendashieva-project-five"]=this["webpackJsonperzhena-tsyrendashieva-project-five"]||[]).push([[0],{135:function(e,t,a){},137:function(e,t,a){"use strict";a.r(t);var n=a(5),c=a(6),o=a.n(c),s=a(29),r=a.n(s),i=(a(67),a(19)),l=a(20),u=a(32),d=a(25),j=a(24),p=a(49);a(68);p.a.initializeApp({apiKey:"AIzaSyA5rvQYwW9E00UGAAj8f0IxOQdkHbKgdFA",authDomain:"goal-tracker-app-53782.firebaseapp.com",databaseURL:"https://goal-tracker-app-53782.firebaseio.com",projectId:"goal-tracker-app-53782",storageBucket:"goal-tracker-app-53782.appspot.com",messagingSenderId:"747924635501",appId:"1:747924635501:web:4e5f0c23821f043ace2464"});var h=p.a,b=function(e){Object(d.a)(a,e);var t=Object(j.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).state={goals:[]},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;h.database().ref().on("value",(function(t){var a=t.val(),n=Object.keys(a).map((function(e){return a[e]}));e.setState({goals:n}),console.log(e.state.goals,"states property")}))}},{key:"render",value:function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)("h1",{children:"Here are goal lists"}),Object(n.jsx)("ul",{children:this.state.goals.map((function(e,t){return Object(n.jsxs)("li",{children:[Object(n.jsx)("p",{children:e.goalName}),Object(n.jsx)("p",{children:e.goalDeadline}),Object(n.jsx)("p",{children:e.goalNote})]},t)}))})]})}}]),a}(c.Component),O=a(59),f=a.n(O),m=(a(72),function(e){Object(d.a)(a,e);var t=Object(j.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).addNewGoal=function(t){t.preventDefault(),h.database().ref().push(e.state.userNewGoal)},e.inputNewGoal=function(t){e.setState({userNewGoal:t.target.value})},e.state={goalName:"",goalDeadline:"",goalNote:"",selectedDate:new Date,userNewGoal:""},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){h.database().ref()}},{key:"setSelectedDate",value:function(e){this.setState({selectedDate:e})}},{key:"render",value:function(){var e=this;return Object(n.jsx)("div",{className:"add-goals-container",children:Object(n.jsxs)("form",{onChange:this.inputNewGoal,children:[Object(n.jsx)("label",{htmlFor:"newGoalName",children:"Name of your goal"}),Object(n.jsx)("input",{type:"text",id:"newGoalName"}),Object(n.jsx)("label",{htmlFor:"goalDeadline",children:"Deadline"}),Object(n.jsx)(f.a,{selected:this.state.selectedDate,onChange:function(t){return e.setSelectedDate(t)}}),Object(n.jsx)("label",{htmlFor:"goalNote",children:"Note"}),Object(n.jsx)("textarea",{}),Object(n.jsx)("button",{onClick:this.addNewGoal,children:"Add new goal"})]})})}}]),a}(c.Component)),g=(a(135),"GOAL"),v="ADDGOAL",x=function(e){Object(d.a)(a,e);var t=Object(j.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).state={currentComponent:g},e.showComponent=e.showComponent.bind(Object(u.a)(e)),e}return Object(l.a)(a,[{key:"showComponent",value:function(e){this.setState({currentComponent:e})}},{key:"render",value:function(){var e=this;this.state.goals;return Object(n.jsx)("div",{className:"App",children:Object(n.jsxs)("div",{className:"App-wrapper App-main",children:[Object(n.jsxs)("div",{className:"Side-section",children:[Object(n.jsx)("button",{children:"userAccount"}),Object(n.jsx)("button",{onClick:function(){return e.showComponent(v)},children:"Add your goal"})]}),Object(n.jsxs)("div",{className:"Main-section",children:[this.state.currentComponent===g&&Object(n.jsx)(b,{}),this.state.currentComponent===v&&Object(n.jsx)(m,{})]})]})})}}]),a}(c.Component),N=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,141)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,o=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),o(e),s(e)}))};r.a.render(Object(n.jsx)(o.a.StrictMode,{children:Object(n.jsx)(x,{})}),document.getElementById("root")),N()},67:function(e,t,a){}},[[137,1,2]]]);
//# sourceMappingURL=main.0903bf6b.chunk.js.map
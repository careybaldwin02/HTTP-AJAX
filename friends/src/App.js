import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Friends from './components/Friends';
import AddFriend from './components/AddFriend';


class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      name: '',
      age: '',
      email: '',
      showUpdatedFriend: false
    };
  }

componentDidMount() {
    this.getFriends();
  }


  getFriends = () => {
    axios
    .get('http://localhost:5000/friends')
    .then((response) => this.setState({friends: response.data }))
    .catch(error => console.error(error))
  }

inputHandler = event => {
  this.setState({ [event.target.name]:  event.target.value })
}

submitHandler = () => {
  const friend = {
    name: this.state.name, 
    age: this.state.age, 
    email: this.state.email }

  axios
    .post('http://localhost:5000/friends', friend)
    .then(response => this.setState({ friends: response.data, name: '', age: '', email: '' }))
    .catch(err => console.log(err));
}

updateHandler = (friendId) => {
    const friend = {};
    if (this.state.name !== "" ){
      friend.name = this.state.name;
    }
    if (this.state.name !== "" ){
      friend.age = this.state.age;
    }
    if (this.state.name !== "" ){
      friend.age = this.state.age;
    }
  axios
    .put(`http://localhost:5000/friends/${friendId})`, friend) 
    .then (response => {
      this.setState({ showUpdatedFriend: false, name: '', age: '', email: '' });
      this.setState({friends: response.data})
    }) 
    .catch(err => {
      console.log(err);
    });
};

showUpdatedFriend = () => {
  this.setState({showUpdatedFriend: !this.state.showUpdatedFriend })
}

deleteHandler = (friendId) => {
  axios
    .delete(`http://localhost:5000/friends/${friendId}`)
    .then (response => { 
      this.setState({friends: response.data})
     })
    .catch(err => console.log(err));
}

  render() {
    return (
      <div className="App">
        <h1>
          ( Friends )
        <AddFriend inputHandler = {this.inputHandler} 
        onClick = {this.submitHandler}
        name = {this.state.name} 
        age = {this.state.age}
        email = {this.state.email} 
        />
        </h1>
        <Friends friends = {this.state.friends} deleteFriend = {this.deleteHandler}/>
      </div>
    );
  }
}

export default App


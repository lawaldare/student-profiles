import React, { Component } from 'react';
import ProfileLists from './ProfileLists';

class App extends Component {
  handleFormSubmit = text => {};
  render() {
    return (
      <div className="container" style={{ marginTop: '30px' }}>
        <ProfileLists />
      </div>
    );
  }
}

export default App;

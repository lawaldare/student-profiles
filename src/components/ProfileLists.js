import React, { Component } from 'react';
import axios from 'axios';
import Profile from './Profile';

export default class ProfileLists extends Component {
  state = {
    name: '',
    tag: '',
    profiles: [],
    isLoaded: false
  };

  componentDidMount = async () => {
    const response = await axios.get(
      'https://www.hatchways.io/api/assessment/students'
    );
    this.setState({
      isLoaded: true,
      profiles: response.data.students
    });
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleTagChange = e => {
    this.setState({ tag: e.target.value });
  };

  render() {
    const { profiles, isLoaded } = this.state;

    let filteredProfiles = profiles.filter(profile => {
      profile.name = `${profile.firstName} ${profile.lastName}`;
      return (
        profile.name.toLowerCase().indexOf(this.state.name.toLowerCase()) !== -1
      );
    });

    // const tagged = profiles.map(person => {
    //   return person.tags.filter(t => {
    //     return t.tag.toLowerCase().indexOf(this.state.tag.toLowerCase()) !== -1;
    //   });
    // });

    if (!isLoaded) {
      return (
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle" />
            </div>
            <div class="gap-patch">
              <div class="circle" />
            </div>
            <div class="circle-clipper right">
              <div class="circle" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <form>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="search-input"
                  type="text"
                  class="validate"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <label for="search-input" style={{ fontSize: '1.5rem' }}>
                  Search by Name
                </label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="tag-input"
                  type="text"
                  class="validate"
                  value={this.state.tag}
                  onChange={this.handleTagChange}
                />
                <label for="tag-input" style={{ fontSize: '1.5rem' }}>
                  Search by Tag
                </label>
              </div>
            </div>
          </form>
          <ul>
            {filteredProfiles.map(profile => {
              return <Profile profile={profile} key={profile.id} />;
            })}
            {/* {tagged.map(profile => {
              return <Profile profile={profile} key={profile.id} />;
            })} */}
          </ul>
        </div>
      );
    }
  }
}

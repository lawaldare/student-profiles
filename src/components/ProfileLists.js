import React, { Component } from 'react';
import axios from 'axios';
import Profile from './Profile';

export default class ProfileLists extends Component {
  state = {
    name: '',
    tag: '',
    tags: [],
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
    const { profiles, isLoaded, tags } = this.state;

    let filteredProfiles = profiles.filter(profile => {
      profile.name = `${profile.firstName} ${profile.lastName}`;
      return (
        profile.name.toLowerCase().indexOf(this.state.name.toLowerCase()) !== -1
      );
    });

    //console.log(filteredProfiles);

    let taggedProfiles = profiles.map(person => {
      person.tags = tags;
      //console.log(person.tags);

      return person.tags.filter(tag => {
        return tag.toLowerCase().indexOf(this.state.tag.toLowerCase()) !== -1;
      });
    });

    if (!isLoaded) {
      return (
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <form>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="search-input"
                  type="text"
                  className="validate"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <label htmlFor="search-input" style={{ fontSize: '1.5rem' }}>
                  Search by Name
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="tag-input"
                  type="text"
                  className="validate"
                  value={this.state.tag}
                  onChange={this.handleTagChange}
                />
                <label htmlFor="tag-input" style={{ fontSize: '1.5rem' }}>
                  Search by Tag
                </label>
              </div>
            </div>
          </form>
          <ul>
            {filteredProfiles.map(profile => {
              return <Profile profile={profile} key={profile.id} />;
            })}
            {/* {taggedProfiles.map(profile => {
              return <Profile profile={profile} key={profile.id} />;
            })} */}
          </ul>
        </div>
      );
    }
  }
}

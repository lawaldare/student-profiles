import React, { Component } from 'react';
import './ProfileLists.css';

export default class Profile extends Component {
  state = {
    tag: '',
    tags: [],
    showFullGrade: false
  };
  showGrade = () => {
    this.setState({
      showFullGrade: !this.state.showFullGrade
    });
  };

  handleChange = e => {
    this.setState({ tag: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newTag = this.state.tag;

    const updatedTags = [...this.state.tags, newTag];

    this.setState({
      tags: updatedTags,
      tag: ''
    });
  };
  render() {
    const avg = array => {
      let sum = array.reduce((a, b) => Number(a) + Number(b));
      return sum / array.length;
    };
    const { profile } = this.props;
    profile.name = `${profile.firstName} ${profile.lastName}`;

    const { showFullGrade, tags } = this.state;
    profile.tags = tags;

    return (
      <React.Fragment>
        <li className="box">
          <div className="img">
            <img src={profile.pic} alt="#" className="pic" />
          </div>
          <div className="info">
            <i className="fas fa-plus" onClick={this.showGrade} />
            <h2>{profile.name}</h2>
            <p>
              Email: {profile.email} <br />
              Company:{profile.company} <br />
              Skill:{profile.skill} <br />
              Average: {avg(profile.grades)}%
            </p>
            {showFullGrade ? (
              <React.Fragment>
                <ul className="grade">
                  <li>Test 1: &nbsp; &nbsp; {profile.grades[0]}%</li>
                  <li>Test 2: &nbsp; &nbsp; {profile.grades[1]}%</li>
                  <li>Test 3: &nbsp; &nbsp; {profile.grades[2]}%</li>
                  <li>Test 4: &nbsp; &nbsp; {profile.grades[3]}%</li>
                  <li>Test 5: &nbsp; &nbsp; {profile.grades[4]}%</li>
                  <li>Test 6: &nbsp; &nbsp; {profile.grades[5]}%</li>
                  <li>Test 7: &nbsp; &nbsp; {profile.grades[6]}%</li>
                  <li>Test 8: &nbsp; &nbsp; {profile.grades[7]}%</li>
                </ul>
                <br />
                {profile.tags.map((tag, index) => {
                  return (
                    <li key={index} className="tag">
                      {tag}
                    </li>
                  );
                })}
                <div class="row">
                  <div class="input-field col s12 m6">
                    <form onSubmit={this.handleSubmit}>
                      <input
                        id="tag-input"
                        type="text"
                        class="validate"
                        value={this.state.tag}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="tag-input">Add a tag</label>
                    </form>
                  </div>
                </div>
              </React.Fragment>
            ) : null}
          </div>
        </li>
      </React.Fragment>
    );
  }
}

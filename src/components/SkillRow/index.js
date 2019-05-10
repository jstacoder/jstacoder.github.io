import React, { Component } from 'react'

import Skill from '../Skill'

export default class SkillRow extends Component {
  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-4 col-md-push-1">
          <div className="row">
            {this.props.skills.map(skill => (
              <Skill name={skill.name} title={skill.title} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

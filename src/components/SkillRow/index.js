import React, { Component } from 'react'

import Skill from '../Skill'

export default class SkillRow extends Component {
  render() {
    return (
      <div className="row justify-content-md-center">
        {this.props.skills.map(skill => (
          <Skill name={skill.name} title={skill.title} />
        ))}
      </div>
    )
  }
}

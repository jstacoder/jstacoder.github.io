import React, { Component } from 'react'
import SkillRow from '../SkillRow'

export default class SkillList extends Component {
  state = {
    groups: [],
  }
  componentDidMount() {
    let groups = [[]]
    this.props.skills.forEach(skill => {
      const groupLength = groups.length
      const lastGroup = groups[groupLength - 1]
      const lastGroupLength = lastGroup.length
      let currGroup = lastGroup
      if (lastGroupLength === 4) {
        currGroup = []
      } else {
        groups.pop()
      }
      currGroup.push(skill)
      groups.push(currGroup)
    })
    this.setState({ groups })
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="col-lg-12">
            <h2 className="section-heading">MY SKILLS</h2>
            <hr className="border-white" />
          </div>
        </div>

        <div>
          <div className="col-lg-12">
            {this.state.groups.map(skills => (
              <SkillRow skills={skills} />
            ))}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

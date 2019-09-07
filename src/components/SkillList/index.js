import React, { Component } from 'react'
import SkillRow from '../SkillRow'

const SkillList = props => {
  const [groups, setGroups] = React.useState([[]])

  React.useEffect(() => {
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
    setGroups(groups)
  }, [])
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
          {groups.map(skills => (
            <SkillRow skills={skills} />
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default SkillList

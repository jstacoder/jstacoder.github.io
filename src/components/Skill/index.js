import React from 'react'
import Icon from '../Icon'

export default class Skill extends React.Component {
  render() {
    return (
      <div className="col-lg-3 col-6">
        <Icon title={this.props.title} name={this.props.name} />
      </div>
    )
  }
}

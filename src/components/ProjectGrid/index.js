import React from 'react'
import { Col, Row } from 'reactstrap'
import { ThemeContext } from '../../theme-context'
import RepoCard from 'components/repoCard'
// import styled from 'styled-components'

const ProjectGrid = ({ projects, title, subtitle }) => {
  const {
    state: { style },
  } = React.useContext(ThemeContext)

  return (
    <>
      <h2 className={style === 'dark' ? 'text-white' : ''}>{title}</h2>
      <p className={`f5 mb-4 ${style === 'dark' ? 'text-white' : 'text-gray'}`}>
        {subtitle}
      </p>
      <div className="d-sm-flex flex-wrap gutter-condensed mb-4">
        {projects.nodes.map((repository, i) => (
          <Col sm={6} md={12} lg={6} xl={4} className={'mb-3'} key={i}>
            <RepoCard repository={repository} />
          </Col>
        ))}
      </div>
    </>
  )
}

export default ProjectGrid

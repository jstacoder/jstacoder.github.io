import { graphql } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'
import React from 'react'

import { siteMetadata } from '../../gatsby-config'
import Layout from 'components/Layout'
import Meta from 'components/Meta'
import SkillList from 'components/SkillList'

export default class Profile extends React.Component {
  render() {
    const { location, data } = this.props
    const profile = get(data, 'profile.childImageSharp.fixed')
    const work1 = get(data, 'work1.childImageSharp.sizes')
    const work2 = get(data, 'work2.childImageSharp.sizes')
    const back1 = get(data, 'back1.childImageSharp.sizes')
    const back2 = get(data, 'back2.childImageSharp.sizes')
    const skills = get(data, 'skills.nodes')
    const repos = get(data, 'github.viewer.repoList.repos')

    return (
      <Layout location={location}>
        <Meta site={siteMetadata} title="Profile" />
        <div>
          <section className="text-center">
            <div className="container">
              <Img fixed={profile} className="rounded-circle" />
              <h1>jstacoder</h1>
              <p className="lead text-muted">Full Stack Engineer.</p>
              <div>
                <a
                  ref="twButton"
                  href="https://twitter.com/amigodornot666"
                  className="twitter-follow-button"
                  data-show-count="false"
                >
                  Follow @amigodornot666
                </a>
              </div>
            </div>
          </section>

          <section className="bg-primary text-white text-center">
            <SkillList skills={skills} />
          </section>

          <section id="features" className="text-center jumboimage">
            <Img sizes={back1} className="cover-image" />
            <div className="container">
              <div className="row cover-over">
                <div className="col-md-12 text-left">
                  <h2 className="section-heading">Features</h2>
                  <p>
                    I'm a full-stack engineer in California 🗼
                    <br />
                    Check out my stuff
                    <br />
                  </p>
                  <li>2013 ~ 2017: J-CAST News</li>
                  <li>2017 ~ : Recruit Lifestyle</li>
                </div>
              </div>
            </div>
          </section>

          <section
            className="bg-primary text-white text-center color-inverse"
            id="concept"
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h2 className="section-heading">WORKS</h2>
                  <hr className="border-white" />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6 slide-left" data-emergence="hidden">
                  <Img sizes={work1} />
                  <p>Beep</p>
                </div>
                <div className="col-md-6 slide-right" data-emergence="hidden">
                  <Img sizes={work2} />
                  <p>Bop</p>
                </div>
              </div>
            </div>
          </section>

          <section id="repos" className="bg-secondary text-white">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-12 text-left">
                  <h2 className="section-heading">Repositories</h2>
                  <p className={'lead'}>
                    My Github{' '}
                    <a
                      className={'text-light'}
                      href="https://github.com/jstacoder/"
                    >
                      Repos:
                    </a>
                  </p>
                  <RepoList repos={repos} />
                </div>
              </div>
            </div>
          </section>
          <section id="features" className="jumboimage">
            <Img sizes={back2} className="cover-image" />
            <div className="container">
              <div className="row cover-over">
                <div className="col-md-12 text-left">
                  <h2 className="section-heading">Degree Works</h2>
                  <p>
                    test
                    <a
                      className="text-white"
                      href="https://old.jaxx2104.info/"
                    />
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

const RepoList = props => {
  const groups = [[]]
  props.repos.forEach(repo => {
    const lastGroup = groups.pop()
    let currentGroup = []
    if (lastGroup.length == 5) {
      groups.push(lastGroup)
    } else {
      currentGroup = lastGroup
    }
    currentGroup.push(repo)
    groups.push(currentGroup)
  })
  console.log(groups)
  return (
    <div>
      <div className={'row'}>
        {groups.map((repos, i) => (
          <div key={i} className={'col-md-6'}>
            {repos.map(repo => (
              <Repo key={repo.name} repo={repo} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const Repo = props => {
  console.log(props.repo)
  return (
    <div className={'col pt-3 col-md-auto list-group'}>
      <a
        href={'#'}
        className={
          'py-4 bg-primary text-white text-center list-group-item list-group-item-action'
        }
      >
        {props.repo.name}
      </a>
    </div>
  )
}

export const query = graphql`
  query ProfilePageQuery {
    skills: allSkillsJson {
      nodes {
        name
        title
      }
    }
    github {
      viewer {
        avatarUrl
        repoList: repositories(
          first: 20
          orderBy: { direction: DESC, field: STARGAZERS }
        ) {
          repos: nodes {
            name
            stargazers {
              totalCount
            }
          }
        }
      }
    }
    profile: file(name: { eq: "me" }) {
      childImageSharp {
        fixed(width: 120, height: 120) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    #    profile: file(name: { eq: "profile" }) {
    #      childImageSharp {
    #        fixed(width: 120, height: 120) {
    #          ...GatsbyImageSharpFixed_withWebp
    #        }
    #      }
    #    }
    work1: file(name: { eq: "work1" }) {
      childImageSharp {
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    work2: file(name: { eq: "work2" }) {
      childImageSharp {
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    work3: file(name: { eq: "work3" }) {
      childImageSharp {
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    back1: file(name: { eq: "back1" }) {
      childImageSharp {
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    back2: file(name: { eq: "back2" }) {
      childImageSharp {
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
  }
`

import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, optionsKnob as options } from '@storybook/addon-knobs'

import { Button, Welcome } from '@storybook/react/demo'
import SkillList from 'components/SkillList'

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('skill list', module)
  .addDecorator(withKnobs)
  .add('one list', () => {
    const skillsList = options(
      'skills',
      { atlassian: ['atlassian'], jira: ['jira'] },
      ['atlassian'],
      { display: 'inline-check' }
    )

    const skills = skillsList.map(skill => ({
      name: skill,
      title: skill,
    }))

    return <SkillList skills={skills} />
  })

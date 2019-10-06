/** @jsx jsx */
import { Fragment } from 'react'
import { jsx, Box, Flex, Styled } from 'theme-ui'
import { FilterList, Text } from '@primer/components'
import isSameDay from 'date-fns/isSameDay'
import lightFormat from 'date-fns/lightFormat'
import format from 'date-fns/format'
import startOfDay from 'date-fns/startOfDay'

import { CommitBlock } from './commit-block.jsx'

const sortCommitsByCommitDate = commits =>{
    const rtn = {}

    commits.forEach(commit=>{
        const commitDay = lightFormat(new Date(commit.committedDate), 'yyyy-MM-dd')
        if(!rtn[commitDay]){
            rtn[commitDay] = []
        }       
        rtn[commitDay].push(commit)
    })
    return rtn 
}

export const CommitBlockList = ({commits}) =>{    
    const commitsByDay = sortCommitsByCommitDate(commits)
    const daysToShow = Object.keys(commitsByDay)    
    return (
        <Fragment>
            {
                daysToShow.map(day=>{
                    const commits = commitsByDay[day]         
                    const formattedDay = format(new Date(day), 'MMM d, yyyy')                               
                    return (
                    <Box key={day}>
                      <Text as='p' mb={2}>Commits on {formattedDay}</Text>
                        <ul sx={{
                            listStyleType:'none',            
                            paddingInlineStart: 'unset',
                        }}>
                            {commits.map((commit, idx)=> (
                                <li sx={{
                                    bg: 'white',
                                    ':hover': {
                                        bg: '#f6fbff'
                                    }
                                }} key={idx} selected={idx === 0}>
                                    <CommitBlock commit={commit} />
                                </li>
                            ))}
                        </ul>
                    </Box>
                )})}
        </Fragment>
    )
}

 
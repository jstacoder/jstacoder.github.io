/** @jsx jsx */
import { Fragment } from 'react'
import { jsx, Box, Flex, Styled } from 'theme-ui'
import { FilterList } from '@primer/components'
import isSameDay from 'date-fns/isSameDay'
import lightFormat from 'date-fns/lightFormat'
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
                    return (
                    <Box>
                      <Text>{day}</Text>
                        <Styled.ul sx={{
                            listStyleType:'none',            
                        }}>
                            {commits.map((commit, idx)=> (
                                <Styled.li sx={{
                                    bg: 'white',
                                    ':hover': {
                                        bg: '#f6fbff'
                                    }
                                }} key={idx} selected={idx === 0}>
                                    <CommitBlock commit={commit} />
                                </Styled.li>
                            ))}
                        </Styled.ul>
            </Box>
                )})}
        </Fragment>
    )
}

 
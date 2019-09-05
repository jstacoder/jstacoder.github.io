/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState, useCallback } from 'react'
import { Text, Box, Link } from '@primer/components'
import * as axios from 'axios'

const useRequestResult = request =>  {
    const [result, setResult] = useState(null)

    const setupResult = async () => {
        const result = await request
        setResult(result.data)
    }
    useEffect(()=> {
       setupResult()
    })


    return result
}

export const PhotoCredit = ({username}) =>{
    const data = useRequestResult(axios.get(`https://api.unsplash.com/users/${username}?client_id=${'28060073159a3c8aa742ef8396f9a0135c2c0f2ae2af64c21403bdab6cbda3d8'}`))
    
    if(data){
        const userProfile = {...data}
    

        return (
            <Box mt={'-10px'}>
                <Text fontSize={'10px'}>
                    Photo by <Link href={userProfile.links.html}>{userProfile.name}</Link> {' '}
                    on <Link href={'https://unsplash.com/search/photos/task?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'}>Unsplash</Link>
                </Text>
            </Box>
        )
    }
    return null    
}


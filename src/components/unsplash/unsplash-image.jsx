import React from 'react'
import * as axios from 'axios'

export const UnsplashImage = ({imageId}) =>{
    const imgUrl = getImgUrl(imageId)
    return (
        <img href={imgUrl}/>
    )
}
import React from 'react'
import { useEffect } from 'react'

export const Model = ({ closeModel }) => {

    useEffect(() => {
        setTimeout(() => { closeModel() }, 3000)
    })


    return (
        <div className='modal'>
            <p> Item added </p>
        </div>
    )
}

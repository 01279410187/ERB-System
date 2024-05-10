import React from 'react'
import { API_ENDPOINT } from '../../../../../../../../config'
import './Cards.scss'

function Cards(props) {
    console.log(props)
    return (


        <div className="custom-card" onClick={props.onClick}>
            <div className='image'>
                <img className='card-img' src={`${API_ENDPOINT}/${props.img}`} alt={`alt-${props.name}`} />
            </div>
            <div className='details'>
                <h1>{props.department} </h1>
            </div>
        </div>

    )
}

export default Cards
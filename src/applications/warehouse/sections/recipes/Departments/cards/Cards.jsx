import React from 'react'
import './Cards.scss'

function Cards(props) {
    console.log(props)
    return (


        <div className="custom-card" >
            <div className='image'>
                <img className='card-img' alt={props.department} src={props.img} />
            </div>
            <div className='details'>
                <h1>{props.department} </h1>
            </div>
        </div>

    )
}

export default Cards
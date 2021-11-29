import React from 'react';
import { Link } from 'react-router-dom'
import './style-card.css'

import image from './../../assets/placeholder.png'


function AuctionCard(props) {
    return (
        <Link to={'/auction/' + props.id} className="card text-center shadow" id="card_UI">
            <div className="card-body text-dark" id="card_UI_body">
                <div className="overflow mb-3" id="overflow">
                    <img src={image} alt="divocak1" className="card-img-top" id="card_UI_img"/>
                </div>
                <h4 className="card-title">{props.name}</h4>
                <p className="card-text text-secondary" id="card_UI_text">{props.description}</p>
                <h6 className="h6">{props.price + ' Eur'}</h6>
            </div>
        </Link>
    )
}

export default AuctionCard
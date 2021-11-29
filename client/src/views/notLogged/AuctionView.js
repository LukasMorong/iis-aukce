import React, { useState } from 'react'
import './AuctionView.css'
import image from '../../assets/placeholder.png'
import axios from 'axios'


function AuctionView(props) {
    const id = props.match.params.id
    console.log(id)

    const [auctionData, setAuctionData] = useState({
        name: '',
        description: '',
        price: 0
    })

    React.useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/api/auction/' + id, {}, {headers: {withCredentials: true}})
        .then((res) => {
            if(res.data.status === 400){
               return
            }
    
            if(res.data.status === 200){
                const auctionData = res.data.data[0]
                console.log(auctionData)

                setAuctionData({
                    name: auctionData.name,
                    description: auctionData.description,
                    price: auctionData.minBid === 0? auctionData.maxBid : auctionData.minBid
                })
            }
        })
      }, []);

    return (
            <div className="card w-75 mb-3" id="card_auction">
                
                <div className="card-body text-left" id="card_body">
                    <div className="d-flex bd-highlight mb-3">    
                        <div className="mr-auto p-2 bd-highlight mt-2">
                            <h5 className="card-title h1" id="title">{auctionData.name}</h5>
                        </div>
                        {/* <div className="p-2 bd-highlight">
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">Edit</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Licitate</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Delete</a>
                                </li>
                            </ul>
                        </div> */}
                        
                    </div>
                    <div className="d-flex flex-row  justify-content-between bd-highlight mb-3">  
                        <div className="p-2 bd-highlight">
                            <div className="d-flex flex-fill flex-column bd-highlight mb-3">
                                <div className="p-2 flex-fill bd-highlight">
                                    <p className="card-text" id="popis_aukcia">{auctionData.description}</p>
                                </div>
                                <div className="p-2  flex-fillbd-highlight">
                                    <p className="card-text" >{'Curr price: ' + auctionData.price + '€'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex  flex-column bd-highlight mb-3" id="viewImage">  
                            <div className="p-2 flex-grow-1 bd-highlight">
                                <img src={image} alt="divocak1" className="card-img-top"/>
                            </div>
                        </div>  
                    </div>  
                    <div className="d-inline-flex flex-row bd-highlight mb-3">

                        <div className="p-2 bd-highlight mb-3">
                            <div className="input-group w-20" id="input_cena">
                                <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)"></input>
                                <div className="input-group-append">
                                    <span className="input-group-text">€</span>
                                    <span className="input-group-text">0.00</span>
                                    <span className="input-group-text">Cas: 10:49:32</span>
                                </div>
                            </div>
                        </div>    
                        <div className="p-2 bd-highlight">
                            <button type="button" id="tlacitko_aukcia" className="btn btn-dark" onClick={() => alert('to do')}>Bid</button>
                        </div>

                    </div>

                </div>
                <div className="card-footer text-left">
                    <div className="d-flex bd-highlight" id="footer_flex">
                        <div className="p-2 flex-fill bd-highlight">
                            <p className="card-text">Pravidla: </p></div>
                        <div className="p-2 flex-fill bd-highlight">
                            <p className="card-text">Kategoria: </p>
                        </div>
                        <div className="p-2 flex-fill bd-highlight">
                            <p className="card-text">Typ: </p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default AuctionView
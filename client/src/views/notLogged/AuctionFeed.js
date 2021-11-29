import axios from 'axios'
import React, { useState } from 'react'
import AuctionCard from './AuctionCard.js'

function AuctionFeed() {
    const [auctionList, setAuctionList] = useState([])
    

    React.useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/api/auctions', {}, {headers: {withCredentials: true}})
        .then((res) => {
            if(res.data.status === 400){
               return
            }

            if(res.data.status === 200){
                const auctionsData = res.data.data
                console.log(auctionsData)
                const auctionListTmp = auctionsData.map((auction) => (
                    <div className="col-md-4">
                        <AuctionCard name={auction.name} description={auction.description} id={auction.id} price={auction.minBid === 0? auction.maxBid : auction.minBid }/>
                    </div>
                ))

                setAuctionList(auctionListTmp)
            }
        })
      }, []);


    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="row">
                {auctionList}
             </div>
        </div>
    )
}

export default AuctionFeed
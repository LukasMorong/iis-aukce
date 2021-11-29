import axios from 'axios'
import React, { useState } from 'react'

function Auctions(props) {
    const [auctionTableList, setAuctionTableList] = useState([]);
    
    function trim(text, len){
        return text.length > len? text.substring(0,len) + '...' : text
    }

    function deleteAuction(auctionId) {
        axios.defaults.withCredentials = true;
        axios.delete(`http://localhost/api/admin/auction/${auctionId}`, {}, {headers: {withCredentials: true}})
        .then((res) => {
            if(res.data.status === 400){
                alert('action failed!')
               return
            }

            if(res.data.status === 200){
                getAuctions()
            }
        })
    }

    function getAuctions() {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost/api/admin/auctions', {}, {headers: {withCredentials: true}})
        .then((res) => {
            console.log(res)
            const auctionList = res.data.data
            let tmpTableData = auctionList.map((auction) => (

                    <tr key={auction.id}>
                        <th scope="row">{auction.id}</th>
                        <td>{trim(auction.name, 15)}</td>
                        <td>{trim(auction.description, 10)}</td>
                        <td>{auction.status}</td>
                        <td>
                            <button type="button" className="btn btn-success mr-2" onClick={() => alert('to do')}>View</button>
                            <button type="button" className="btn btn-primary mr-2" onClick={() => alert('to do')}>Edit</button>
                            <button type="button" className="btn btn-danger mr-2" onClick={() => deleteAuction(auction.id)}>Delete</button>
                        </td>
                    </tr>

            ))

            setAuctionTableList(tmpTableData)
        })
    }

    React.useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost/api/currentUser', {}, {headers: {withCredentials: true}})
        .then((res) => {
            if(res.data.status === 400){
               return
            }

            if(res.data.status === 200){
                const {data} = res.data

                if(data.role !== 3){
                    props.history.push("/")
                    return
                }

                getAuctions()
            }
        })
      }, []);


    return (
        <div className="container">
            <h1 className="h1 mt-5 mb-5">Auctions</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {auctionTableList}
                </tbody>
                </table>
        </div>
    )
}

export default Auctions
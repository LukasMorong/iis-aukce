import axios from 'axios'
import React, { useState } from 'react'

function Auctions(props) {
    const [auctionTableList, setAuctionTableList] = useState([]);
    
    function trim(text, len){
        return text.length > len? text.substring(0,len) + '...' : text
    }


    React.useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/api/currentUser', {}, {headers: {withCredentials: true}})
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

                const currentUser = {
                    id: data.userId,
                    role: data.role
                }

                axios.get('http://localhost:5000/api/admin/auctions', {}, {headers: {withCredentials: true}})
                    .then((res) => {
                        const auctionList = res.data.data
                        console.log(auctionList)
                        let tmpTableData = auctionList.map((auction) => (

                                <tr key={auction.id}>
                                    <th scope="row">{auction.id}</th>
                                    <td>{trim(auction.name, 15)}</td>
                                    <td>{trim(auction.description, 10)}</td>
                                    <td>{auction.status}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary mr-2">Edit</button>
                                        <button type="button" className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>

                        ))

                        setAuctionTableList(tmpTableData)
                    })
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
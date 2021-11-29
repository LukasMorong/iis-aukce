import axios from 'axios'
import React, { useState } from 'react'

function MyAuctions(props) {

    const [usersAuctions, setUsersAuctions] = useState([]);
    const [usersParticipations, setUsersParticipations] = useState([]);

    function trim(text, len){
        return text.length > len? text.substring(0,len) + '...' : text
    }

    function deleteAuction(auctionId, userId) {
        axios.defaults.withCredentials = true;
        axios.delete(`http://localhost:5000/api/user/auction/${auctionId}`, {}, {headers: {withCredentials: true}})
        .then((res) => {
            if(res.data.status === 400){
                alert('action failed!')
               return
            }

            if(res.data.status === 200){
                getAuctions(userId)
            }
        })
    } 

    function getAuctions(userId) {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/api/user/auctions', {}, {headers: {withCredentials: true}})
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
                            <button type="button" className="btn btn-danger mr-2" onClick={() => deleteAuction(auction.id, userId)}>Delete</button>
                        </td>
                    </tr>

            ))

            setUsersAuctions(tmpTableData)
        })
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

                if(data.role < 2){
                    props.history.push("/")
                    return
                }

                const currentUser = {
                    id: data.userId,
                    role: data.role
                }
                getAuctions(currentUser.id)
            }
        })
      }, []);


    return (
        <div className='container'>
            <h1 className="h1 mt-5">My Auctions</h1>
            <h2 className="h2 mt-5">Created</h2>
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
                    {usersAuctions}
                </tbody>
            </table>
            <h2 className="h2 mt-5">Participations</h2>
        </div>
    )
}

export default MyAuctions
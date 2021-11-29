import axios from 'axios'
import React, { useState } from 'react'

function Requests(props) {
    const [auctionTableList, setAuctionTableList] = useState([]);
    
    function trim(text, len){
        return text.length > len? text.substring(0,len) + '...' : text
    }

    function getRequests(userId) {
        axios.get('http://localhost/api/licitator/requests', {}, {headers: {withCredentials: true}})
        .then((res) => {

            const auctionList = res.data.data
            let tmpTableData = auctionList.map((auction) => (

                    <tr key={auction.id}>
                        <th scope="row">{auction.id}</th>
                        <td>{trim(auction.name, 15)}</td>
                        <td>{trim(auction.description, 10)}</td>
                        <td>{auction.status}</td>
                        <td>
                            <button type="button" className="btn btn-primary mr-2" onClick={() => alert('to do')}>View</button>
                            {userId === auction.author ? 
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="You cant licitate your own auction">
                                    <button class="btn btn-success" type="button"  onClick={() => handleLicitate(auction.id, userId)} disabled>Licitate</button>
                                </span>
                                : 
                                <button type="button" className="btn btn-success" onClick={() => handleLicitate(auction.id, userId)}>Licitate</button>
                            }
                        </td>
                    </tr>

            ))

            setAuctionTableList(tmpTableData)
        })
    }

    function handleLicitate(auctionId, userId) {
        const licitateData = {
            auctionId: auctionId,
            userId: userId
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost/api/licitator/licitate', licitateData, {}, {headers: {withCredentials: true}})
        .then((res) => {
            if(res.data.status === 400){
                alert('action error')
               return
            }

            if(res.data.status === 200){
                getRequests(userId)
            }
        })


        getRequests(userId)
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

                if(data.role < 2){
                    props.history.push("/")
                    return
                }

                const currentUser = {
                    id: data.userId,
                    role: data.role
                }
                getRequests(currentUser.id)
            }
        })
      }, []);


    return (
        <div className="container">
            <h1 className="h1 mt-5 mb-5">List of licitation requests</h1>

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

export default Requests
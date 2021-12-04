import axios from 'axios'
import React, { useState } from 'react'

function Licitations(props) {
    const [auctionTableList, setAuctionTableList] = useState([]);

    function trim(text, len){
        return text.length > len? text.substring(0,len) + '...' : text
    }

    function getLicitations(userId) {
        axios.get('http://localhost:5000/api/licitator/licitations', {}, {headers: {withCredentials: true}})
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
                            <button type="button" className="btn btn-primary mr-2" onClick={() => props.history.push("/auction/" + auction.id)}>View</button>
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="TODO">
                                <button type="button" className="btn btn-success mr-2" onClick={() => alert('to do')} disabled>Approve participators</button>
                            </span>
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="TODO">
                                <button type="button" className="btn btn-danger mr-2" onClick={() => alert('to do')} disabled>Close auction</button>
                            </span>
                        </td>
                    </tr>

            ))

            setAuctionTableList(tmpTableData)
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
                getLicitations(currentUser.id)
            }
        })
      }, []);


    return (
        <div className="container">
            <h1 className="h1 mt-5">List Of Licitations</h1>

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

export default Licitations
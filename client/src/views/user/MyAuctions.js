import axios from 'axios'
import React, { useState } from 'react'

function MyAuctions() {
    const [userId, setUserId] = useState('0');
    const [userEmail, setUserEmail] = useState('');
    const [role, setRole] = useState([]);
    

    React.useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/api/currentUser', {}, {headers: {withCredentials: true}})
        .then((res) => {
            console.log(res.data.status)
            if(res.data.status === 400){
               return
            }

            if(res.data.status === 200){
                const {data} = res.data
                setUserId(data.userId)
                setRole(data.role)
                setUserEmail(data.email)
            }
        })
      }, []);


    return (
        <div>
            <h1 className="h1 mt-5">My Auctions</h1>
            <h2 className="h2 mt-5">Created</h2>
            <h2 className="h2 mt-5">Participations</h2>
        </div>
    )
}

export default MyAuctions
import axios from 'axios'
import React, { useState } from 'react'

function Home() {
    const [username, setUsername] = useState(0);

    axios.defaults.withCredentials = true;
    axios.get('http://localhost:8080/api/user', {}, {headers: {withCredentials: true}})
        .then((res) => {
            console.log(res.data.status)
            if(res.data.status === 400){
                setUsername(', ' + res.data.message)
            }

            if(res.data.status === 200){
                setUsername(res.data.user.username)
            }
        })


    return (
        <div>
            <h1 className="h1 mt-5">Hi {username}</h1>
        </div>
    )
}

export default Home
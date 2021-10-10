import React from 'react'
import axios from 'axios'

function LoginTMP(props) {

    function loginUser(){
        let authData = {
            username: 'karban',
            password: 'linux'
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:8080/api/login', authData, {headers: {withCredentials: true}})
            .then((res) => {
                    props.history.push("/")
            })
    }



    return (
        <div>
            <button type="button" className="btn btn-primary mt-5" onClick={loginUser}>Login</button>
        </div>
    )
}

export default LoginTMP
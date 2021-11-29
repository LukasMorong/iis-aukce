import React, { useState } from 'react'
import axios from 'axios'

import './Login.css'

import userIco from '../assets/userIco.svg'

function Login(props) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function loginUser(e){
        e.preventDefault();
        let authData = {
            email: formData.email,
            password: formData.password
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/api/login', authData, {headers: {withCredentials: true}})
            .then((res) => {
                if(res.data.status === 200){
                    props.history.push("/")
                    window.location.reload(false);
                } else {
                    alert(res.data.message)
                }
            })
    }

    return (
        <div>
            <div className="card text-center shadow" id="card_login">
                <img src={userIco} alt="divocak1" className="card-img-top" id="login_obrazok"/>
                <form className="m-auto" >
                    <div className="form-group mt-3">
                        <input onChange={(e) => setFormData({...formData, email: e.target.value})}  value={formData.email}type="email" className="form-control" id="name" placeholder="Email"></input>
                    </div>
                    <div className="form-group">
                        <input onChange={(e) => setFormData({...formData, password: e.target.value})}  value={formData.password}type="password" className="form-control" id="password" placeholder="Password"></input>
                    </div>
                    <div>
                    <button type="submit" className="btn btn-dark mt-4 mb-4" onClick={loginUser}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
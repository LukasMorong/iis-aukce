import React, { useState } from 'react'
import axios from 'axios'
import userIco from '../assets/userIco.svg'

import './Register.css'

function Register(props) {
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: ""
    })

    function registerUser(e) {
        e.preventDefault();

        let userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        }

        if(formData.password !== formData.password2){
            alert('passwords has to be the same')
            return
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/api/register', userData, {headers: {withCredentials: true}})
            .then((res) => {
                console.log(res)
                if(res.data.status === 200){
                    axios.post('http://localhost:5000/api/login', userData, {headers: {withCredentials: true}})
                    .then((res) => {
                        if(res.data.status === 200){
                            props.history.push("/")
                            window.location.reload(false);
                        } else {
                            props.history.push("/")
                            window.location.reload(false);
                        }
                    })
                } else {
                    alert(res.data.message)
                }
            })
    }
    
    return (
        <div className="card text-center shadow" id="card_reg">
            <img src={userIco} alt="divocak1" className="card-img-top mb-2" id="reg_obrazok"/>
            <form className="m-auto" >
                <div className="form-group">
                    <input onChange={(e) => setFormData({...formData, firstName: e.target.value})}  value={formData.firstName} type="text" className="form-control" id="name" placeholder="First name"></input>
                </div>
                <div className="form-group">
                    <input onChange={(e) => setFormData({...formData, lastName: e.target.value})}  value={formData.lastName} type="text" className="form-control" id="lname" placeholder="Last name"></input>
                </div>
                <div className="form-group">
                    <input onChange={(e) => setFormData({...formData, email: e.target.value})}  value={formData.email} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <input onChange={(e) => setFormData({...formData, password: e.target.value})} value={formData.password} type="password" className="form-control" id="password" placeholder="Password"></input>
                </div>
                <div className="form-group">
                    <input onChange={(e) => setFormData({...formData, password2: e.target.value})} value={formData.password2} type="password" className="form-control" id="password2" placeholder="Confirm Password"></input>
                </div>
                <div>
                <button type="submit" className="btn btn-dark mt-3" onClick={registerUser}>Register</button>
                </div>
            </form>
        </div>
        // <form >
        //     <div className="form-group">
        //         <label htmlFor="email">Email address</label>
        //         <input onChange={(e) => setFormData({...formData, email: e.target.value})}  value={formData.email} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"></input>
        //     </div>
        //     <div className="form-group">
        //         <label htmlFor="password">Password</label>
        //         <input onChange={(e) => setFormData({...formData, password: e.target.value})} value={formData.password} type="password" className="form-control" id="password" placeholder="Password"></input>
        //     </div>
        //     <div className="form-group">
        //         <label htmlFor="password2">Confirm Password</label>
        //         <input onChange={(e) => setFormData({...formData, password2: e.target.value})} value={formData.password2} type="password" className="form-control" id="password2" placeholder="Confirm Password"></input>
        //     </div>


        //     <button type="submit" className="btn btn-primary" onClick={registerUser}>Register</button>
        // </form>
    )
}

export default Register

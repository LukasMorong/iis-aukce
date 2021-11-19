import React, { useState } from 'react'

import './Reg.css'

function Reg() {
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    /*const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    
    }*/
    
    return (
        <form >
            <div className="form-group">
                <label for="text">Name</label>
                <input onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name} type="text" class="form-control" id="name" placeholder="Name"></input>
            </div>
            <div className="form-group">
                <label for="email">Email address</label>
                <input onChange={(e) => setFormData({...formData, email: e.target.value})}  value={formData.email} type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"></input>
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input onChange={(e) => setFormData({...formData, password: e.target.value})} value={formData.password} type="password" class="form-control" id="password" placeholder="Password"></input>
            </div>
            <div className="form-group">
                <label for="password2">Confirm Password</label>
                <input onChange={(e) => setFormData({...formData, password2: e.target.value})} value={formData.password2} type="password" class="form-control" id="password2" placeholder="Confirm Password"></input>
            </div>


            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    )
}

export default Reg

import axios from 'axios'
import React, { useState } from 'react'

import './Profile.css'
import userIco from '../../assets/userIco.svg'

function Profile(props) {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: 0,
        id: 0
    })
    

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

                if(data.role === 0){
                    props.history.push("/")
                }

                setUserData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    role: data.role,
                    id: data.setUserId
                })

            }
        })
      }, []);


    return (
        <div className="card text-center shadow" id="card_profil">
            <img src={userIco} alt="divocak1" className="card-img-top" id="obrazok_profil"/>
            <form className="m-auto" >
                <div className="form-group mt-3">
                    <h3 className='h3'>{userData.firstName + ' ' + userData.lastName}</h3>
                </div>
                <div className="form-group">
                    <h6 className='h6'>{userData.email}</h6>
                </div>
                <div className="form-group">
                    <h6 className='h6'> {
                        {
                        1: 'Role: User',
                        2: 'Role: Licitator',
                        3: 'Role: Admin'
                        }[userData.role]
                    }
                    </h6>
                </div>
                <div>
                    <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="TODO">
                        <button type="button" className="btn btn-dark mt-3 mb-4" disabled>Edit</button>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default Profile
import axios from 'axios'
import React, { useState } from 'react'

function Users(props) {
    const [userTableList, setUserTableList] = useState([]);
    

    React.useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/api/currentUser', {}, {headers: {withCredentials: true}})
        .then((res) => {
            if(res.data.status === 400){
               return
            }

            if(res.data.status === 200){
                const {data} = res.data

                if(data.role !== 3){
                    props.history.push("/")
                    return
                }

                const currentUser = {
                    id: data.userId,
                    role: data.role
                }

                axios.get('http://localhost:5000/api/admin/users', {}, {headers: {withCredentials: true}})
                    .then((res) => {
                        const userList = res.data.data

                        let tmpTableData = userList.map((user) => (

                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.role}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary mr-2" onClick={() => alert('to do')}>Edit</button>
                                        {currentUser.id === user.id ? 
                                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="You cant delete yourself">
                                                <button className="btn btn-danger" type="button" disabled>Delete</button>
                                            </span>
                                            : 
                                            <button type="button" className="btn btn-danger" onClick={() => alert('to do')}>Delete</button>
                                        }
                                    </td>
                                </tr>

                        ))

                        setUserTableList(tmpTableData)
                    })
            }
        })
      }, []);


    return (
        <div className="container">
            <h1 className="h1 mt-5 mb-5">Users</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Role</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userTableList}
                </tbody>
                </table>
        </div>
    )
}

export default Users
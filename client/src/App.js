import './App.css';
import { Route, Switch } from "react-router-dom";
import React, { useState } from 'react'
import axios from 'axios'

//components
import Navbar from "./components/layout/Navbar";
import Footer from './components/layout/Footer';


//views
import Login from "./views/Login"
import Register from "./views/Register"
import NotLoggedHome from "./views/notLogged/Home"
import UserHome from "./views/user/Home"
import UserMyAuctions from "./views/user/MyAuctions";
import UserAddAuction from "./views/user/AddAuction";
import UserProfile from "./views/user/Profile"
import Licitations from "./views/licitator/Licitations"
import Requests from "./views/licitator/Requests"
import UsersAdmin from "./views/admin/Users"
import AuctionsAdmin from "./views/admin/Auctions"


function App() {
  const [role, setRole] = useState(0);
  const [logged, setLogged] = useState(false);

  React.useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:5000/api/currentUser', {}, {headers: {withCredentials: true}})
    .then((res) => {
        if(res.data.status === 400){
           return
        }

        if(res.data.status === 200){
            const {data} = res.data
            setRole(data.role)
            if(data.userId){
              setLogged(true)
            }
            
        }
    })
  }, []);
  return (
    <div className="App page-container">
      <div className="content-wrapp">
        <header>
          <Navbar logged={logged} role={role} />
        </header>
        
        <main>
          
          <Switch>
            {/* auth */}
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>

            {/* notLogged */}
            {role === 0? <Route path="/" component={NotLoggedHome} exact /> : ''}

            {/* user */}
            {role === 1? <Route path="/" component={UserHome} exact /> : ''}
            <Route path="/myAuctions" component={UserMyAuctions} exact/>
            <Route path="/addAuction" component={UserAddAuction} exact/>
            <Route path="/profile" component={UserProfile} exact/>

            {/* licitator */}
            {role === 2? <Route path="/" component={Licitations} exact /> : ''}
            <Route path="/licitator/licitations" component={Licitations} exact />
            <Route path="/licitator/requests" component={Requests} exact />

            {/* admin */}
            {role === 3? <Route path="/" component={AuctionsAdmin} exact /> : ''}
            <Route path="/admin/users" component={UsersAdmin} exact/>
          </Switch>
        </main>
        
        </div>
        <Footer/>
    </div>
  );
}

export default App;

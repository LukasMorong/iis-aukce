import './App.css';
import { Route, Switch } from "react-router-dom";

//components
import Navbar from "./components/layout/Navbar";
import Auction from "./components/AddAuction";

//views
import Home from "./views/Home"
import NotHome from "./views/NotHome"
import Login from "./views/LoginTMP"
import Register from "./views/Reg"
import AuctionForm from "./components/AuctionForm";


function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      
      <main>
        
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/nothome" component={NotHome}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/auctionform" component={AuctionForm}/>

        </Switch>
      </main>
      
      <footer>
       {/* <Auction/>*/}
      </footer>
    </div>
  );
}

export default App;

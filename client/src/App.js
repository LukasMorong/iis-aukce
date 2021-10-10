import './App.css';
import { Route, Switch } from "react-router-dom";

//components
import Navbar from "./components/layout/Navbar";

//views
import Home from "./views/Home"
import NotHome from "./views/NotHome"
import Login from "./views/LoginTMP"

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
        </Switch>
      </main>
    </div>
  );
}

export default App;

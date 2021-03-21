import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Destination from "./components/Destination/Destination";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import { useState, createContext } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Transports from "./components/Transports/Transports";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Transports />
          </Route>        
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/destination/:idTransport">
            <Destination />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

import { Route, useLocation,Switch } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./Views/Home/Home";
import Nav from "./Components/Nav/Nav"
import Detail from "./Views/Detail/Detail"
import Form from "./Views/Form/Form"
import Landing from "./Views/Landing/Landing";

function App() {
  const location= useLocation()
  return (
    <div className="App">
      {location.pathname !== "/" && <Nav/>}
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/Home" component={Home}/>
        <Route path="/Create" component={Form}/>
        <Route path="/Detail/:id" component={Detail}/>
      </Switch>
    </div>
  );
}
export default App;

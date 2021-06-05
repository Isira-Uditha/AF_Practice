import './App.css';
import NavBar from "./components/navBar/navBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Category from "./components/category/category";
import Vehicle from "./components/vehicle/vehicle";
import CreateVehicle from "./components/createVehicle/createVehicle";
import SelectedVehicles from "./components/selcetedVehicles/selectedVehicles";

function App() {
  return (
    <div className="App">
      <Router>
          <NavBar/>
          <section>
              <Switch>
                  <Route path="/create-vehicle" component={CreateVehicle}/>
                  <Route path="/" component={Category} exact />
                  <Route path="/vehicles" component={Vehicle} />
                  <Route path="/:id" component={SelectedVehicles} />
              </Switch>
          </section>
      </Router>
    </div>
  );
}

export default App;

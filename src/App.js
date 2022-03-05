import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListEmployee from "./compenents/ListEmployee";
import Header from "./compenents/Header";
import {BrowserRouter as Router,Routes,Route}from "react-router-dom";
import Form from "./compenents/Form";
import Employee from "./compenents/Employee";
function App() {
  return (
      <div>
          <Router>
              <Header/>
              <div className="container">
              <Routes>
                  <Route exact path="/" exact element={<Employee/>}/>
                  <Route exact path="/employees" exact element={<Employee/>}/>
                  <Route exact path="/employees/add"  exact element={<Form/>}/>
                  <Route exact path="/employees/edit/:id"  exact element={<Form/>}/>
              </Routes>
              </div>
          </Router>

      </div>
  );
}
export default App;

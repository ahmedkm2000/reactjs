import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class ListEmployee extends Component {
    constructor(props) {
        super(props);
        this.state={
              employees:[]
        }
    }
    componentDidMount() {
        EmployeeService.getAllEmployees().then((res =>{
            this.setState({employees:res.data});
        }))
    }
    render() {
        return (
            <div className="container">
                <h1>List of Employees</h1>
                <button className="btn mb-3 btn-primary">Add new Employee</button>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

    )
}
    }

export default ListEmployee;
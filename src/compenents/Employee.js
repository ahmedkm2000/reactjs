import React, {useEffect, useState} from "react";
import EmployeeService from "../services/EmployeeService";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
export default function Employee(){

    const [employees,setEmployees] = useState([]);
    useEffect(()=>{
        let notification = localStorage.getItem("notification");
        if(notification==="added"){
            toast.success('Employee added successufely !', {position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
        }
        if (notification==="updated"){
            toast.success('Employee updated successufely !', {position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
        }
        localStorage.setItem("notification",null);

    },[])
    const navigate = useNavigate();
    EmployeeService.getAllEmployees().then((res=>{
        setEmployees(res.data);
    }))
    function navigateToForm(){
        navigate('/employees/add')
    }
    function editEmployee(id){
        navigate(`employees/edit/${id}`)
    }
    function deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then((res)=>{
           setEmployees(employees.filter(employee=>employee.id!==id));
            toast.error('Employee deleted successufely !', {
                position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
           })
        ;
    }
    return(
        <div>
            <div className="container">
                <h1>List of Employees</h1>
                <button onClick={navigateToForm} className="btn mb-3 btn-primary">Add new Employee</button>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.status}</td>
                            <td>
                                <button onClick={()=> editEmployee(employee.id)}  className="mr-3 btn btn-success" >Edit</button>
                                <button style={{marginLeft:"10px"}} onClick={()=> deleteEmployee(employee.id)} className="mr-3 btn btn-danger" >Delete</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
        </div>
        </div>
    )
}
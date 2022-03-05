import {useState} from "react";
import { useNavigate,useParams } from 'react-router-dom';
import {useEffect} from "react";
import EmployeeService from "../services/EmployeeService";
export default function Form(){
    const { id } = useParams();
    const title =  id === undefined  ? "Add Employee" : "Update Employee";
    const [FormData,setFormData] = useState({
        id: id,
        firstName:"",
        lastName:"",
        email:"",
        status:"active"
    })
    useEffect(() => {
        if(id!=undefined)
        EmployeeService.getEmployeeById(FormData.id).then((res)=>{
            setFormData(res.data);
        })
    }, []);
    const navigate = useNavigate();
    function handleChange(event){
        setFormData(prevState => {
             return{...prevState,
                [event.target.name]:event.target.value
            }
        }
        )
    }
    function saveEmployee(event){
        event.preventDefault()
        if(FormData.id===undefined){
        EmployeeService.insertEmployee(FormData).then((res)=>{
            localStorage.setItem("notification","added");
            navigate('/');
        })
    }else {
            EmployeeService.updateEmployee(FormData.id,FormData).then((res)=>{
                localStorage.setItem("notification","updated");
                navigate('/');

            });
        }
    }
    function cancel(){
       navigate('/');
    }
    return(
        <div className="container" style={{maxWidth:"500px",marginTop: "100px"}}>
            <h2>{title}</h2>
            <div className="container border border-secondary p-3 ">
                <form onSubmit={saveEmployee}>
                        <div className="col-sm-8">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control"
                                   required minLength="3" maxLength="15"
                                   name="firstName"
                                   onChange={handleChange}
                                   value={FormData.firstName}

                            />
                        </div>
                        <div className="col-sm-8">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control"
                                   required minLength="3" maxLength="15"
                                   name="lastName"
                                   onChange={handleChange}
                                   value={FormData.lastName}

                            />
                        </div>
                        <div className="col-sm-8">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control"
                                   required minLength="10" maxLength="40"
                                   name="email"
                                   onChange={handleChange}
                                   value={FormData.email}

                            />
                        </div>
                        <div className="col-sm-8">
                            <label className="form-label">Status</label>
                        </div>
                    <div className="col-sm-8">
                            <select
                                minLength="3" maxLength="10"
                                name="status"
                                onChange={handleChange}
                                value={FormData.status}
                            >
                                <option selected>active</option>
                                <option >inactive</option>
                            </select>
                    </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-dark m-2" onClick={cancel} >Cancel</button>

                </form>
            </div>
        </div>
    )
}
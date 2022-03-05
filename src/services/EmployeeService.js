import axios from "axios";
const EMPLOYEE_BASE_URL = "http://localhost:8080/api/v1/employees";
class EmployeeService{
    getAllEmployees(){
        return axios.get(EMPLOYEE_BASE_URL);
    }
    insertEmployee(employee){
        return axios.post(EMPLOYEE_BASE_URL,employee);
    }
    getEmployeeById(id){
        return axios.get(EMPLOYEE_BASE_URL+"/"+id);
    }
    updateEmployee(id,employee){
        return axios.put(EMPLOYEE_BASE_URL+"/"+id,employee);
    }
    deleteEmployee(id){
        return axios.delete(EMPLOYEE_BASE_URL+"/"+id);
    }
}
export default new EmployeeService()
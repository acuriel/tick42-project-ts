import AxiosApiServiceBase, { baseInstance } from "./base/AxiosApiServiceBase";
import { AxiosInstance, AxiosResponse } from "axios";

class EmployeesService extends AxiosApiServiceBase{
  private static instance:EmployeesService;

  private constructor(baseInstance:AxiosInstance){
    super(baseInstance, "employees");
  }

  public static getInstance() : EmployeesService{
    if(!EmployeesService.instance){
      EmployeesService.instance = new EmployeesService(baseInstance);
    }
    return EmployeesService.instance;
  }

  public getProjects(id:string):Promise<AxiosResponse<any[]>>{
    return this.baseInstance.get(this.pathFromModelUrl(id, "projects"));
  }

  // public getCompany(id:string):Promise<AxiosResponse<any[]>>{
  //   return this.baseInstance.get(this.pathFromModelUrl(id, "projects"));
  // }
}

export default EmployeesService.getInstance();

import { AxiosInstance, AxiosResponse } from "axios";
import AxiosApiServiceBase, { baseInstance } from "./base/AxiosApiServiceBase";

class CompaniesService extends AxiosApiServiceBase{
  private static instance:CompaniesService;

  private constructor(baseInstance:AxiosInstance){
    super(baseInstance, "companies");
  }

  public static getInstance() : CompaniesService{
    if(!CompaniesService.instance){
      CompaniesService.instance = new CompaniesService(baseInstance);
    }
    return CompaniesService.instance;
  }

  public getEmployees(id:string):Promise<AxiosResponse<any[]>>{
    return this.baseInstance.get(this.pathFromModelUrl(id, "employees"));
  }

  public getProjects(id:string):Promise<AxiosResponse<any[]>>{
    return this.baseInstance.get(this.pathFromModelUrl(id, "projects"));
  }

  public getAddresses(id:string):Promise<AxiosResponse<any[]>>{
    return this.baseInstance.get(this.pathFromModelUrl(id, "addresses"));
  }
}

export default CompaniesService.getInstance();

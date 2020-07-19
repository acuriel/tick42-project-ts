import { observable, action, runInAction, computed } from "mobx";
import ProjectsService from "services/api/ProjectsService";
import ProjectMigrator from "migrators/ProjectMigrator";
import Employee from "./Employee";
import EmployeesService from "services/api/EmployeesService";
import EmployeeMigrator from "migrators/EmployeeMigrator";
import Company from "./Company";
import CompanyMigrator from "migrators/CompanyMigrator";
import CompaniesService from "services/api/CompaniesService";
import ModelStore from "./ModelStore";

export default class Project extends ModelStore<Project>{
  @observable public id:string;
  @observable public name:string;
  @observable public department:string;
  @observable public employeesId = observable<string>([]);
  @observable public companyId:string;

  @observable private _company:Company|undefined;

  private _employees = observable<Employee>([]);

  private _employeesLoaded = false;


  constructor(
    companyId:string = "",
    id:string = "",
    name:string = "",
    department:string = "",
    employeesId = observable<string>([])
    ){
      super(ProjectMigrator, ProjectsService)
      this.id = id;
      this.name = name;
      this.department = department;
      this.employeesId = employeesId;
      this.companyId = companyId;
  }

  get isValid(): boolean {
    return [this.name, this.department].every(prop => prop.length > 0);
  }


  @action
  async fetchCompany() {
    try {
      const response = await CompaniesService.get(this.companyId);
      runInAction(() => {
        this._company = CompanyMigrator.fromResponse(response.data);
      })
    } catch (e) {
      console.log(e)
    }
  }

  @computed
  get company(){
    if(!this._company){
      this.fetchCompany();
    }
    return this._company;
  }

  @computed
  get employees(){
    if(!this._employeesLoaded){
      this.fetchEmployees();
    }
    return this._employees;
  }

  @computed
  get possibleEmployees(){

    if(!this.company) return []

    return this.company.employees.filter(employee => !this.employees.some(searchElement => searchElement.id === employee.id));
  }

  @action
  async fetchEmployees(){
    try {
      const requests = this.employeesId.map(id => EmployeesService.get(id));
      const responses = await Promise.all(requests);
      runInAction(() => {
        this._employees.replace(
          responses.map(
            (response:any) => EmployeeMigrator.fromResponse(response.data)
        ));
        this._employeesLoaded = true;
      });
    } catch (error) {
      console.log(error);
    }
  }

  @action
  removeEmployee(employee:Employee){
    this._employees.remove(employee)
    this.employeesId.remove(employee.id);
  }

  @action
  addEmployee(employee:Employee){
    this._employees.push(employee)
    this.employeesId.push(employee.id);
  }


  public static async fetchById(id:string):Promise<Project|undefined>{
    try {
      const response = await ProjectsService.get(id);
      return ProjectMigrator.fromResponse(response.data);
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }


}

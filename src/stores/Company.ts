import { observable, action, runInAction, computed } from "mobx";
import CompanyAddress from "./CompanyAddress";
import Employee from "./Employee";
import CompaniesService from "services/api/CompaniesService";
import ProjectMigrator from "migrators/ProjectMigrator";
import Project from "./Project";
import EmployeeMigrator from "migrators/EmployeeMigrator";
import CompanyAddressMigrator from "migrators/CompanyAddressMigrator";
import CompanyMigrator from "migrators/CompanyMigrator";
import ModelStore from "./ModelStore";
import ProjectsService from "services/api/ProjectsService";

export default class Company extends ModelStore<Company>{
  @observable public id:string;
  @observable public name:string;
  @observable public business:string;
  @observable public slogan:string;

  private _addresses = observable<CompanyAddress>([]);
  private _addressesLoaded = false;

  private _employees = observable<Employee>([]);
  private _employeesLoaded = false;

  private _projects = observable<Project>([]);
  private _projectsLoaded = false;

  constructor(id:string = "=", name:string = "", business:string = "", slogan:string = ""){
    super(CompanyMigrator, CompaniesService);
    this.id = id;
    this.name = name;
    this.business = business;
    this.slogan = slogan;
  }

  get isValid(): boolean {
    return [this.name, this.business, this.slogan, this.addresses].every(prop => prop.length > 0);
  }
  @computed
  get jobAreas(){
    const result = this._employees
      .map(employee => employee.jobArea)
      .filter((jobArea, index, array) => array.indexOf(jobArea) === index);
    return result;
  }

  fetchRelatedData = () => Promise.all([this.fetchProjects(), this.fetchEmployees(), this.fetchAddresses()]);

  @action
  async fetchProjects(){
    try {
      const response = await CompaniesService.getProjects(this.id);
      runInAction(() => {
        this._projects.replace(
          response.data.map(
            (project:any) => ProjectMigrator.fromResponse(project)
        ));
        this._projectsLoaded = true;
      });
    } catch (error) {
      console.log(error);
    }
  }

  @computed
  get projects(){
    if(!this._projectsLoaded){
      this.fetchProjects();
    }
    return this._projects;
  }

  @action
  async removeProject(projectId:string){
    try{
      console.log(projectId);
      await ProjectsService.remove(projectId);
      this.fetchProjects();
    }catch(error){
      console.log(error);
    }
  }

  @action
  async fetchEmployees(){
    try {
      const response = await CompaniesService.getEmployees(this.id);
      runInAction(() => {
        this._employees.replace(
          response.data.map(
            (employee:any) => EmployeeMigrator.fromResponse(employee)
        ));
      });
    } catch (error) {
      console.log(error);
    }
  }

  @computed
  get employees(){
    if(!this._employeesLoaded){
      this.fetchEmployees();
    }
    return this._employees;
  }

  @action
  async fetchAddresses(){
    try {
      const response = await CompaniesService.getAddresses(this.id);
      runInAction(() => {
        this._addresses.replace(
          response.data.map(
            (address:any) => CompanyAddressMigrator.fromResponse(address)
        ));
      });
    } catch (error) {
      console.log(error);
    }
  }

  @computed
  get addresses(){
    if(!this._addressesLoaded){
      this.fetchAddresses();
    }
    return this._addresses;
  }

  @computed
  get businessTags(){
    return this.business.split(' ');
  }

  @computed
  get projectByDepartment(){
    const result = new Map<string, Project[]>()
    this.projects.forEach(project => {
      if(result.has(project.department)){
        result.get(project.department)?.push(project);
      }else{
        result.set(project.department, [project]);
      }
    })
    console.log(result);
    return result;
  }

  public static async fetchById(id:string):Promise<Company|undefined>{
    try {
      const response = await CompaniesService.get(id);
      return CompanyMigrator.fromResponse(response.data);
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }
}

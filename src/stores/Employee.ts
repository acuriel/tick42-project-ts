import { observable, action, runInAction, computed } from "mobx";
import EmployeesService from "services/api/EmployeesService";
import EmployeeMigrator from "migrators/EmployeeMigrator";
import ProjectMigrator from "migrators/ProjectMigrator";
import Project from "./Project";
import ModelStore from "./ModelStore";

export default class Employee extends ModelStore<Employee>{

  @observable public id:string;
  @observable public firstName:string;
  @observable public lastName:string;
  @observable public dateOfBirth:Date;
  @observable public companyId:string;
  @observable public jobTitle:string;
  @observable public jobArea:string;
  @observable public jobType:string;

  private _projects = observable<Project>([]);
  private _projectsLoaded = false;
  // public _projects = observable<Project>([]);

  constructor(
    id:string = "",
    firstName:string = "",
    lastName:string = "",
    dateOfBirth:Date = new Date(Date.now()),
    companyId:string = "",
    jobTitle:string = "",
    jobArea:string = "",
    jobType:string = ""
    ){
      super(EmployeeMigrator, EmployeesService);
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
      this.companyId = companyId;
      this.jobTitle = jobTitle;
      this.jobArea = jobArea;
      this.jobType = jobType;
  }

  get isValid(): boolean {
    return [this.firstName, this.lastName, this.jobTitle, this.jobArea, this.jobType].every(prop => prop.length > 0);
  }

  @action
  async fetchProjects(){
    try {
      const response = await EmployeesService.getProjects(this.id);
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

  @computed
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  public static async fetchById(id:string):Promise<Employee|undefined>{
    try {
      const response = await EmployeesService.get(id);
      return EmployeeMigrator.fromResponse(response.data);
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }
}

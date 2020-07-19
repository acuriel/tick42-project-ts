import IModelMigrator from "./IModelMigrator";
import Project from "stores/Project";

class ProjectMigrator implements IModelMigrator<Project, any>{
  private constructor(){}

  fromResponse({id, name, department, employeesId, companyId}: any): Project {
    return new Project(
      companyId,
      id,
      name,
      department,
      employeesId,
    );
  }
  fromModel(elem: Project) {
    return {
      id: elem.id,
      name: elem.name,
      department: elem.department,
      employeesId: elem.employeesId,
      companyId: elem.companyId,
    }
  }

  private static instance : ProjectMigrator;

  public static getInstance():ProjectMigrator{
    if(!ProjectMigrator.instance){
      ProjectMigrator.instance = new ProjectMigrator();
    }
    return ProjectMigrator.instance;
  }
}

export default  ProjectMigrator.getInstance();

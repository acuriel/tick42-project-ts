import IModelMigrator from "./IModelMigrator";
import Employee from "stores/Employee";


class EmployeeMigrator implements IModelMigrator<Employee, any>{
  private constructor(){}

  fromResponse({
    id,
    firstName,
    lastName,
    dateOfBirth,
    companyId,
    jobTitle,
    jobArea,
    jobType
    }: any): Employee {

    return new Employee(
      id,
      firstName,
      lastName,
      dateOfBirth,
      companyId,
      jobTitle,
      jobArea,
      jobType,
    );
  }

  fromModel(elem: Employee) {
    return {
      id: elem.id,
      firstName: elem.firstName,
      lastName: elem.lastName,
      dateOfBirth: elem.dateOfBirth,
      companyId: elem.companyId,
      jobTitle: elem.jobTitle,
      jobArea: elem.jobArea,
      jobType: elem.jobType,
    }
  }

  private static instance : EmployeeMigrator;

  public static getInstance():EmployeeMigrator{
    if(!EmployeeMigrator.instance){
      EmployeeMigrator.instance = new EmployeeMigrator();
    }
    return EmployeeMigrator.instance;
  }
}

export default EmployeeMigrator.getInstance();

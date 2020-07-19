import Company from "../stores/Company";
import IModelMigrator from "./IModelMigrator";

class CompanyMigrator implements IModelMigrator<Company, any>{
  fromResponse({id, name, business, slogan}: any): Company {
    return new Company(
      id,
      name,
      business,
      slogan
    );
  }
  fromModel(elem: Company) {
    return {
      id: elem.id,
      name: elem.name,
      business: elem.business,
      slogan: elem.slogan,
    }
  }

  private static instance : CompanyMigrator;

  public static getInstance():CompanyMigrator{
    if(!CompanyMigrator.instance){
      CompanyMigrator.instance = new CompanyMigrator();
    }
    return CompanyMigrator.instance;
  }
}

export default CompanyMigrator.getInstance();

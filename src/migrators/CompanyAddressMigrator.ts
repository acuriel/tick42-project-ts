import IModelMigrator from "./IModelMigrator";
import CompanyAddress from "../stores/CompanyAddress";

class CompanyAddressMigrator implements IModelMigrator<CompanyAddress, any>{
  private constructor(){}

  fromResponse({id, city, country, street, state,  companyId}: any): CompanyAddress {
    return new CompanyAddress(
      id,
      city,
      country,
      street,
      state,
      companyId
    );
  }
  fromModel(elem: CompanyAddress) {
    return {
      id: elem.id,
      city: elem.city,
      country: elem.country,
      street: elem.street,
      state: elem.state,
      companyId: elem.companyId,
    }
  }

  private static instance : CompanyAddressMigrator;

  public static getInstance():CompanyAddressMigrator{
    if(!CompanyAddressMigrator.instance){
      CompanyAddressMigrator.instance = new CompanyAddressMigrator();
    }
    return CompanyAddressMigrator.instance;
  }
}

export default CompanyAddressMigrator.getInstance();

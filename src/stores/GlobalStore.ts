import CompaniesService from "services/api/CompaniesService";
import { observable, action, runInAction, computed, autorun } from "mobx";
import Company from "stores/Company";
import CompanyMigrator from "migrators/CompanyMigrator";


export default class GlobalStore{
  private _companies = observable<Company>([]);
  @observable public outdated = true;

  constructor(){
    autorun(reaction => {
      if(this.outdated){
        this.loadCompanies();
      }
      return reaction;
    })
  }

  @action
  async loadCompanies(){
    try{
      const response = await CompaniesService.getAll();
      runInAction(() => {
        this.companies.replace(
          response.data.map(
            companyData => CompanyMigrator.fromResponse(companyData)
        ));
        this.outdated = false;
      });
    }catch(error){
      console.log(error);
    }
  }

  @computed
  get companies(){
    return this._companies;
  }

  companyById(id:string){
    return this.companies.find(company => company.id === id);
  }

}

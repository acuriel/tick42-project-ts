import { observable } from "mobx";

export default class CompanyAddress{
  @observable public id:string;
  @observable public city:string;
  @observable public country:string;
  @observable public street:string;
  @observable public state:string;
  @observable public companyId:string;

  constructor(id:string = "", city:string = "", country:string = "", street:string = "", state:string = "", companyId:string = ""){
    this.id = id;
    this.city = city;
    this.country = country;
    this.street = street;
    this.state = state;
    this.companyId = companyId;
  }
}

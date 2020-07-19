import IModelMigrator from "migrators/IModelMigrator";
import AxiosApiServiceBase from "services/api/base/AxiosApiServiceBase";
import { observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export default abstract class ModelStore<T extends ModelStore<T>> {
  @observable public id:string = "";

  public constructor(public modelMigrator: IModelMigrator<T, any>, public modelService:AxiosApiServiceBase){
  }

  abstract get isValid():boolean;

  async save(){
    try {
      const payload = this.modelMigrator.fromModel(this);
      const request = this.id !== ""
        ? this.modelService.update(this.id, payload)
        : this.modelService.create({...payload, id:uuidv4()}) ;

      await request;
    } catch (error) {
      console.log(error);
    }
  }
}

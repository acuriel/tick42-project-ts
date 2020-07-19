import ModelStore from "stores/ModelStore";

export default interface IModelMigrator<T, R>{
  fromResponse(data:any):T;
  fromModel(elem:T|any):R;
}

import axios, { AxiosInstance, AxiosResponse } from 'axios';


const BASE_URL = process.env.REACT_APP_API_URL;

export const baseInstance = axios.create({
  baseURL: BASE_URL
});

export default class AxiosApiServiceBase{
  protected constructor(public baseInstance:AxiosInstance, protected modelUrl:string){}

  protected pathFromModelUrl(...paths:string[]):string{
    const sections:string[] = [];
    [this.modelUrl, ...paths].forEach(path => {
      sections.push(...path.split("/").filter(part => part.length > 0))
    });
    return sections.join("/");
  }

  get(id: string): Promise<AxiosResponse<any>>  {
    return this.baseInstance.get(this.pathFromModelUrl(id));
  }

  getAll(): Promise<AxiosResponse<any[]>>  {
    return this.baseInstance.get(this.modelUrl);
  }

  create(element:any): Promise<AxiosResponse>  {
    return this.baseInstance.post(this.modelUrl, element);
  }

  update(id:string, element:any): Promise<AxiosResponse>  {
    return this.baseInstance.put(this.pathFromModelUrl(id), element);
  }

  partialUpdate(id:string, element:any): Promise<AxiosResponse>  {
    return this.baseInstance.post(this.pathFromModelUrl(id), element);
  }

  remove(id: string): Promise<AxiosResponse> {
    return this.baseInstance.delete(this.pathFromModelUrl(id))
  }
}

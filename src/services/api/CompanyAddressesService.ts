import AxiosApiServiceBase, { baseInstance } from "./base/AxiosApiServiceBase";
import { AxiosInstance } from "axios";

class CompanyAddressesService extends AxiosApiServiceBase{
  private static instance:CompanyAddressesService ;

  private constructor(baseInstance:AxiosInstance){
    super(baseInstance, "company-addresses");
  }

  public static getInstance() : CompanyAddressesService {
    if(!CompanyAddressesService.instance){
      CompanyAddressesService.instance = new CompanyAddressesService (baseInstance);
    }
    return CompanyAddressesService.instance;
  }
}

export default CompanyAddressesService.getInstance();

import AxiosApiServiceBase, { baseInstance } from "./base/AxiosApiServiceBase";
import { AxiosInstance } from "axios";

class ProjectsService extends AxiosApiServiceBase{
  private static instance:ProjectsService;

  private constructor(baseInstance:AxiosInstance){
    super(baseInstance, "projects");
  }

  public static getInstance() : ProjectsService{
    if(!ProjectsService.instance){
      ProjectsService.instance = new ProjectsService(baseInstance);
    }
    return ProjectsService.instance;
  }
}

export default ProjectsService.getInstance();

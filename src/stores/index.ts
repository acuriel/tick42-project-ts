import React, { useState, useEffect } from "react";
import GlobalStore from "./GlobalStore";
import Company from "./Company";
import Employee from "./Employee";
import Project from "./Project";

export const StoreContext = React.createContext<GlobalStore|null>(null);

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if(!store){
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store;
}

// export const useCompany = (companyId:string|undefined) => {
//   const store = useStore();
//   if(!companyId) return undefined;
//   return store.companies.find(company => company.id === companyId) || new Company();
// }


export function useFetcher<T>(fetchFunc:(id:string) => Promise<T|undefined>, id:string, callBack?: () => void | undefined){
  const [requestResult, setRequestResult] = useState<T|undefined>(undefined);

  useEffect(() => {
    const fetchElement = async () => {
      const fetchedResult = await fetchFunc(id);
      setRequestResult(fetchedResult);
      if(callBack) callBack();
    }
    fetchElement();
  }, [id, callBack, fetchFunc]);
  return requestResult;
}

export const useEmployee = (employeeId:string, callBack?: () => void | undefined) => useFetcher(Employee.fetchById, employeeId, callBack);
export const useProject = (projectId:string, callBack?: () => void | undefined) => useFetcher(Project.fetchById, projectId, callBack);
export const useCompany = (companyId:string, callBack?: () => void | undefined) => useFetcher(Company.fetchById, companyId, callBack);

import React from 'react'
import CompaniesTree from './content-tree/CompaniesTree';
import { Flex, Box } from "@chakra-ui/core";
import { Switch, Route, useLocation } from "react-router-dom";
import CompanyDetails from './company/CompanyDetails';
import EmployeeDetails from './employee/EmployeeDetails';
import { observer } from 'mobx-react';
import ProjectDetails from './project/ProjectDetails';
import ProjectForm from './project/ProjectForm';
import EmployeeForm from './employee/EmployeeForm';

function Home() {
  const location = useLocation();

  return (
    <Flex>
      <Box flex={1} p={10} borderRight="1px solid #ddd">
        <CompaniesTree/>
      </Box>
      <Box flex={1} hidden={location.pathname === "/"} p={10}>
        <Switch>
          <Route path="/companies/:companyId">
            <CompanyDetails/>
          </Route>
          <Route path="/employees/:employeeId/edit">
            <EmployeeForm/>
          </Route>
          <Route path="/employees/:employeeId">
            <EmployeeDetails/>
          </Route>
          <Route path="/projects/:projectId/edit">
            <ProjectForm/>
          </Route>
          <Route path="/projects/:projectId">
            <ProjectDetails/>
          </Route>
        </Switch>
      </Box>
    </Flex>
  )
}

export default observer(Home)

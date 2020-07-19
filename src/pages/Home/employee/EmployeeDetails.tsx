import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Badge,
  CircularProgress,
  Flex,
} from "@chakra-ui/core";
import ProjectsList from "../company/ProjectsList";
import { useEmployee } from "stores";
import { observer } from "mobx-react";
import EditButton from "components/EditButton";

function EmployeeDetails() {
  const { employeeId } = useParams();
  const employee = useEmployee(employeeId);


  if (!employee) {
    return <CircularProgress isIndeterminate color="green" />;
  }

  return (
    <Box>
      <Flex>
        <Heading as="h3" size="lg" marginY="2" flexGrow={1}>
          {`${employee.firstName} ${employee.lastName}`}
          <Badge ml="1" variantColor="green">
            {employee?.jobType}
          </Badge>
        </Heading>
        <EditButton/>
      </Flex>
      <Heading as="h5" size="sm">
        {new Date(employee.dateOfBirth).toISOString().slice(0,10).replace(/-/g,"/")}
      </Heading>
      <Heading as="h5" size="sm">
        {employee.jobTitle}
      </Heading>
      <Heading as="h5" size="sm">
        {employee.jobArea}
      </Heading>

      <Heading as="h6" size="sm" marginY="2">
        Projects:{" "}
      </Heading>
      <ProjectsList projects={employee.projects.toJS()} />
    </Box>
  );
}

export default observer(EmployeeDetails);

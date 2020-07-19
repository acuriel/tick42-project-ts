import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Badge,
  CircularProgress,
  Flex,
} from "@chakra-ui/core";
import { observer } from "mobx-react";
import EmployeesList from "../content-tree/EmployeesList";
import EditButton from "components/EditButton";
import { useProject } from "stores";

function ProjectDetails() {
  const { projectId } = useParams();

  const project = useProject(projectId);

  if (!project) {
    return <CircularProgress isIndeterminate color="green" />;
  }

  return (
    <Box>
      <Flex>
        <Heading flexGrow={1} as="h3" size="lg" marginY="2">
          {project.name}
          <Badge ml="1" variantColor="green">
            {project.department}
          </Badge>
        </Heading>
        <EditButton/>
      </Flex>
      <Heading as="h6" size="sm" marginY="2">
        Employees:
      </Heading>
      <EmployeesList employees={project.employees}/>
    </Box>
  );
}

export default observer(ProjectDetails);

import React, { useState } from 'react'
import {
  Box,
  Heading,
  Stack,
  Tag,
  List,
  ListItem,
  ListIcon,
  Button,
  Flex,
  Input,
  IconButton,
  CloseButton,
  CircularProgress,
} from "@chakra-ui/core";
import { useParams } from 'react-router-dom'
import { useCompany } from 'stores';
import { observer } from 'mobx-react';
import { FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import ProjectsList from './ProjectsList';
import Project from 'stores/Project';


function CompanyDetails() {
  const [newProject, setNewProject] = useState<Project|undefined>(undefined);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const {companyId} = useParams();

  const company = useCompany(companyId);


  if(!company) return <CircularProgress isIndeterminate color="green" />;

  const mockNewProject = () => {
    setNewProject(new Project(company?.id));
    setShowNewProjectForm(true);
  }

  const saveProject = async () => {
    // TODO: improve this behaviour (USe Formik)
    if(newProject && newProject.isValid){
      await newProject.save()
      setShowNewProjectForm(false)
      company.fetchProjects();
    }
  }

  return (
    <Box>
      <Heading as="h3" size="lg" marginY="5">{company?.name}</Heading>
      <Stack spacing={4} isInline>
        {company?.businessTags.map(tag => (
          <Tag size="sm" key={tag} variantColor="gray">
            {tag}
          </Tag>
        ))}
      </Stack>
      <Heading as="h5" size="md" marginY="5">"{company?.slogan}"</Heading>

      <Heading as="h6" size="sm" marginY="2">Locations: </Heading>
      <List spacing={3}>
        {company?.addresses.map(address => (
          <ListItem key={address.id}>
            <ListIcon icon={FaMapMarkerAlt} color="green.500" />
            {[address.street, address.city, address.state, address.country].join(", ")}
          </ListItem>
        ))}
      </List>

      {company && <ProjectsList projects={company.projects.toJS()} removeProjectHandler={projectId => company.removeProject(projectId)}/>}
      { newProject && showNewProjectForm &&
        <Flex>
          <Input
            isInvalid={newProject.name.length === 0}
            type="text"
            value={newProject.name}
            onChange={(e:any) => newProject.name = e.target.value}/>
          <Input
            isInvalid={newProject.department.length === 0}
            type="text"
            value={newProject.department}
            onChange={(e:any) =>  newProject.department = e.target.value}/>

          <IconButton
              variantColor="teal"
              size="sm"
              aria-label="Add Project"
              icon={FaCheck}
              onClick={() => saveProject()}
            />
          <CloseButton onClick={() => setShowNewProjectForm(false)}/>
        </Flex>
      }
      {
        showNewProjectForm ||
          <Button variantColor="teal" onClick={() => mockNewProject()}>
            New Project
          </Button>
      }
    </Box>
  )
}

export default observer(CompanyDetails);

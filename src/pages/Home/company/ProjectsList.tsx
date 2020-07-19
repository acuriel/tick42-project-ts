import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Box, Stack, Button, List, ListItem, Flex, Badge, Tag, TagLabel, CloseButton } from '@chakra-ui/core';
import { FaBook, FaUser } from 'react-icons/fa';
import Project from 'stores/Project';
import { Link } from 'react-router-dom';

type Props = {
  projects: Project[],
  removeProjectHandler?: (porjectId:string) => void,
}

const useDepartments = (projects:Project[]):string[] => {
  return projects
    .map(project => project.department)
    .filter((department, index, arr) => arr.indexOf(department) === index);
}

function ProjectsList({projects, removeProjectHandler}:Props) {
  const [filters, setFilters] = useState<string[]>([]);
  const departments = useDepartments(projects);


  const toggleFilter = (filter?:string) => {
    if(!filter){
      setFilters([]);
    }else {
      const temp = filters.filter(f => f!== filter);
      setFilters(temp.length === filters.length
        ? [filter, ...filters]
        : temp
      );
    }
  }

  const removeProject = (project:Project) => {
    if(removeProjectHandler){
      removeProjectHandler(project.id)
    }
  }

  return (
    <Stack>
      <Stack isInline spacing={5}>
        <Button
          key="all-filter"
          variant={filters.length === 0 ? "solid" : "ghost"}
          onClick={() => toggleFilter()}
        >
          All
        </Button>
        {
          departments
            .map(department =>
              <Button
                key={department}
                variant={filters.includes(department) ? "solid" : "ghost"}
                onClick={() => toggleFilter(department)}
              >
                  {department}
              </Button>
            )
        }
      </Stack>
      <List>
        {projects
          .filter(project => filters.length === 0 || filters.includes(project.department))
          .map(project => (
            <ListItem key={project.id}>
              <Flex>
                <Stack isInline flexGrow={1}>
                  <Box as={FaBook} color="green.400"/>
                  <Box><Link to={`/projects/${project.id}`}>{project.name}</Link> </Box>
                  <Badge variantColor="purple">{project.department}</Badge>
                </Stack>
                <Tag variantColor="teal" rounded="full">
                  <Box as={FaUser} color="white" pr={3}/>
                  <TagLabel>{project.employeesId.length}</TagLabel>
                </Tag>
                {removeProjectHandler && <CloseButton onClick={() => removeProject(project)}/>}

              </Flex>
            </ListItem>
          ))}
      </List>
    </Stack>
  )
}

export default observer(ProjectsList);

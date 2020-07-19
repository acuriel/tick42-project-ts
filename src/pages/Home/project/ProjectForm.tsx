import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Stack,
  ButtonGroup,
  Button,
  List,
  ListItem,
  Flex,
  Text,
  CloseButton,
  Select,
  IconButton,
  CircularProgress,
} from "@chakra-ui/core";
import { useProject } from "stores";
import { observer } from "mobx-react";
import { FaUserNinja, FaCheck } from "react-icons/fa";
import Employee from "stores/Employee";


function ProjectForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [showNewEmployee, setShowNewEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Employee|undefined>(undefined);

  const { projectId } = useParams();

  const history = useHistory();
  const project = useProject(projectId);


  if(!project) return <CircularProgress isIndeterminate color="green" />;

  const saveProject = async () => {
    if(project.isValid){
      setIsSaving(true);
      try{
        await project.save();
        history.goBack();
      }catch(error){
        console.log(error)
      }
      setIsSaving(false);
    }
  }

  return (
    <Stack>
      <Heading as="h3" size="lg" marginY="2">
        Project Form
      </Heading>
      <Heading as="h4" size="md" marginY="2">
        Name
      </Heading>
      <Input isInvalid={project.name.length === 0} type="text" id="name" value={project.name} onChange={(e:any) => project.name = e.target.value}/>
      <Heading as="h4" size="md" marginY="2">
        Department
      </Heading>
      <Input isInvalid={project.department.length === 0} type="text" id="name" value={project.department} onChange={(e:any) => project.department = e.target.value} />

      <List spacing={2}>
        {project.employees.map(employee => (
          <ListItem key={employee.id}>
            <Flex>
              <Box as={FaUserNinja} color="green.500" size="20px" />
              <Text flexGrow={1}>{employee.fullName}</Text>
              <CloseButton onClick={() => project.removeEmployee(employee)}/>
            </Flex>
          </ListItem>
        ))}
        { showNewEmployee &&
          <ListItem key="add-employee">
            <Flex>
              <Select variant="flushed" placeholder="Select Employeer" onChange={e => {
                const foundEmployee = project.possibleEmployees.find(emp => emp.id === e.target.value);
                if(foundEmployee){
                  setNewEmployee(foundEmployee)}
                }}>
                {project.possibleEmployees?.map(employee => {
                  return <option value={employee.id}>{employee.fullName}</option>
                })}
              </Select>
              <IconButton
                  variantColor="teal"
                  aria-label="Add Employee"
                  size="sm"
                  icon={FaCheck}
                  onClick={() => {
                    if(newEmployee){
                      project.addEmployee(newEmployee)
                      setShowNewEmployee(false)
                    }
                  }}
                />
              <CloseButton onClick={() => setShowNewEmployee(false)}/>
            </Flex>
          </ListItem>
        }
      </List>
      { showNewEmployee || <Button variantColor="teal" variant="ghost" onClick={() => setShowNewEmployee(true)}>
        Add Employee
      </Button>}

      <Box>
        <ButtonGroup float="right" spacing={4}>
          <Button isLoading={isSaving} variantColor="teal" variant="solid" onClick={() => saveProject()}>
            Save
          </Button>
          <Button variantColor="teal" variant="outline" onClick={() => history.goBack()}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Stack>
  );
}

export default observer(ProjectForm);

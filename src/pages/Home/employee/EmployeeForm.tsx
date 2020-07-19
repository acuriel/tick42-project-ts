import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import DatePicker from 'react-date-picker';
import {
  Box,
  Heading,
  CircularProgress,
  Input,
  Grid,
  ButtonGroup,
  Button,
} from "@chakra-ui/core";
import { useEmployee } from "stores";
import { observer } from "mobx-react";

function EmployeeForm() {
  const [isSaving, setIsSaving] = useState(false);
  const { employeeId } = useParams();
  const history = useHistory();
  const employee = useEmployee(employeeId);


  if (!employee) {
    return <CircularProgress isIndeterminate color="green" />;
  }

  const saveEmployee = async () => {
    setIsSaving(true);
    try{
      await employee.save();
      history.goBack();
    }catch(error){
      console.log(error)
    }
    setIsSaving(false);
  }

  return (
    <Box>
      <Heading as="h3" size="lg" marginY="2" >
          Employee Form
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" columnGap={16} rowGap={3}>
        <Box w="100%">
          <Heading as="h4" size="md" marginY="2">
            First Name
          </Heading>
          <Input type="text" value={employee.firstName} onChange={(e:any) => employee.firstName = e.target.value}/>
        </Box>
        <Box w="100%">
          <Heading as="h4" size="md" marginY="2">
            Last Name
          </Heading>
          <Input type="text" value={employee.lastName} onChange={(e:any) => employee.lastName = e.target.value}/>
        </Box>
        <Box w="100%">
          <Heading as="h4" size="md" marginY="2">
            Birthday
          </Heading>
          <DatePicker
            value={new Date(employee.dateOfBirth)}
            onChange={(newValue) => {
              if(!Array.isArray(newValue)){
                employee.dateOfBirth = newValue
              }
              }}
            maxDate={new Date(Date.now())}/>
        </Box>
        <Box w="100%">
          <Heading as="h4" size="md" marginY="2">
            Job Title
          </Heading>
          <Input type="text" value={employee.jobTitle} onChange={(e:any) => employee.jobTitle = e.target.value}/>
        </Box>
        <Box w="100%">
          <Heading as="h4" size="md" marginY="2">
            Job Area
          </Heading>
          <Input type="text" value={employee.jobArea} onChange={(e:any) => employee.jobArea = e.target.value}/>
        </Box>
        <Box w="100%">
          <Heading as="h4" size="md" marginY="2">
            Job Type
          </Heading>
          <Input type="text" value={employee.jobType} onChange={(e:any) => employee.jobType = e.target.value}/>
        </Box>
      </Grid>

      <Box>
        <ButtonGroup float="right" spacing={4}>
          <Button isLoading={isSaving} variantColor="teal" variant="solid" onClick={() => saveEmployee()}>
            Save
          </Button>
          <Button variantColor="teal" variant="outline" onClick={() => history.goBack()}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default observer(EmployeeForm);

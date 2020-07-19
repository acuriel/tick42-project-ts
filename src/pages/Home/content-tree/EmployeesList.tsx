import React from 'react'
import {observer} from 'mobx-react'
import { Link as RouteLink } from "react-router-dom";
import { List, ListItem, ListIcon, Link } from "@chakra-ui/core";
import Employee from '../../../stores/Employee';
import {FaUserNinja} from 'react-icons/fa';


function EmployeesList({employees}:{employees:Employee[]}) {
  return (
    <List spacing={3}>
      {employees.map(employee => (
        <ListItem key={employee.id}>
          <ListIcon icon={FaUserNinja} color="green.500" />{/*
          // @ts-ignore */}
          <Link as={RouteLink} color="teal.500" to={`/employees/${employee.id}`}>
            {`${employee.firstName} ${employee.lastName} - ${employee.jobTitle}`}
          </Link>
        </ListItem>
      ))}

    </List>
  )
}

export default observer(EmployeesList);

import React, { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { observer } from "mobx-react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box,
  Stack,
  Text,
  CircularProgress,
  Heading,
  Flex,
  Input,
  Link,
} from "@chakra-ui/core";
import Company from "stores/Company";
import { hasSequentialPattern } from "../../../helpers";
import EmployeesList from "./EmployeesList";
import { FaHeartBroken } from "react-icons/fa";

function JobAreasTree({
  company,
  expanded,
}: {
  company: Company;
  expanded: boolean;
}) {
  const [searchPattern, setSearchPattern] = useState("");
  const [state, setState] = useState("initial");

  useEffect(() => {
    if (expanded && state === "initial") {
      setState("loading");
      company.fetchRelatedData().then(() => {
        setState("loaded");
      });
    }
  }, [company, expanded, state]);

  if(state !== "loaded") return <CircularProgress isIndeterminate color="green"></CircularProgress>

  return company.employees.length === 0 ? (
    <Box>
      <Heading as="h3" size="lg" marginY="5">{/*
          // @ts-ignore */}
          <Link as={RouteLink} to={`/companies/${company.id}`}>
            {company.name}
          </Link>
      </Heading>
      <Stack align="center">
        <Box as={FaHeartBroken} size="40px" color="gray.300" />
        <Text fontSize="md" padding="0" margin="0">No elements</Text>
      </Stack>
    </Box>
    ) : (
    <Box>
      <Flex alignContent="space-between">
        <Heading flex={1} as="h3" size="lg" marginY="5">{/*
          // @ts-ignore */}
          <Link as={RouteLink} to={`/companies/${company.id}`}>
            {company.name}
          </Link>
        </Heading>
        <Input flex={1} placeholder="Search..." type="text" onChange={(event:any) => setSearchPattern(event.target.value)}/>

      </Flex>
      <Heading as="h3" size="md" marginY="5">Employees by Job Area:</Heading>
      <Accordion allowToggle>
        {company.jobAreas
          .filter((jobArea) => hasSequentialPattern(searchPattern, jobArea))
          .map((jobArea) => {
            return (
              <AccordionItem key={jobArea}>
                <AccordionHeader>
                  <Box flex="1" textAlign="left">
                    {jobArea}
                  </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <EmployeesList
                    employees={company.employees.filter(
                      (employee) => employee.jobArea === jobArea
                    )}
                  />
                </AccordionPanel>
              </AccordionItem>
            );
          })}
      </Accordion>
    </Box>
  );
}

export default observer(JobAreasTree);

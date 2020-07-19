import React, { useState } from 'react';
import { observer } from "mobx-react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Flex,
  Input,
  Button,
} from "@chakra-ui/core";
import JobAreasTree from './JobAreasTree';
import { useStore } from 'stores';
import { hasSequentialPattern } from 'helpers';
import { FaSync } from 'react-icons/fa';


function CompaniesTree() {
  const [searchPattern, setSearchPattern] = useState("");
  const store = useStore();

   return (
    <Box>
      <Button isFullWidth mb={15} leftIcon={FaSync} onClick={() => store.outdated = true}>
        Reload
      </Button>
      <Flex alignContent="space-between">
        <Heading flex={1} as="h3" size="lg" marginY="5">Companies</Heading>
        <Input flex={1} placeholder="Search..."
          value={searchPattern}
          type="text"
          onChange={(event:any) => setSearchPattern(event.target.value)}/>
      </Flex>
      <Accordion defaultIndex={[]} allowMultiple>
        {store.companies
          .filter(company => hasSequentialPattern(searchPattern, company.name))
          .map(company => {
            return (
              <AccordionItem key={company.id}>
                {({isExpanded}) => (
                  <>
                    <AccordionHeader>
                      <Box flex="1" textAlign="left" color="teal.500">
                          {company.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={4}>
                      <JobAreasTree company={company} expanded={!!isExpanded}/>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            );
          })
        }
      </Accordion>
    </Box>

  )
}

export default observer(CompaniesTree);

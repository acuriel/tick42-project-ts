import React from 'react'
import { IconButton } from '@chakra-ui/core'
import { FaPen } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

function EditButton() {
  const history = useHistory();
  return (
    <IconButton
      variant="solid"
      variantColor="teal"
      aria-label="Call Sage"
      fontSize="20px"
      icon={FaPen}
      onClick={() => history.push(history.location.pathname + "/edit")}
    />
  )
}

export default EditButton

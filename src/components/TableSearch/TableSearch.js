import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

const TableSearch = (props) => {

  const [value, setValue] = useState('')

  const onChangeHandler = (event) => {
    setValue(event.target.value)
  }

  return (
    <Form >
      <InputGroup className="mb-4">
        <InputGroup.Prepend>
          <Button
            variant="outline-secondary"
            onClick={() => props.onSearch(value)}
          >Search</Button>
        </InputGroup.Prepend>
        <FormControl
          aria-describedby="basic-addon1"
          type="text"
          placeholder="Enter the text you want to find in the table"
          onChange={onChangeHandler}
        />
      </InputGroup>
    </Form>
  )
}

export default TableSearch

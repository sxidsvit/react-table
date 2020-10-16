import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button'
import { Col } from 'react-bootstrap'

const TableNewData = ({ data, setData }) => {

  // State
  const [openForm, setOpenForm] = useState(false)

  // Form's fields handlers 
  const onOpenFormHandler = () => {
    setOpenForm(true)
  }

  const onAddDataHandler = (values, isValidating, errors, touched) => {
    isValidating.validateForm()

    const id = Number(Date.now().toString().slice(10, 13))
    const newRecord = {
      id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      address: {
        streetAddress: values.streetAddress,
        city: values.city,
        state: values.state,
        zip: values.zip
      },
      description: values.description
    }

    setData([newRecord, ...data])
    setOpenForm(false)
    isValidating.resetForm()
  }

  const schema = yup.object({
    firstName: yup.string().min(2, 'Minimum 2 characters').max(60, 'Maximum 60 characters').required('Required'),
    lastName: yup.string().min(2, 'Minimum 2 characters').max(60, 'Maximum 60 characters').required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    phone: yup.string().required('Required'),
    streetAddress: yup.string().required('Required'),
    city: yup.string().required('Required'),
    state: yup.string().required('Required'),
    zip: yup.number().required('Required').typeError('Should be number').required('Required'),
    description: yup.string().required('Required')
  })

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    description: ''
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onAddDataHandler}
    >
      {({
        handleSubmit: onAddDataHandler,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        dirty,
        errors,
        isValidating,
        isSubmitting
      }) => (
          < div className="d-flex flex-column justify-content-center align-items-center pb-3">
            {
              !openForm
                ? <Button className="btn btn-success mb-3"
                  onClick={onOpenFormHandler}>
                  Create new record</Button>

                : <React.Fragment>
                  <h4 className="mb-5" style={{ color: 'red' }}  > Attension!!! All form fields must be completed</h4>
                  <Form noValidate onSubmit={onAddDataHandler}>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGroupFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" name="firstName" value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.firstName && !errors.firstName}
                          isInvalid={touched.firstName && errors.firstName}
                          placeholder="Enter first name"
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>

                      </Form.Group>

                      <Form.Group as={Col} controlId="formGroupLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" name="lastName" value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.lastName && !errors.lastName}
                          isInvalid={touched.lastName && errors.lastName}
                          placeholder="Enter last name"
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && errors.email}
                          placeholder="Enter correct email"
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGroupPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" name="phone" value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.phone && !errors.phone}
                          isInvalid={touched.phone && errors.phone}
                          placeholder="Enter phone"
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGroupStreetAddress">
                      <Form.Label>Street address</Form.Label>
                      <Form.Control type="text" name="streetAddress" value={values.streetAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.streetAddress && !errors.streetAddress}
                        isInvalid={touched.streetAddress && errors.streetAddress}
                        placeholder="Enter street address"
                      />
                      <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">{errors.streetAddress}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGroupCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.city && !errors.city}
                          isInvalid={touched.city && errors.city}
                          placeholder="Enter city"
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGroupState">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" name="state" value={values.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.state && !errors.state}
                          isInvalid={touched.state && errors.state}
                          placeholder="Enter state"
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGroupZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" name="zip" value={values.zip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.zip && !errors.zip}
                          isInvalid={touched.zip && errors.zip}
                          placeholder="Enter zip numbers"
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGroupDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows={3}
                        name="description" value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.description && !errors.description}
                        isInvalid={touched.description && errors.description}
                        placeholder="Enter your description"
                      />
                      <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="text-center">
                      <Button type="submit"
                        className="btn btn-success mt-2 mb-5"
                        disabled={!dirty || !isValid || isSubmitting}
                      >
                        Add new record</Button>
                    </Form.Group>
                  </Form>
                </React.Fragment>
            }

          </div >

        )
      }
    </Formik >
  )
}

export default TableNewData

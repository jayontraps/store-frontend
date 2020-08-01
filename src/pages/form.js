import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Container = styled.div`
  min-height: 100vh;
  padding: 100px;
`

const StyledRow = styled.div`
  position: relative;
  padding-bottom: 2rem;
  input {
    appearance: none;
    outline: none;
    display: block;
    width: 100%;
    font-sze: 1rem;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
  }
  .error-msg {
    position: absolute;
    bottom: 0.5rem;
    left: 0;
    font-size: 1rem;
    line-height: 1rem;
  }
`

const TestPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <Formik
          initialValues={{
            email: "",
            shipping_name: "",
            shipping_address: "",
            shipping_state: "",
            shipping_country: "",
            shipping_zip: "",
          }}
          validate={(values) => {
            const errors = {}
            const requiredFields = [
              "email",
              "shipping_name",
              "shipping_address",
              "shipping_state",
              "shipping_country",
              "shipping_zip",
            ]
            requiredFields.forEach((field) => {
              if (!values[field]) {
                errors[field] = "Required"
              }
            })
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address"
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <StyledRow>
                <Field type="text" name="shipping_name" placeholder="name" />
                <ErrorMessage
                  name="shipping_name"
                  component="div"
                  className="error-msg"
                />
              </StyledRow>

              <StyledRow>
                <Field type="email" name="email" placeholder="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-msg"
                />
              </StyledRow>

              <StyledRow>
                <Field
                  type="text"
                  name="shipping_address"
                  placeholder="address"
                />
                <ErrorMessage
                  name="shipping_address"
                  component="div"
                  className="error-msg"
                />
              </StyledRow>

              <StyledRow>
                <Field type="text" name="shipping_state" placeholder="state" />
                <ErrorMessage
                  name="shipping_state"
                  component="div"
                  className="error-msg"
                />
              </StyledRow>

              <StyledRow>
                <Field
                  type="text"
                  name="shipping_country"
                  placeholder="country"
                />
                <ErrorMessage
                  name="shipping_country"
                  component="div"
                  className="error-msg"
                />
              </StyledRow>

              <StyledRow>
                <Field
                  type="text"
                  name="shipping_zip"
                  placeholder="post code"
                />
                <ErrorMessage
                  name="shipping_zip"
                  component="div"
                  className="error-msg"
                />
              </StyledRow>

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  )
}

export default TestPage

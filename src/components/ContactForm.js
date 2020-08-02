import React from "react"
import { navigate } from "gatsby-link"
import styled from "@emotion/styled"
import { ErrorMessage, Field, Form, Formik } from "formik"

const StyledContactForm = styled.div`
  fieldset {
    appearance: none;
    border: none;
    padding: 0;
  }

  input[type="email"],
  input[type="text"],
  textarea {
    width: 100%;
    border: 1px solid #ccc;
    background: #fff;
    margin: 0 0 1rem;
    padding: 10px;
  }
  label {
    /* text-indent: -999rem; */
  }
`

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default function ContactForm() {
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("values: ", values)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...values,
      }),
    })
      .then(() => setSubmitting(false))
      .then(() => navigate("/thanks/"))
      .catch((error) => alert(error))
  }

  return (
    <Formik
      initialValues={{
        "bot-field": "",
        "form-name": "contact",
        email: "",
        name: "",
        message: "",
      }}
      validate={(values) => {
        const errors = {}
        const requiredFields = ["email", "name", "message"]
        requiredFields.forEach((field) => {
          if (!values[field]) {
            errors[field] = "Required field"
          }
        })
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address"
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, { setSubmitting })
      }}
    >
      <Form
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
        name="contact"
        action="/thanks/"
        noValidate
      >
        <StyledContactForm>
          <Field type="hidden" name="bot-field" />
          <Field type="hidden" name="form-name" />
          <fieldset className="field">
            <label>
              <Field placeholder="Your name" type="text" name="name" />
            </label>
            <ErrorMessage name="name" component="div" className="error-msg" />
          </fieldset>
          <fieldset className="field">
            <label>
              <Field placeholder="Your email" type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-msg"
              />
            </label>
          </fieldset>
          <fieldset className="field">
            <label>
              <Field
                component="textarea"
                placeholder="Your message"
                name="message"
              />
            </label>
            <ErrorMessage
              name="message"
              component="div"
              className="error-msg"
            />
          </fieldset>
          <p>
            <button className="button contact_form_btn" type="submit">
              Send
            </button>
          </p>
        </StyledContactForm>
      </Form>
    </Formik>
  )
}

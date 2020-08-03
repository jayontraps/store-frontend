import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { navigate } from "gatsby-link"
import styled from "@emotion/styled"

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
    margin: 1rem 0 0;
    padding: 10px;
  }
  label {
    text-indent: -999rem;
  }
  .contact_form_btn {
    margin: 1rem 0 0;
  }
`

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const ContactForm = () => {
  return (
    <StyledContactForm>
      <Formik
        initialValues={{
          name: "",
          email: "",
          message: "",
        }}
        onSubmit={(values, actions) => {
          console.log(encode({ "form-name": "contact", ...values }))
          fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", ...values }),
          })
            .then(() => {
              actions.setSubmitting(false)
              actions.resetForm()
            })
            .then(() => {
              navigate("/thanks/")
            })
            .catch((error) => {
              console.log("Error: ", error)
            })
        }}
        validate={(values) => {
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
          const errors = {}
          if (!values.name) {
            errors.name = "Name Required"
          }
          if (!values.email || !emailRegex.test(values.email)) {
            errors.email = "Valid Email Required"
          }
          if (!values.message) {
            errors.message = "Message Required"
          }
          return errors
        }}
      >
        <Form
          name="contact"
          data-netlify={true}
          netlify-honeypot="bot-field"
          data-netlify-recaptcha={true}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>
          <fieldset className="field">
            <Field type="text" placeholder="Your name" name="name" />
            <ErrorMessage component="div" className="error-msg" name="name" />
          </fieldset>

          <fieldset className="field">
            <Field type="email" placeholder="Your email" name="email" />
            <ErrorMessage component="div" className="error-msg" name="email" />
          </fieldset>

          <fieldset className="field">
            <Field
              placeholder="Your message"
              name="message"
              component="textarea"
            />
            <ErrorMessage
              component="div"
              className="error-msg"
              name="message"
            />
          </fieldset>

          <button className="button contact_form_btn" type="submit">
            Send
          </button>
        </Form>
      </Formik>
    </StyledContactForm>
  )
}

export default ContactForm

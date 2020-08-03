import React from "react"
import { navigate } from "gatsby-link"
import styled from "@emotion/styled"

const StyledContactForm = styled.form`
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
    text-indent: -999rem;
  }
`

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default function ContactForm() {
  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error))
  }

  return (
    <StyledContactForm
      name="contact"
      method="post"
      action="/thanks/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Don’t fill this out:{" "}
          <input name="bot-field" onChange={handleChange} />
        </label>
      </p>
      <fieldset className="field">
        <label>
          <input
            placeholder="Your name"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <fieldset className="field">
        <label>
          <input
            placeholder="Your email"
            type="email"
            name="email"
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <fieldset className="field">
        <label>
          <textarea
            placeholder="Your message"
            name="message"
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <p>
        <button className="button contact_form_btn" type="submit">
          Send
        </button>
      </p>
    </StyledContactForm>
  )
}

import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'
import styled from 'styled-components'

const StyledForm = styled.div`
width: 20%;
margin: 10px auto;
  form {
    text-align: right;
    font-size: 1.5rem;
    input {
      padding: 5px;
      margin: 5px;
    }
  }
`

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name needs to be 2 chars min'),
  email: yup.string().required('Email is required').email(),
  password: yup.string().required('Password is required').min(8, 'Password needs to be 8 chars min').matches( /[A-Z]/, 'Passwords must include an uppercase letter').matches( /[a-z]/, 'Passwords must include a lowercase letter').matches( /\d/, 'Passwords must include a number').matches( /\W/, 'Passwords must include a special character'),
  agree: yup.boolean().oneOf([true], 'You must agree to our terms of service to continue.')
})

function Form() {
  const [form, setForm] = useState({  name: "", email: "", agree: false, password: "" })
  const [errors, setErrors] = useState({  name: "", email: "", agree: '', password: "" })
  const [disabled, setDisabled] = useState(false)
  const [users, setUsers] = useState([])

  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
    .then(() => setErrors({...errors, [name]: ''}))
    .catch(err => setErrors({...errors, [name]: err.errors[0]}))
  }

  const handleChange = event => {
    const { checked, value, type, name} = event.target
    const valueToUse = type === 'checkbox' ? checked : value
    setFormErrors(name, valueToUse)
    setForm({ ...form, [name]: valueToUse})
  }

  useEffect(() => {
    schema.isValid(form).then(valid => setDisabled(!valid))
  }, [form])

  const submit = event => {
    event.preventDefault()
    const newUser = { name: form.name.trim(), email: form.email, agree: form.agree, password: form.password}
    axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      setForm({  name: "", email: "", agree: false, password: "" })
      console.log(res.data)
      setUsers([...users, res.data])
    })
    .catch(err => {
      debugger
    })
  }

  return(
    <StyledForm>
      <div style={{color: 'red'}}>
        <div>{errors.name}</div><div>{errors.email}</div><div>{errors.agree}</div><div>{errors.password}</div>
      </div>
      <form onSubmit={submit}>
        <div>
          <label>Name
            <input onChange={handleChange} value={form.name} id="name" name="name" type="text"/>
          </label>
        </div>
        <div>
          <label>Email
            <input onChange={handleChange} value={form.email} id="email" name="email" type="email"/>
          </label>
        </div>

        <div>
          <label>Password
            <input onChange={handleChange} value={form.password} id="password" name="password" type="password"/>
          </label>
        </div>

        <div>
          <label>Terms Of Service
            <input onChange={handleChange} checked={form.agree} id="agree" name="agree" type="checkbox"/>
          </label>
        </div>
        <button id="submit" disabled={disabled}>Submit</button>
      </form>
      <div>
        {users.length > 0 ? <pre>{JSON.stringify(users)}</pre> : null}
      </div>
    </StyledForm>
  )
}
export default Form
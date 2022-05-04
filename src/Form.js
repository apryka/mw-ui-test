import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [salary, setSalary] = useState(100)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  }

  return (
    <form onSubmit={handleSubmit}>
    <label>
      <span>Name</span>
      <input name='name' type='text' required />
    </label>
    <label>
      <span>Email</span>
      <input name='email' type='email' required />
    </label>
    <label>
      <span>Date of birth</span>
      <input name='dob' type='date' required max={new Date().toISOString().split('T')[0]} />
    </label>
    <label>
      <span>Favourite colour</span>
      <input name='colour' type='color' required />
    </label>
    <label>
      <span>Salary</span>
      <input name='salary' type='range' required min="0" max="1000" value={salary} onChange={e => setSalary(e.target.valueAsNumber)} />
      <span>{salary}£</span>
    </label>
    <button type="submit">Submit</button>
    </form>
  )
}

export default Form;

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", email: "", password: "" , room1:"", room2:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleChangeRadio = (e) => {
    const { name, id } = e.target;
    setFormValues({ ...formValues, [name]: id });

  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const verifyemail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const verifyPhoneNumber = /^\d{10}$/;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!verifyemail.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.PhoneNo) {
      errors.PhoneNo = "Phone number is required!";
    } else if (!verifyPhoneNumber.test(values.PhoneNo)) {
      errors.PhoneNo = "Phone number must be a 10-digit positive number";
    }
    if (!values.gender) {
      errors.gender = "Please select a gender!";
    }
    if (values.country === "default") {
      errors.country = "Please select a country!";
    }
    if (values.room2.length === 0 && values.room1.length === 0) {
      errors.rooms = "Please select at least one option!";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div>
          {alert('Login Successful')}
          <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        </div>
      ) : (
        <div className="ui message success">First Fill The Form!!</div>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Hotel Booking Registration Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>PhoneNo</label>
            <input
              type="number"
              name="PhoneNo"
              placeholder="PhoneNo"
              value={formValues.PhoneNo}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.PhoneNo}</p>
          <div className="field">
            <label>Gender: </label>
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="male"
              //checked={formValues.gender === "female"}
              onClick={handleChangeRadio}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              name="gender"
              id="female"
              //checked={formValues.gender === "female"}
              onClick={handleChangeRadio}
            />
          </div>
          <p>{formErrors.gender}</p>
          <div className="field">
            <label>Country</label>
            <select
              name="country"
              value={formValues.country}
              onChange={handleChange}
            >
              <option value="default" selected>(Select your country)</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Japan">Japan</option>
              <option value="UK">UK</option>
            </select>
          </div>
          <p>{formErrors.country}</p>
          <div className="field">
            <label>Rooms</label>
            <div>
              <label htmlFor="twoBedroom">Two Bedroom</label>
              <input
                type="checkbox"
                name="room1"
                id="twoBedroom"
                value="twoBedroom"
                checked={formValues.room1 === "twoBedroom"}
                onChange={handleChange}
              />
              <label htmlFor="fourBedroom">Four Bedroom</label>
              <input
                type="checkbox"
                name="room2"
                id="fourBedroom"
                value="fourBedroom"
                checked={formValues.room2 === "fourBedroom"}
                onChange={handleChange}
              />
            </div>
          </div>
          <p>{formErrors.rooms}</p>

          <button className="fluid ui button blue">Submit</button>
        </div>
      </form >
    </div >
  );
}

export default App;


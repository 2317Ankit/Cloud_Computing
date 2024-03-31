
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", email: "", password: "", PhoneNo: "", gender: "", source: "", destination: "", totalfair: "" };
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



  const calculateTotalFare = () => {
    // Implement your logic to calculate total fare here
    // For demonstration purposes, let's assume a simple fare calculation
    const fareMap = {
      Mumbai: { Delhi: 5000, Jaipur: 4000, Hubli: 3000, Goa: 2000 },
      Pune: { Delhi: 6000, Jaipur: 4500, Hubli: 3500, Goa: 2500 },
      Patna: { Delhi: 7000, Jaipur: 5000, Hubli: 4000, Goa: 3000 },
      Ranchi: { Delhi: 5500, Jaipur: 4200, Hubli: 3200, Goa: 2300 },
    };

    const { source, destination } = formValues;
    if (source && destination && fareMap[source] && fareMap[source][destination]) {
      return fareMap[source][destination];
    }

    return 0; // Default fare if source or destination is not selected
  };

  
  useEffect(() => {
    // Update the total fare whenever source or destination changes
    const fare = calculateTotalFare();
    setFormValues((prevValues) => ({ ...prevValues, totalfair: fare }));
  }, [formValues.source, formValues.destination]);


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
    if (!values.source || values.source === "default") {
      errors.source = "Please select a source!";
    }
    if (!values.destination || values.destination === "default") {
      errors.destination = "Please select a destination!";
    }
    // if (values.room2.length === 0 && values.room1.length === 0) {
    //   errors.rooms = "Please select at least one option!";
    // }
    return errors;
  };

  return (
    <div className="container">


      <form onSubmit={handleSubmit}>
        <h1>Airline Reservation System</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username: </label>
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
            <label>Password: </label>
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
            <label>Email: </label>
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
            <label>PhoneNo: </label>
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
            <label>Source: </label>
            <select
              name="source"
              value={formValues.source}
              onChange={handleChange}
            >
              <option value="default" selected>(Select your source)</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Patna">Patna</option>
              <option value="Ranchi">Ranchi</option>
            </select>
          </div>
          <p>{formErrors.source}</p>
          <div className="field">
            <label>Destination: </label>
            <select
              name="destination"
              value={formValues.destination}
              onChange={handleChange}
            >
              <option value="default" selected>(Select your destination)</option>
              <option value="Delhi">Delhi</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Hubli">Hubli</option>
              <option value="Goa">Goa</option>
            </select>
          </div>
          <p>{formErrors.destination}</p>
          { /*    <div className="field">
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
          <p>{formErrors.rooms}</p>      */}
          <div className="field">
            <label>Total Fare: </label>
            <input
              type="text"
              name="totalfair"
              value={formValues.totalfair}
              readOnly // Make it read-only
            />
          </div>

          <button className="fluid ui button blue">Submit</button>
        </div>
      </form >

      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div>
          {alert('Login Successful')}
          <div className="registration message success">{formValues.username} have registered successfully</div>
          <div className="username">Username: {formValues.username}</div>
          <div className="password">Password: {formValues.password}</div>
          <div className="username">Email: {formValues.email}</div>
          <div className="password">PhoneNo: {formValues.PhoneNo}</div>
          <div className="username">Gender: {formValues.gender}</div>
          <div className="password">Source: {formValues.source}</div>
          <div className="username">Destination: {formValues.destination}</div>
          <div className="password">Total Fare: {formValues.totalfair}</div>
       {/*   <pre>{JSON.stringify(formValues, undefined, 2)}</pre>    */}
        </div>
      ) : (
        <div className="ui message success">First Fill The Form!!</div>
      )}

    </div >
  );
}

export default App;








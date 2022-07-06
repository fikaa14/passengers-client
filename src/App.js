
import { useState } from "react";
import Passengers from "./passengers"

function App() {

  const [date, setDate]=useState(null);
  const [name, setName]=useState(null);
  const [email, setEmail]=useState(null);
  const [age, setAge]=useState(null);
  const [gender, setGender]=useState("male");
  const [destination, setDestination]=useState("UK");
  const [meal, setMeal]=useState("European");
  const [flightClass, setFlightClass]=useState("First Class");
  const [origin, setOrigin]=useState("Europe");
  const [saved, setSaved]=useState(false);

  const [qrUrl, setQrUrl]=useState(null);

  const handleSubmit=async () => {

    try {
      const body={ date, name, email, age, gender, destination, meal, flightClass, origin };
      const response=await fetch(`http://localhost:5000/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const responseJson=await response.json();
      console.log();

      const qr=await fetch(` https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${await responseJson.passengerCode} `);
      setQrUrl(qr.url);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="App">


      <input
        type="datetime-local"
        class="center"
        onChange={(e) => { setDate(e.target.value) }}
      ></input>


      <label>Destination</label>

      <select onChange={(e) => { setDestination(e.target.value) }}>
        <option>UK</option>
        <option>Europe</option>
        <option>Asian</option>
        <option>Americas</option>
      </select>

      <label>Passenger name:</label>
      <input
        type="text"
        onChange={(e) => { setName(e.target.value) }}
      ></input>
      <label>Passenger email:</label>
      <input
        type="text"
        onChange={(e) => { setEmail(e.target.value) }}
      ></input>
      <label>Passenger age:</label>
      <input
        type="number"
        onChange={(e) => { setAge(e.target.value) }}
      ></input>
      <label>Passenger gender:</label>
      <select onChange={(e) => { setGender(e.target.value) }}>
        <option>Male</option>
        <option>Female</option>
      </select>


      <label>Meal:</label>

      <select onChange={(e) => { setMeal(e.target.value) }}>
        <option>European</option>
        <option>Asian</option>
        <option>Vegeterian</option>
      </select>

      <label>Class:</label>

      <select onChange={(e) => { setFlightClass(e.target.value) }}>
        <option>First</option>
        <option>Business</option>
        <option>Economy</option>
      </select>

      <label>Passenger origin:</label>
      <select onChange={(e) => { setOrigin(e.target.value) }}>
        <option>Europe</option>
        <option>Rest of the world</option>
      </select>

      <button onClick={() => {
        setSaved(true);
        handleSubmit();
      }}>
        Save ticket
      </button>

      {saved&&<div>Genereting qr code: (this might take a while)  <img src={qrUrl} /> </div>}

      <Passengers />

    </div>



  );
}

export default App;

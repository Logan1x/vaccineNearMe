import { useState } from "react";
import axios from "axios";
import moment from "moment";

const lookup = () => {
  var date = moment().format("DD-MM-YYYY");

  const [pincode, setPincode] = useState("");
  const [age, setAge] = useState("");

  function formSubmit(e) {
    e.preventDefault();

    let config = {
      method: "get",
      url:
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" +
        pincode +
        "&date=" +
        date,
      headers: {
        accept: "application/json",
        "Accept-Language": "hi_IN"
      }
    };

    console.log(config)

    axios(config)
      .then(function (slots) {
        let sessions = slots.data.sessions;
        console.log(sessions)
        let validSlots = sessions.filter(
          (slot) => slot.min_age_limit <= age && slot.available_capacity > 0
        );
        console.log({ date: date, validSlots: validSlots.length });
        if (validSlots.length > 0) {
          console.log(validSlots);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>vaccine lookup</h1>
      <form onSubmit={formSubmit}>
        <label htmlFor="">Pincode</label>
        <input
          name="pincode"
          type="number"
          value={pincode}
          onChange={(e) => setPincode(e.currentTarget.value)}
        />
        <label htmlFor="">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.currentTarget.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <h1>Searching for {date}</h1>
      {age} : {pincode}
    </div>
  );
};

export default lookup;

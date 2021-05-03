import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const lookup = () => {
  var date = moment().format("DD-MM-YYYY");

  const [pincode, setPincode] = useState("");
  const [age, setAge] = useState("");
  const [loadData, setLoadData] = useState(false);
  const [numberofslots, setNumberOfSlots] = useState(0);
  const [centres, setCentres] = useState([]);
  const [notAvailable, setNotAvailable] = useState(false);

  const fetchUser = async (api) => {
    let response = await fetch(api)
      .then((response) => response.json())
      .then(function (slots) {
        console.log("slots:", slots);
        let sessions = slots.sessions;
        // console.log(sessions);
        let validSlots = sessions.filter(
          (slot) => slot.min_age_limit <= age && slot.available_capacity > 0
        );
        console.log({ date: date, validSlots: validSlots.length });
        if (validSlots.length > 0) {
          console.log("validslots : ", validSlots);
          setNumberOfSlots(validSlots.length);
          for (let i = 0; i < validSlots.length; i++) {
            // setCentres((oldArray) => [...oldArray, validSlots[i].name]);
            setCentres((oldarray) => [...oldarray, validSlots[i].name]);
          }
        }
        else{
          setNotAvailable(true)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // let json = await response.json();
    // console.log(json);
    return { success: true, data: response };
  };

  useEffect(() => {
    (async () => {
      console.log("Avilable centres", centres);
      var api =
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" +
        pincode +
        "&date=" +
        date;
      let res = await fetchUser(api);
      if (res.success) {
        setPincode("");
        setAge("");

        console.log("success");
        setLoadData(false);
        // setCentres([])
        // console.log("yha print", res);
      }
    })();
  }, [loadData]);

  function formSubmit(e) {
    e.preventDefault();
    setCentres([]);
    setNotAvailable(false);
    setLoadData(true);
  }

  return (
    <div>
      <div className="mw">
      <form onSubmit={formSubmit}>
        <label htmlFor="">Pincode</label>
        <input
          name="pincode"
          type="number"
          value={pincode}
          onChange={(e) => setPincode(e.currentTarget.value)}
          required
        />
        <label htmlFor="">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.currentTarget.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      </div>
      
      {centres.length ? (
        <div>
          <h3>Searching for {date}</h3>
          <h4>
            {" "}
            There are {numberofslots} slots availble for {date}, Center names are
            as follows {" "}
            <div className="flexy">
            {centres.map((item) => {
              return <li>{item}</li>;
            })}
            </div>
            
          </h4>
        </div>
      ) : (
        ''
      )}

      {notAvailable? <h2>No center availble for vaccination :(</h2> : ''}
    </div>
  );
};

export default lookup;

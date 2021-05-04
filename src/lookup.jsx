import { useState, useEffect } from "react";
import moment from "moment";

const lookup = () => {
  const [pincode, setPincode] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [loadData, setLoadData] = useState(false);
  const [numberofslots, setNumberOfSlots] = useState(0);
  const [centres, setCentres] = useState([]);
  const [notAvailable, setNotAvailable] = useState(false);

  const fetchUser = async (api) => {
    let response = await fetch(api)
      .then((response) => response.json())
      .then(function (slots) {
        // console.log("slots:", slots);
        let sessions = slots.sessions;
        // console.log(sessions);
        let validSlots = sessions.filter(
          (slot) => slot.min_age_limit <= age && slot.available_capacity > 0
        );
        console.log({ date: date, validSlots: validSlots.length });
        if (validSlots.length > 0) {
          // console.log("validslots : ", validSlots);
          setNumberOfSlots(validSlots.length);
          for (let i = 0; i < validSlots.length; i++) {
            // setCentres((oldArray) => [...oldArray, validSlots[i].name]);
            setCentres((oldarray) => [...oldarray, validSlots[i].name]);
          }
        } else {
          setNotAvailable(true);
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
      // console.log("Avilable centres", centres);
      var api =
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" +
        pincode +
        "&date=" +
        date;
      if (loadData) {
        let res = await fetchUser(api);

        if (res.success) {
          // setPincode("");
          // setAge("");
          setLoadData(false);
        }
      }
    })();
  }, [loadData]);

  function formSubmit(e) {
    e.preventDefault();
    setCentres([]);
    setNotAvailable(false);
    setLoadData(true);

    // console.log("date is : ", date)
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
            placeholder="eg:313002"
            required
          />
          <label htmlFor="">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.currentTarget.value)}
            placeholder="50"
            required
          />
          <label for="date">Date</label>
          <input
            type="date"
            name=""
            id=""
            onChange={(e) =>
              setDate(
                moment(e.currentTarget.value, "YYYY-MM-DD").format("DD-MM-YYYY")
              )
            }
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
            There are {numberofslots} center availble for {date}, Center names
            are as follows{" "}
            <div className="flexy">
              {centres.map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </div>
          </h4>
        </div>
      ) : (
        ""
      )}

      {notAvailable ? (
        <h2>No center availble for vaccination of your age :(</h2>
      ) : (
        ""
      )}
    </div>
  );
};

export default lookup;

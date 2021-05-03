import "./styles.css";
import moment from "moment";

export default function App() {
  var dateInEpochTS = 1595314414299;
  var now = moment().format('DD-MM-YYYY');
  console.log("NOW");
  console.log(now);

  return (
    <div className="App">
      <h1>Let's DOS the CoWin</h1>
      <h2>#ModijiApiRateLimitKro</h2>
    </div>
  );
}

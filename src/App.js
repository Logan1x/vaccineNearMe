import "./styles.css";
import Lookup from "./lookup";

export default function App() {
  return (
    <div className="App">
      <h1>Is there vaccine spot avaible near me?</h1>
      <Lookup />
      <footer>
        Developed by <a href="https://twitter.com/herkuch">Khushal</a> & <a href="https://twitter.com/Pandyaparthppp">Parth</a>
      </footer>
    </div>
  );
}

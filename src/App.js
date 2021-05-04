import "./styles.css";
import Lookup from "./lookup";

export default function App() {
  return (
    <div className="App">
      <div className="content">
           <h1>Locate your nearby vaccination centre</h1>
        <Lookup />
      </div>
      <footer>
        <hr />
        Developed by <a href="https://twitter.com/herkuch">
          Khushal
        </a> & <a href="https://twitter.com/Pandyaparthppp">Parth</a>
      </footer>
    </div>
  );
}

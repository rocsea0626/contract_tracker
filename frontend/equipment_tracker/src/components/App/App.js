import './App.css';
import {
    Header,
    EquipmentsList,
    Error
} from "../../components";
import {equipments} from "../../data/mock/data";


function App() {
  return (
    <div className="App">
      <Header />
      <EquipmentsList equipments={equipments}/>
    </div>
  );
}

export default App;

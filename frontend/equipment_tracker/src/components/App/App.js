import './App.css';
import {
    Header,
    EquipmentsList,
    Footer
} from "../../components";
import {equipments} from "../../data/mock/data";


function App() {
  return (
    <div className="App">
      <Header />
      <EquipmentsList equipments={equipments}/>
      <Footer />
    </div>
  );
}

export default App;

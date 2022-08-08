import {render,screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Provider} from "react-redux";
import store from "../../store";
import EquipmentsList from './EquipmentsList';
import {equipmentsFetched} from '../../reducers/equipments'

const equipmentsList = [
  {
    EquipmentNumber: "en_12345",
    Address: "address_1",
    StartDate: "start_date_1",
    EndDate: "end_date_1",
    Status: "Running",
  },
  {
    EquipmentNumber: "en_2",
    Address: "address_2",
    StartDate: "start_date_2",
    EndDate: "end_date_2",
    Status: "Stopped",
  },
  {
    EquipmentNumber: "en_3",
    Address: "address_3",
    StartDate: "start_date_3",
    EndDate: "end_date_3",
    Status: "Stopped",
  },
]

describe('EquipmentsList component', () => {
  test('Renders with initial state', () => {
    render(
        <Provider store={store}>
          <EquipmentsList />
        </Provider>
    );
    const input = screen.getByTestId('select_search_by')
    expect(input).toBeInTheDocument()
  })


  test('Renders with data', async () => {
    store.dispatch(equipmentsFetched(equipmentsList))
    const { queryAllByTestId } = render(
        <Provider store={store}>
          <EquipmentsList />
        </Provider>
    )
    const rows = await waitFor(() => queryAllByTestId('equipment_row'));
    expect(rows.length).toEqual(3)
  })

})
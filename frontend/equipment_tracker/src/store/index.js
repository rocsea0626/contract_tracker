import { configureStore } from '@reduxjs/toolkit'
import equipments from "../reducers/equipments";

export default configureStore({
    reducer: {
        equipments: equipments,
    },
})
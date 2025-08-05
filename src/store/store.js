// store kehta hai mujhe saare reducers ke baare m bata do
import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice'

const store = configureStore({
    reducer: {
        auth : authSlice,
        // TODO: add more slices here for posts
    }
})

export default store;
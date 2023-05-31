
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/authSlice"
import templateCartReducer from "./slicers/templateCartSlice"
import configDataReducer from "./slicers/configDataSlice";
import addServiceRequestReducer from "./slicers/serviceRequestSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        templatecart:templateCartReducer,
        configDataSlice:configDataReducer,
        serviceRequest: addServiceRequestReducer
    }
})

export default store
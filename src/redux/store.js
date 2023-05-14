import { legacy_createStore as createStore, applyMiddleware } from "redux";

//redux-thunk
import thunk from "redux-thunk";

//pieces reducer
import piecesReducer from "./piecesReducer/piecesReducer";


const store = createStore(piecesReducer, applyMiddleware(thunk))

export default store;
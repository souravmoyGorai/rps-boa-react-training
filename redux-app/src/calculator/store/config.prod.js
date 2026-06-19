import { legacy_createStore as createStore} from "redux";
import calcReducer from '../reducers/calcReducer'

export const store = createStore( calcReducer )

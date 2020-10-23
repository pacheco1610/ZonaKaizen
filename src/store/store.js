import {createStore} from 'redux'
import Reducers from './reducers/index'

//Para verlo en navegador
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(Reducers,composeWithDevTools())

export default store
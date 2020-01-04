import { combineReducers } from 'redux'
import parking from './parking/reducer'
import modal from './modal/reducer'

const reducers = combineReducers({
	parking,
	modal
})

export default reducers

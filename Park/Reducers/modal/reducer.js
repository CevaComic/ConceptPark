import { ActionType } from '../../Utils'

const INITIAL_STATE = {
	isOpenParking: false,
	isOpenHistory: false,
	isOpenParked: false,
	isOpenEditPrice: false,
	id: 0,
	parked: false,
}

const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionType.SET_MODAL_STATUS:
            return {
                ...state,
                [action.component]: action.status,
				id: action.id,
				parked: action.parked,
            }
		case ActionType.CLOSE_MODAL:
			return {
				...state,
				...INITIAL_STATE
			}
        default:
            return state
    }
}

export default modalReducer

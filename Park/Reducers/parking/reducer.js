import { ActionType } from '../../Utils'

const INITIAL_STATE = {
	isLoading: false,
	quality: 'HIGH',
	parkMessage: 'Park is closed',
	region: 'eu',
	infrared: false,
	open: true,
	price: "1",
	freeSpots: [0,1,2,3,4,5,6,7,8,9],
	parked: [],
	archive: [],
}

const parkReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
		case ActionType.RESET_APPLICATION:
			return {
				...state,
				...INITIAL_STATE
			}
        case ActionType.IS_LOADING:
            return {
                ...state,
                isLoading: action.status,
            }
		case ActionType.ADD_CAR:
            return {
                ...state,
                parked: state.parked.concat(action.car),
            }
		case ActionType.DELETE_CAR:
            return {
                ...state,
                parked: state.parked.filter(car => car.id !== action.id),
            }
		case ActionType.ARCHIVE_CAR:
            return {
                ...state,
                archive: state.archive.concat(action.car),
            }
		case ActionType.SET_OPTION:
			return {
				...state,
				...action.option,
			}
		case ActionType.SET_PRICE:
			return {
				...state,
				price: action.price,
			}
		case ActionType.ADD_PARKED_CAR:
			return {
				...state,
				parked: state.parked.concat(action.car)
			}
		case ActionType.REMOVE_FREE_SPOT:
			return {
				...state,
				freeSpots: [
					...state.freeSpots.slice(0, action.index),
    				...state.freeSpots.slice(action.index + 1)
				]
			}
		case ActionType.REMOVE_PARKED_CAR:
			return {
				...state,
				parked: state.parked.filter(car => car.id !== action.car.id),
				archive: state.archive.concat(action.car),
			}
		case ActionType.ADD_FREE_SPOT:
			return {
				...state,
				freeSpots: state.freeSpots.concat(action.spot)
			}
		case ActionType.SET_PARK_MESSAGE:
			return {
				...state,
				parkMessage: action.message
			}
		case ActionType.SET_LICENSE:
			return {
				...state,
				parked: state.parked.map((car) => {
					if(car.id !== action.id) return car
					return {
						...car,
						license: action.license
					}
				})
			}
        default:
            return state
    }
}

export default parkReducer

import { ActionType } from '../../Utils'

export default function parkMiddleware({ dispatch, getState }) {
  return function(next) {
	return function(action) {

		if(action.type === ActionType.TRY_ADD_PARKED_CAR) {
			const parked = getState().parking.parked
			const { license } = action
			let isParked = false
			parked.map(car => {
				if(car.license === license)
					isParked = true
			})
			if(isParked) return
		}

		next(action)


	}
  }
}

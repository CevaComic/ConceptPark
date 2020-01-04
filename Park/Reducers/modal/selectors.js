import { createSelector } from 'reselect'
import { carInformation } from '../parking/selectors'

export const isOpenParking = createSelector(
  state => state.modal.isOpenParking,
  isOpenParking => isOpenParking
)

export const isOpenParked = createSelector(
  state => state.modal.isOpenParked,
  isOpenParked => isOpenParked
)

export const isOpenHistory = createSelector(
  state => state.modal.isOpenHistory,
  isOpenHistory => isOpenHistory
)

export const isOpenEditPrice = createSelector(
  state => state.modal.isOpenEditPrice,
  isOpenEditPrice => isOpenEditPrice
)

export const carInfo = createSelector(
  state => state.modal.id,
  state => state.modal.parked,
  state => state.parking,
  (id,parked,park) => {
	  let car
	  if(parked)
		  car = park.parked.filter(car => car.id === id)
	  else
		  car = park.archive.filter(car => car.id === id)
	  car = car[0]
	  return car
  }
)

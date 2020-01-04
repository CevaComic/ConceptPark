import { createSelector } from 'reselect'
import { isOpenEditPrice } from '../modal/selectors'
import moment from 'moment'

const debug = false

function countUnique(iterable) {
  return new Set(iterable).size
}

export const analitycsSelector = createSelector(
  state => state.parking.parked,
  state => state.parking.archive,
  (parked,archive) => {
	  var totalcars = [],time = 0, money = 0, howmany = 0

	  parked.map(car => {
		  totalcars.push(car.license)
		  return totalcars
	  })

	  for(let car in archive) {
		  totalcars.push(archive[car].license)
		  money += parseFloat(archive[car].paid)
		  let end = moment(archive[car].left)
		  let startTime = moment(archive[car].time)
		  let toAdd = moment.duration(end.diff(startTime)).asMinutes()
		  time += moment.duration(end.diff(startTime)).asMinutes()
	  }

	  howmany = (!archive.length) ? 1 : archive.length
	  const average = time / howmany

	  return {
		  totalcars: totalcars.length,
		  uniquecars: countUnique(totalcars),
		  average: average.toFixed(0),
		  money: money.toFixed(2),
	  }
  }
)

export const getCars = createSelector(
  state => state.parking.parked,
  cars => {
	  if(cars.length === 10) return cars
	  let newCars = Array(10).fill().map((newCar,spot) => {
		  let isParked = cars.filter(car => car.spot === spot)
		  if(isParked.length)
		  	return isParked[0]
		  return {
			  spot: spot,
			  license: '',
		  }
	  })
	  return newCars
  }
)

export const parkMessage = createSelector(
  state => state.parking.parkMessage,
  parkMessage => parkMessage
)

export const freeSpots = createSelector(
  state => state.parking.parked,
  cars => 10 - cars.length
)

export const getPrice = createSelector(
  state => state.parking.price,
  price => price
)

export const getParkedCars = createSelector(
  state => state.parking.parked,
  cars => cars
)

export const getHistory = createSelector(
  getParkedCars,
  state => state.parking.archive,
  (parked,history) => {
	  console.log('parked', parked)
	  console.log('history', history)
	  return parked.concat(history)
  }
)

export const isLoading = createSelector(
  state => state.parking.isLoading,
  isLoading => {
	  debug && console.log('isLoading SELECTOR');
	  return isLoading
  }
)

export const qualitySelector = createSelector(
  state => state.parking.quality,
  quality => {
	  debug && console.log('qualitySelector SELECTOR');
	  return quality
  }
)

export const regionSelector = createSelector(
  state => state.parking.region,
  region => {
	  debug && console.log('regionSelector SELECTOR');
	  return region
  }
)

export const infraredSelector = createSelector(
  state => state.parking.infrared,
  infrared => {
	  debug && console.log('infraredSelector SELECTOR');
	  return infrared
  }
)

export const openSelector = createSelector(
  state => state.parking.open,
  open => {
	  debug && console.log('openSelector SELECTOR');
	  return open
  }
)

export const adminSelector = createSelector(
  qualitySelector,
  regionSelector,
  infraredSelector,
  openSelector,
  getPrice,
  isOpenEditPrice,
  (quality, region, infrared, open, price,isOpenEditPrice) => {
	  debug && console.log('adminSelector SELECTOR');
	  return {
		  quality,
		  region,
		  infrared,
		  open,
		  price,
		  isOpenEditPrice
	  }
  }
)

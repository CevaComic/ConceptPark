import {take, call, put, cancel, race, delay, takeLatest, select} from 'redux-saga/effects'
import { ActionType, getUUID } from '../../Utils'
import moment from 'moment'

export function* parkInSaga() {
	while(true){
		const { license } = yield take(ActionType.TRY_ADD_PARKED_CAR)
		yield call(parkCar, license)
	}
}

function* parkCar(license) {
	let message = 'The license plate was read'
	yield put({type:ActionType.SET_PARK_MESSAGE, message})
	yield put({type:ActionType.IS_LOADING, status: true})
	const time = moment(new Date())

	const freeSpots = yield select(state => state.parking.freeSpots)
	const index = yield Math.floor(Math.random() * (freeSpots.length - 1))
	const spot = freeSpots[index]

	const car = {
		id: getUUID(),
		license: license,
		time: time,
		spot: spot,
	}

	yield delay(3000)
	message = 'Barrier opened'
	yield put({type:ActionType.SET_PARK_MESSAGE, message})
	yield delay(3000)
	message = 'Car entered parking lot'
	yield put({type:ActionType.SET_PARK_MESSAGE, message})
	yield delay(3000)
	message = 'Barrier closed'
	yield put({type:ActionType.SET_PARK_MESSAGE, message})
	yield delay(3000)
	message = 'Car was succesfully parked in spot no. ' + (car.spot + 1)
	yield put({type:ActionType.SET_PARK_MESSAGE, message})
	yield delay(4000)

	yield put({type:ActionType.SET_PARK_MESSAGE, message: 'Park is closed'})

	yield put({type:ActionType.REMOVE_FREE_SPOT, index})
	yield put({type:ActionType.ADD_PARKED_CAR, car})

	yield put({type:ActionType.IS_LOADING, status: false})
}

export function* parkOutSaga() {
	while(true){
		const { license } = yield take(ActionType.TRY_REMOVE_PARKED_CAR)
		yield call(unParkCar, license)
	}
}

function spentTimeInPark(end,startTime) {
	var duration = moment.duration(end.diff(startTime))
	var hours = duration.asHours()
	var minutes = duration.minutes()

	minutes = (hours < 1) ? 0 : minutes
	hours = (hours < 1) ? 1 : hours

    return {
		hours,
		minutes
	}
}

function* unParkCar(license) {
	const parked = yield select(state => state.parking.parked)
	const price = yield select(state => state.parking.price)

	let toUnpark = null

	parked.map(car => {
		if(car.license === license)
			toUnpark = car
	})

	if(toUnpark === null)
		return yield put({type:ActionType.IS_LOADING, status: false})

	let message = 'The car left spot no. ' + (toUnpark.spot + 1)
	yield put({type:ActionType.SET_PARK_MESSAGE, message})
	yield put({type:ActionType.IS_LOADING, status: true})
	const time = moment(new Date())

	const { hours, minutes } = spentTimeInPark(time,toUnpark.time)
	const paid = ((hours * price) + (price/60 * minutes)).toFixed(2)

	let car = {
		id: toUnpark.id,
		license: toUnpark.license,
		time: toUnpark.time,
		left: time,
		paid: paid,
		price: price,
	}

	yield delay(3000)
	message = 'Waiting for payment...'
	yield put({type:ActionType.SET_PARK_MESSAGE, message})
	const {paymentStatus} = yield take(ActionType.DO_PAYMENT)

	if(!paymentStatus) {
		message = 'Payment was canceled'
		yield put({type:ActionType.SET_PARK_MESSAGE, message})
		yield delay(4000)
		yield put({type:ActionType.SET_PARK_MESSAGE, message: 'Park is closed'})
		yield put({type:ActionType.IS_LOADING, status: false})
		return
	}

	message = 'Received $' + paid + ' from license plate : ' + license
	yield put({type:ActionType.SET_PARK_MESSAGE, message})
	yield delay(3000)
	message = 'Barrier opened'
	yield put({type:ActionType.SET_PARK_MESSAGE, message})
	yield delay(3000)
	message = 'Car exited the parking lot successfully'
	yield put({type:ActionType.SET_PARK_MESSAGE, message})
	yield delay(3000)
	message = 'Barrier closed'
	yield put({type:ActionType.SET_PARK_MESSAGE, message})
	yield delay(3000)
	yield put({type:ActionType.SET_PARK_MESSAGE, message: 'Park is closed'})

	yield put({type:ActionType.ADD_FREE_SPOT, spot:toUnpark.spot})
	yield put({type:ActionType.REMOVE_PARKED_CAR, car})

	yield put({type:ActionType.IS_LOADING, status: false})
}

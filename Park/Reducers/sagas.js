// import {takeEvery, select} from 'redux-saga/effects'
import { all } from 'redux-saga/effects'
import { parkInSaga,parkOutSaga } from './parking/saga'
//
// function addZero(x, n) {
//   while (x.toString().length < n) {
//     x = "0" + x;
//   }
//   return x;
// }
//
// function printDate() {
//   var d = new Date();
//   var h = addZero(d.getHours(), 2);
//   var m = addZero(d.getMinutes(), 2);
//   var s = addZero(d.getSeconds(), 2);
//   var ms = addZero(d.getMilliseconds(), 3);
//   return h + ":" + m + ":" + s + ":" + ms;
// }
//
// function* loggerSaga() {
//     yield takeEvery('*', function* logger(action) {
//         console.log("ACTION LOGGER ", action, printDate())
//         // for better debug , return any part of state we're debugging
//         const state = yield select(state => state)
//         console.log("STATE LOGGER", state)
//     })
// }

export default function* sagas() {
    yield all([
		// loggerSaga(),
		parkInSaga(),
		parkOutSaga(),
	])
}

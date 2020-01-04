import { ActionType } from '../../Utils'

export const setIsLoading = status => ({type: ActionType.IS_LOADING, status})

export const setOption = option => ({type: ActionType.SET_OPTION, option})

export const setPrice = price => ({type: ActionType.SET_PRICE, price})

export const setLicense = ({license,id}) => ({type: ActionType.SET_LICENSE, license, id})

export const parkTheCar = license => ({type: ActionType.TRY_ADD_PARKED_CAR, license})

export const unParkTheCar = license => ({type: ActionType.TRY_REMOVE_PARKED_CAR, license})

export const resetApplication = () => ({type: ActionType.RESET_APPLICATION })

export const deleteCar = id => ({type:ActionType.DELETE_CAR, id})

export const doPayment = paymentStatus => ({type:ActionType.DO_PAYMENT, paymentStatus})

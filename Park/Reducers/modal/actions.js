import { ActionType } from '../../Utils'

export const setModalStatus = ({component,status,id,parked}) => ({type: ActionType.SET_MODAL_STATUS, component, status, id, parked})

export const closeModal = () => ({type: ActionType.CLOSE_MODAL })

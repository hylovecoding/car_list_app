import * as types from '../constants/ActionTypes'

export const addCar = (manufacturer, make, model, year) => ({ type: types.ADD_CAR, manufacturer, make, model, year })
export const deleteCar = id => ({ type: types.DELETE_CAR, id })
export const editCar = (manufacturer, make, model, year, id) => ({ type: types.EDIT_CAR, id, manufacturer, make, model, year })
export const sorting = (sortKey) => ({ type: types.SORT_CAR, sortKey })
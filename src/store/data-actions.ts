import {faker} from '@faker-js/faker'
import {Dispatch} from "redux"
import {AppThunk} from "./reducers"

export const SET_DATA = 'SET_DATA'
export const FILTER_LOADING = 'FILTER_LOADING'

const generateRandomItem = (i: number) => ({
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email()
})

const getRows = (num: number) => {
    let items = []
    for (let i = 0, l = num; i < l; i++) {
        items.push(generateRandomItem(i))
    }
    return items
}

const count = 10000
const rows = getRows(count)

export const fetchData = () => async (dispatch: Dispatch) => {
   await dispatch({ type: SET_DATA, data: rows })
};

export const fetchFilterData = (value: string): AppThunk => async (dispatch: Dispatch) => {
    dispatch({type: FILTER_LOADING, filterLoading: true})
    const result = rows.filter(({name, lastName}) => {
        return name.startsWith(value) || lastName.startsWith(value)
    })

    await setTimeout(() => {
        dispatch({ type: SET_DATA, data: result })
        dispatch({type: FILTER_LOADING, filterLoading: false})
    }, 1000)
}
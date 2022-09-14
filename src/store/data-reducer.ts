import {SET_DATA, FILTER_LOADING} from "./data-actions"

export type ApplicationState = Readonly<{
    tableData: []
    isInitialization: boolean
    isFilterLoading: boolean
}>

const initialState: ApplicationState = {
    tableData: [],
    isInitialization: false,
    isFilterLoading: false,

}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_DATA: {
            const tableData = action.data
            return {
                ...state,
                tableData,
                isInitialization: true
            }
        }
        case FILTER_LOADING: {
            const filterLoading = action.filterLoading
            return {
                ...state,
                isFilterLoading: filterLoading
            }
        }
        default:
            return state
    }
}
import { Action, combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'
import dataReducer from './data-reducer'

export const rootReducer = combineReducers({dataReducer})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >

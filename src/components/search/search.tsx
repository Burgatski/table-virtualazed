import React from 'react'
import { Box, InputAdornment, TextField } from '@mui/material'
import Search from '@mui/icons-material/Search'

export interface SearchBarProps {
    onSort: (innerValue: string) => void
    startSearchNumber: number
    searchCounter: number
}
export const SearchBar = ({onSort, startSearchNumber, searchCounter}: SearchBarProps) => {

    const handleChangeValue = (value:string) => {
        if (value.length > startSearchNumber) {
            onSort(value)
        } else {
            onSort('')
        }
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
        >
            <TextField
                id="input"
                variant="outlined"
                label="Search"
                size="small"
                onChange={(e) => {handleChangeValue(e.target.value)}}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                id="counter"
                variant="outlined"
                label="Found"
                size="small"
                disabled
                value={searchCounter}
            />
        </Box>
    )
}
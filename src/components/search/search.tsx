// @ts-nocheck
import React from 'react'
import { Box, InputAdornment, TextField } from '@mui/material'
import Search from '@mui/icons-material/Search';

export const SearchBar = ({onSort, startSearchNumber, searchCounter}: any) => {
    const [innerValue, setInnerValue] = React.useState([])

    React.useEffect(() => {
            if(innerValue.length > startSearchNumber){
                onSort(innerValue)
            } else {
                onSort('')
            }},
        [innerValue])

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
                value={innerValue}
                onChange={(e) => setInnerValue(e.target.value)}
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
                readOnly
                value={searchCounter}
            />
        </Box>
    )
}
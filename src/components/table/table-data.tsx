import React from "react"
import Highlighter from "react-highlight-words"
import {useDispatch, useSelector} from "react-redux"
import {Column, TableHeaderProps, TableCellRenderer} from "react-virtualized"
import styled from "styled-components"
import {TableContainer, CircularProgress} from '@mui/material'
import MuiTableCell from '@mui/material/TableCell'
import {TableView} from "./table-view"
import {SearchBar} from "../search"
import {fetchData, fetchFilterData} from "../../store/data-actions"
import 'react-virtualized/styles.css'
import {ApplicationState} from "../../store/data-reducer"

const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`

const TableCell = ({children}: { [key: string]: React.ReactNode }) => (
    <MuiTableCell
        component="div"
        sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            cursor: 'initial'
        }}
        variant="body"
    >
        {children}
    </MuiTableCell>
)

export const Table = () => {
    const dispatch = useDispatch()
    const rowData = useSelector<{dataReducer: ApplicationState}>((state) => state.dataReducer.tableData)
    const isLoadingData = useSelector<{dataReducer: ApplicationState}>((state) => state.dataReducer.isInitialization)
    const isFilterLoading = useSelector<{dataReducer: ApplicationState}>((state) => state.dataReducer.isFilterLoading)

    const [selectedKeys, setSelectedKeys] = React.useState<string[]>([])
    const [list, setList] = React.useState<{[key: string]:string|number}[]|any>([])

    React.useEffect(() => {
         dispatch(fetchData())
    }, [dispatch])

    React.useEffect(() => {
        setList(rowData)
    }, [rowData, isLoadingData])

    const tableCellRenderer: TableCellRenderer = ({cellData}) => {
        return (
            <TableCell>
                <Highlighter
                    highlightStyle={{backgroundColor: "#f3ff69", padding: 0}}
                    searchWords={selectedKeys}
                    autoEscape
                    textToHighlight={cellData}
                />
            </TableCell>
        )
    }

    const onSort = React.useCallback((value: string) => {
        if (value !== '') {
            dispatch(fetchFilterData(value))
        } else {
            dispatch(fetchData())
        }
    },[dispatch])

    const headerRenderer = ({label}: TableHeaderProps) => <TableCell>{label}</TableCell>

    const getRowStyles = (): React.CSSProperties => {
        return {
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            boxShadow: 'none'
        }
    }

    const columns = [
        {
            dataKey: 'name',
            label: 'Name',
            width: 100,
            cellRenderer: tableCellRenderer
        },
        {
            dataKey: 'lastName',
            label: 'LastName',
            width: 100,
            cellRenderer: tableCellRenderer
        },
        {
            dataKey: 'phone',
            label: 'Phone',
            width: 200
        },
        {
            dataKey: 'email',
            label: 'Email',
            width: 300
        }
    ]
    console.log('isFilterLoading')
    return (
        <TableContainer>
            <SearchBar
                onSort={(searchValue: string) => {
                    setSelectedKeys([searchValue])
                    onSort(searchValue)
                }}
                startSearchNumber={2}
                searchCounter={list.length}
            />
            {(!isLoadingData || isFilterLoading) ? <Loader>
                    <CircularProgress/>
                </Loader> :
            <TableView
                rowHeight={40}
                headerHeight={50}
                rowCount={list.length}
                rowGetter={({index}: any) => list[index]}
                rowStyle={getRowStyles}
            >
                {columns.map(({dataKey, cellRenderer, ...other}) => {
                    return (
                        <Column
                            style={{display: 'flex', alignItems: 'center', boxSizing: 'border-box'}}
                            key={dataKey}
                            headerRenderer={headerRenderer}
                            cellRenderer={cellRenderer}
                            dataKey={dataKey}
                            {...other}
                        />
                    );
                })}
            </TableView>
            }
        </TableContainer>
    )
}
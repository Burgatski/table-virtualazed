import React from "react";
import Highlighter from "react-highlight-words";
import {Column, TableHeaderProps, TableCellRenderer} from "react-virtualized";
import styled from "styled-components";
import {faker} from '@faker-js/faker';
import {TableContainer} from '@mui/material';
import MuiTableCell from '@mui/material/TableCell';
import {TableView} from "./table-view";
import {SearchBar} from "../search";
import 'react-virtualized/styles.css'

const Wrapper = styled.div`
  margin: 10px;
`

const generateRandomItem = () => ({
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email()
})

const getRows = (num: number) => {
    let items = []
    for (let i = 0, l = num; i < l; i++) {
        items.push(generateRandomItem())
    }
    return items
}

const count = 10000
const rows = getRows(count)

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
    const [selectedKeys, setSelectedKeys] = React.useState<any[]>([])
    const [data,] = React.useState(rows)
    const [sortedList, setSortedList] = React.useState(rows)
    const [loading, setLoading] = React.useState(true)

    const tableCellRenderer: TableCellRenderer = ({cellData}) => {
        return (
            <TableCell>
                <Highlighter
                    highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
                    searchWords={selectedKeys}
                    autoEscape
                    textToHighlight={cellData}
                />
            </TableCell>
        );
    };

    const onSort = (value: string) => {
        if (value !== '') {
            setLoading(false)
            const result = data.filter(({name, lastName}) => {
                return name.startsWith(value) || lastName.startsWith(value)
            })
            setTimeout(() => {
                setSortedList(result)
                setLoading(true)
            }, 1000)
        } else {
            setSortedList(data)
        }
    }

    const headerRenderer = ({label}: TableHeaderProps) => <TableCell>{label}</TableCell>

    const getRowStyles = (): React.CSSProperties => {
        return {
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            boxShadow: 'none'
        };
    };

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
    ];

    return (
        <TableContainer>
            <SearchBar
                onSort={(searchValue: string) => {
                    setSelectedKeys([searchValue])
                    onSort(searchValue)
                }}
                startSearchNumber={2}
                searchCounter={sortedList.length}
            />
            {loading &&
            <TableView
                rowHeight={40}
                headerHeight={50}
                rowCount={sortedList.length}
                rowGetter={({index}: any) => sortedList[index]}
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
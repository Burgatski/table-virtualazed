import React from "react";
import {AutoSizer, Index, Table, WindowScroller} from "react-virtualized";

export interface TableViewProps {
    children: JSX.Element|JSX.Element[]
    headerHeight: number
    rowCount: number
    rowGetter: (params: Index) => any
    rowHeight: number | ((params: Index) => number)
    rowStyle: {[key: string]: React.CSSProperties} | ((params: Index) => React.CSSProperties)
}
export const TableView = (props: TableViewProps) => (<WindowScroller>
            {({height, isScrolling, onChildScroll, scrollTop}) => (
                <AutoSizer disableHeight>
                    {({width}) => ( <Table
                                autoHeight
                                width={width}
                                height={height}
                                isScrolling={isScrolling}
                                onScroll={onChildScroll}
                                scrollTop={scrollTop}
                                {...props}
                            />
                        )
                    }
                </AutoSizer>
            )}
        </WindowScroller>
)
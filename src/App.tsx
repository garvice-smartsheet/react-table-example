import * as React from 'react';
import ReactTable, { Column } from 'react-table';
import 'react-table/react-table.css?raw';

// import * as classes from './App.css';

interface Board {
    name: string;
    description: string;
    columns: BoardColumn[];
    rows: BoardRow[];
}

interface BoardColumn {
    columnId: number;
    name: string;
    ordinal: number;
    type: string;
    options?: string[];
    contactOptions?: Contact[];
}

interface BoardRow {
    cells: BoardCell[];
}

interface BoardCell {
    columnId: number;
    value: string | Contact | number;
}

interface Contact {
    name: string;
    email: string;
}

interface AppState {
    board: Board;
}

class App extends React.Component {

    public state: AppState = {
        board: {
            name: 'It Ticketing',
            description: 'something descriptive',
            columns: [
                {
                    columnId: 0,
                    name: 'Status',
                    ordinal: 0,
                    type: 'picklist',
                    options: [
                        'Open',
                        'Closed',
                        'Resolved',
                    ],
                },
                {
                    columnId: 1,
                    name: 'Issue',
                    ordinal: 1,
                    type: 'string',
                },
                {
                    columnId: 2,
                    name: 'Date',
                    ordinal: 2,
                    type: 'Date',
                },
                {
                    columnId: 3,
                    name: 'Tech Assigned',
                    ordinal: 3,
                    type: 'contact',
                    contactOptions: [
                        {
                            email: 'john.smith@email.com',
                            name: 'John Smith',
                        },
                        {
                            email: 'jane.stevens@email.com',
                            name: 'Jane Stevens',
                        },
                        {
                            email: 'tina.cruz@email.com',
                            name: 'Tina Cruz',
                        },
                    ],
                },
                {
                    columnId: 4,
                    name: 'Status',
                    ordinal: 4,
                    type: 'picklist',
                    options: [
                        '1 - URGENT - I\'m Down',
                        '2 - I\'m Inconvenienced',
                        '3 - I Can Wait',
                    ],
                },
                {
                    columnId: 5,
                    name: 'Ticket Id',
                    ordinal: 5,
                    type: 'string',
                },
            ],
            rows: [
                {
                    cells: [
                        {
                            columnId: 0,
                            value: 'Open',
                        },
                        {
                            columnId: 1,
                            value: 'Computer is having serious issues. It’s lagging and not responding',
                        },
                        {
                            columnId: 2,
                            value: 1520899200000,
                        },
                        {
                            columnId: 3,
                            value: {
                                email: 'john.smith@email.com',
                                name: 'John Smith',
                            },
                        },
                        {
                            columnId: 4,
                            value: '1 - URGENT - I’m Down',
                        },
                        {
                            columnId: 5,
                            value: 'HD - 102',
                        },
                    ],
                },
                {
                    cells: [
                        {
                            columnId: 0,
                            value: 'Open',
                        },
                        {
                            columnId: 1,
                            value: 'Mouse is having serious issues',
                        },
                        {
                            columnId: 2,
                            value: 1521072000000,
                        },
                        {
                            columnId: 3,
                            value: {
                                email: 'jane.stevens@email.com',
                                name: 'Jane Stevens',
                            },
                        },
                        {
                            columnId: 4,
                            value: '2 - I’m Inconvenienced',
                        },
                        {
                            columnId: 5,
                            value: 'HD - 116',
                        },
                    ],
                },
                {
                    cells: [
                        {
                            columnId: 0,
                            value: 'Open',
                        },
                        {
                            columnId: 1,
                            value: 'Sketch is lagging/skipping',
                        },
                        {
                            columnId: 2,
                            value: 1521244800000,
                        },
                        {
                            columnId: 3,
                            value: {
                                email: 'tina.cruz@email.com',
                                name: 'Tina Cruz',
                            },
                        },
                        {
                            columnId: 4,
                            value: '3 - I can wait',
                        },
                        {
                            columnId: 5,
                            value: 'HD - 117',
                        },
                    ],
                },
            ],
        },
    };

    constructor(props: any) {
        super(props);
    }

    public render(): React.ReactNode {

        return (
            <ReactTable
                data={this.state.board.rows}
                columns={this.getColumns()}
            />
        );
    }

    private getColumns(): Column[] {
        return this.state.board.columns.map(column => ({
                id: column.columnId.toString(),
                Header: column.name,
                accessor: (d: any) => this.getCellValue(d.cells.find((cell: BoardCell) => cell.columnId === column.columnId).value),
                Cell: (props: any) => <span className="number">{props.value}</span>,
                headerClassName: '',
                headerStyle: {},
            }),
        );
    }

    private getCellValue(cell: string | Contact): string | number {
        if (Object.keys(cell).find(key => key === 'name')) {
            return (cell as Contact).name;
        }

        return cell.toString();
    }
}

export default App;

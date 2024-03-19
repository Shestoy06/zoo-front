import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import TableDeleteButton from "../../../ui/Buttons/TableDeleteButton/TableDeleteButton";
import TableModifyButton from "../../../ui/Buttons/TableModifyButton/TableModifyButton";
import TableSaveButton from "../../../ui/Buttons/TableSaveButton/TableSaveButton";
import TableNewButton from "../../../ui/Buttons/TableNewButton/TableNewButton";

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};

const initialRows = [
    {
        id: randomId(),
        name: randomTraderName(),
        age: 25,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 36,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 19,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 28,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 23,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
];

// Add new item
function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer style={{display: "flex", justifyContent: "flex-end", paddingRight: 20, paddingTop: 10}}>
            <TableNewButton onClick={handleClick}/>
        </GridToolbarContainer>
    );
}

export default function FullFeaturedCrudGrid() {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 180, editable: true, flex: 1,
            align: 'center',
            headerAlign: 'center', },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1
        },
        {
            field: 'joinDate',
            headerName: 'Join date',
            type: 'date',
            width: 180,
            editable: true,
            flex: 1
        },
        {
            field: 'role',
            headerName: 'Department',
            width: 220,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Market', 'Finance', 'Development'],
            flex: 1
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            disableClickEventBubbling: true,
            flex: 1,
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <TableSaveButton onClick={handleSaveClick(id)}/>,
                        <TableDeleteButton onClick={handleCancelClick(id)}/>,
                    ];
                }

                return [
                    <TableModifyButton onClick={handleEditClick(id)}/>,
                    <TableDeleteButton onClick={handleDeleteClick(id)}/>
                ];
            },
        },
    ];

    return (
        <div style={{width: '100%', backgroundColor: "white", borderRadius: 10}}>
            <DataGrid

                sx={{
                    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                        outline: "none",
                    },
                    ".MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within": {
                        background: "rgba(227, 227, 227, 0.2)",
                        outline: "none"
                    },
                    ".MuiDataGrid-cell": {
                    },
                    ".MuiDataGrid-row--editing": {
                        boxShadow: "none",
                        border: "solid 5px rgba(227, 227, 227, 0.4) !important",
                    },
                    ".MuiDataGrid-row": {
                        transition: "all 0.3s",
                        border: "solid 0px rgba(227, 227, 227, 0.4)"
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(3, 196, 3, 1) !important",
                        borderWidth: 0
                    },
                    ".MuiSelect-select": {
                        border: "none !important"
                    },
                    ".MuiDataGrid-actionsCell button:hover": {
                        backgroundColor: "none"
                    },
                    "& .MuiDataGrid-row:hover": {
                        transition: "all 0.2s",
                        backgroundColor: "white !important"
                    },
                    "& .MuiDataGrid-row": {
                        backgroundColor: "white !important",
                        transition: "all 0.3s",

                    }

                }}
                style={{borderStyle: "unset", height: 'calc(100vh - 100px)'}}
                rows={rows}
                rowHeight={80}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                disableSelectionOnClick
                disableRowSelectionOnClick

                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </div>
    )
}
import * as React from 'react';
import s from './CrudTable.module.css'
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridRowEditStopReasons,
    gridExpandedSortedRowIdsSelector,
    gridVisibleColumnDefinitionsSelector,
} from '@mui/x-data-grid';
import {useGridApiRef,} from '@mui/x-data-grid-pro';
import TableModifyButton from "../Buttons/TableModifyButton/TableModifyButton";
import TableDeleteButton from "../Buttons/TableDeleteButton/TableDeleteButton";
import TableSaveButton from "../Buttons/TableSaveButton/TableSaveButton";
import TableNewButton from "../Buttons/TableNewButton/TableNewButton";
import {useEffect, useRef, useState} from "react";
import TableCancelButton from "../Buttons/TableCancelButton/TableCancelButton";
import {Box, CircularProgress} from "@mui/joy";
import {gridClasses} from "@mui/system";
import toast from "react-hot-toast";
import {styled} from "@mui/material";
import ImageModal from "../Modal/ImageModal";

const CrudTable = ({columns, data,
                       onDelete, onCreate, onUpdate,
                       title, withToolBar, autoHeight = false,
                       imageModal = false, postImage, getImages, imageData, deleteImage}) => {

    const [rows, setRows] = React.useState(data);
    const [rowModesModel, setRowModesModel] = React.useState({});


    const apiRef = useGridApiRef();


    const [page, setPage] = useState(0);

    const [editedRow, setEditedRow] = useState(null);

    const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

    const [lastId, setLastId] = useState(rows.length ? rows[rows.length - 1].id : 0)

    const handleCellEditStart = (params) => {
        // Store the currently edited row when cell editing starts
        setEditedRow(params.id);
    };

    const handleCellEditStop = () => {
        // Clear the edited row when cell editing stops
        setEditedRow(null);
    };


    function CustomEditComponent(props) {

        const { id, value, field, hasFocus, colDef } = props;
        const ref = React.useRef();

        const column = columns.find(col => col.field === props.field);
        const placeholder = column ? `Enter ${column.headerName}` : '';

        React.useLayoutEffect(() => {
            if (hasFocus) {
                ref.current.focus();
            }
        }, [hasFocus]);

        const handleValueChange = (event) => {
            const newValue = event.target.value; // The new value entered by the user
            apiRef.current.setEditCellValue({ id, field, value: newValue });
        };

        let type;

        switch (colDef.type) {
            case "dateTime":
                type = "datetime-local"
                break;
            case "singleSelect":
                return (
                    <select required className={s.input} ref={ref} value={value} onChange={handleValueChange}>
                        <option value={""}>Select</option>
                        {colDef.valueOptions.map(option => <option value={option}>{option}</option>)}
                    </select>
                );
            default:
                type = "text"
                break;
        }

        return <input required className={s.input} ref={ref} placeholder={placeholder} type={type} value={value} onChange={handleValueChange} />;
    }

    const scrollToTop = () => {
        apiRef.current.setPage(0);
        apiRef.current.scrollToIndexes(1,1);
    }

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    columns = [...columns,
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 180,
            align: 'center',
            cellClassName: 'actions',
            disableClickEventBubbling: true,
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <TableSaveButton onClick={handleSaveClick(id)}/>,
                        <TableCancelButton onClick={handleCancelClick(id)}/>,
                    ];
                }

                if(imageModal) {
                    return [
                        <TableModifyButton onClick={handleEditClick(id)}/>,
                        <TableDeleteButton onClick={handleDeleteClick(id)}/>,
                        <ImageModal id={id} postImage={postImage} getImages={getImages} imageData={imageData} deleteImage={deleteImage}/>
                    ];
                }

                return [
                    <TableModifyButton onClick={handleEditClick(id)}/>,
                    <TableDeleteButton onClick={handleDeleteClick(id)}/>,
                ];
            },
        },]

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        onDelete(id)
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setButtonIsDisabled(false)
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {

        let error = false

        Object.values(newRow).forEach(value => {
            if(value === undefined || value === "") {    // Can't put value === false, because of isNew that can be equal to false
                error = true
            }
        })

        if(!error) {
            if(newRow.isNew) {
                onCreate(newRow)
                setLastId(newRow.id)
            } else {
                onUpdate(newRow)
            }
            return { ...newRow, isNew: false };
        } else {
            toast.error("Fields are null or invalid")
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    return (
        <div>
            <div>
                <h1 style={{textDecoration: "underline", textDecorationColor: "#03c403", marginLeft: 20}}>{title}</h1>
            </div>
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
                        ".MuiDataGrid-cell": {},
                        ".MuiDataGrid-row--editing": {
                            boxShadow: "none",
                            border: "solid 5px rgba(227, 227, 227, 0.4) !important",
                            transition : "none !important"
                        },
                        ".MuiDataGrid-row": {
                            border: "solid 0px rgba(227, 227, 227, 0.4)",
                            transition : "none !important"
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

                        },
                        '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
                        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
                        '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },


                    }}
                    style={{borderStyle: "unset", height: 'calc(100vh - 180px)'}}
                    rows={rows}
                    apiRef={apiRef}
                    getRowHeight={() => autoHeight ? 'auto' : ''}
                    rowHeight={80}
                    columns={columns.map(column => ({
                        ...column,
                        renderEditCell: (params) => (
                            <CustomEditComponent {...params} />
                        ),
                    }))}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    disableSelectionOnClick
                    disableRowSelectionOnClick

                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}

                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 25},
                        },
                    }}

                    pageSizeOptions={[5, 10, 25]}
                    onPageChange={(newPage) => setPage(newPage)}

                    onCellEditStart={handleCellEditStart}
                    onCellEditStop={handleCellEditStop}

                    slots={{
                        toolbar: EditToolbar,
                        noRowsOverlay: CustomNoRowsOverlay,
                    }}
                    slotProps={{
                        toolbar: {setRows, setRowModesModel, rows, scrollToTop, lastId, withToolBar, buttonIsDisabled, setButtonIsDisabled},
                    }}
                />
            </div>

        </div>
    )


};

export default CrudTable;

// Add new item
function EditToolbar(props) {
    const {setRows, setRowModesModel, rows, scrollToTop, lastId, withToolBar, buttonIsDisabled, setButtonIsDisabled} = props;

    const handleClick = () => {

        setButtonIsDisabled(true)

        const id = lastId + 1;

        //setTimeout(() => scrollToTop(), 1);

        setRows((oldRows) => {
            return [{id, isNew: true}, ...oldRows,]
        })

        setRowModesModel((oldModel) => ({
            [id]: {mode: GridRowModes.Edit, fieldToFocus: 'name'},
            ...oldModel,
        }));

    };

    if(withToolBar) {
        return (

            <GridToolbarContainer style={{display: "flex", justifyContent: "flex-end", paddingRight: 20, paddingTop: 10}}>
                <TableNewButton disabled={buttonIsDisabled} onClick={handleClick}/>
            </GridToolbarContainer>
        );
    }
}

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));

function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <Box sx={{ mt: 1 }}>No Rows</Box>
        </StyledGridOverlay>
    );
}


import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useAnimals} from "../../../hooks/useAnimals";
import {format} from "date-fns";
import {gridClasses} from "@mui/system";
import {Button} from "@mui/material";

const ReportsDataTable = () => {

    const {isLoading, error, data: animal} = useAnimals()


    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 100, align: 'center', headerAlign: 'center', flex: 1 },
        { field: 'name', headerName: 'Animal', minWidth: 100, align: 'center', headerAlign: 'center', flex: 1 },
        { field: 'date', headerName: 'Date', minWidth: 100, align: 'center', headerAlign: 'center', flex: 1 },
        { field: 'review', headerName: 'Review', minWidth: 100, align: 'center', headerAlign: 'center', flex: 1 },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api = params.api;
                    const thisRow = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );

                    return alert(JSON.stringify(thisRow, null, 4));
                };

                return <Button onClick={onClick}>Click</Button>;
            }
        },
    ];

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

    const rows = []
    animal.forEach(animal => {
        if (animal.animalReviews.length) {
            animal.animalReviews.forEach(review => {
                rows.push(({ id: review.id, name: animal.name, date: format(new Date(review.date ), 'dd-MM-yyyy'), review: review.review,}))
            })
        }
    })


    function DataTable() {
        return (
            <div>
                <div><h1 style={{textDecoration: "underline", textDecorationColor: "#03c403", marginLeft: 20}}>Veterinarian reports</h1></div>
                <div style={{width: '100%', backgroundColor: "white", borderRadius: 10}}>
                    {rows.length ?
                        <DataGrid
                            style={{borderStyle: "unset", height: 'calc(100vh - 180px)'}}
                            sx={{
                                "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                                    outline: "none",
                                },
                            }}
                            rows={rows}
                            rowHeight={52}
                            columns={columns}
                            getRowHeight={() => 'auto'}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize: 5},
                                },
                            }}

                            pageSizeOptions={[5, 10]}
                        /> : <div></div>}

                </div>

            </div>
        );
    }

    return (
        <DataTable/>
    );
};

export default ReportsDataTable;
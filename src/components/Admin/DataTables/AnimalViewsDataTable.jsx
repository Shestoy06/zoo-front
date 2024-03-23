import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {CircularProgress} from "@mui/joy";
import CrudTable from "../ui/DataTable/CrudTable";
import AnimalService from "../../../services/animal.service";


const AnimalViewsDataTable = () => {

    let {data, isLoading, error} = useQuery({
        queryFn: () => AnimalService.getAnimalsFromNest(),
        queryKey: ['animalFromNest']
    })


    if (isLoading) {
        return <div
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <CircularProgress/>
        </div>
    }

    if (error) {
        return <div>error</div>
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: false,
        },
        {
            field: 'views',
            headerName: 'Views',
            align: 'center',
            headerAlign: 'center',
            editable: false,
            flex: 1,
        },
    ];

    function getRowId(row) {
        return row._id;
    }

    return (
        <CrudTable
            columns={columns}
            data={data.error ? [] : data}
            getRowId={getRowId}
            isLoading={isLoading}
            title={'Animal views'}
            withActions={false}
            withToolBar={false}
            autoHeight={true}/>
    );
};

export default AnimalViewsDataTable;
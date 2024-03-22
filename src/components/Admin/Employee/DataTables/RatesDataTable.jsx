import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {CircularProgress} from "@mui/joy";
import moment from "moment";
import RatesService from "../../../../services/rates.service";
import CrudTable from "../../ui/DataTable/CrudTable";


const RatesDataTable = () => {

    let {data, isLoading, error, isFetching} = useQuery({
        queryFn: () => RatesService.get(),
        queryKey: ['rates']
    })

    const invalidateData = () => {
        queryClient.invalidateQueries({queryKey: ['rates']})
    }

    const queryClient = useQueryClient()
    const {mutate: deleteMutation} = useMutation({
        mutationFn: (id) => RatesService.delete(id),
        mutationKey: ['rateDelete'],
        onSuccess: () => {
            invalidateData()
            toast('Rate deleted', {
                icon: '🗑️',
            });
        }
    })


    const {mutate: putMutation} = useMutation({
        mutationFn: (rate) => RatesService.put(rate),
        mutationKey: ['putFood'],
        onSuccess: () => {
            invalidateData()
            toast('Food recording modified!', {
                icon: '✏️',
            });
        },
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
        { field: 'id', headerName: 'Id', width: 80, editable: false,
            align: 'center',
            headerAlign: 'center', },
        {
            field: 'pseudo',
            headerName: 'Pseudo',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'message',
            headerName: 'Message',
            align: 'left',
            headerAlign: 'left',
            editable: false,
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 180,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Waiting', 'Accepted', 'Refused'],
        },

    ];

    return (
        <CrudTable
            columns={columns}
            data={data.error ? [] : data}
            onDelete={deleteMutation}
            onUpdate={putMutation}
            isLoading={isFetching}
            title={'Rates'}
            withToolBar={false}
            autoHeight={true}/>
    );
};

export default RatesDataTable;
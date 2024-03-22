import React from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {CircularProgress} from "@mui/joy";
import ServicesService from "../../../services/services.service";
import CrudTable from "../ui/DataTable/CrudTable";


const ServicesDataTable = () => {

    let {data, isLoading, error} = useQuery({
        queryFn: () => ServicesService.get(),
        queryKey: ['services']
    })

    const invalidateData = () => {
        queryClient.invalidateQueries({queryKey: ['services']})
    }

    const queryClient = useQueryClient()
    const {mutate: deleteMutation} = useMutation({
        mutationFn: (id) => ServicesService.delete(id),
        mutationKey: ['deleteService'],
        onSuccess: () => {
            invalidateData()
            toast('Service deleted', {
                icon: '🗑️',
            });
        }
    })

    const {mutate: postMutation} = useMutation({
        mutationFn: (service,) => ServicesService.post(service),
        mutationKey: ['postService'],
        onSuccess: () => {
            invalidateData()
            toast.success("New service added!")
        },
    })


    const {mutate: putMutation} = useMutation({
        mutationFn: (service) => ServicesService.put(service),
        mutationKey: ['putService'],
        onSuccess: () => {
            invalidateData()
            toast('Service modified!', {
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
            field: 'name',
            headerName: 'Name',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1,
        },
    ];

    return (
        <CrudTable
            columns={columns}
            data={data.error ? [] : data}
            onDelete={deleteMutation}
            onUpdate={putMutation}
            isLoading={isLoading}
            title={'Services'}
            withToolBar={true}
            autoHeight={true}/>
    );
};

export default ServicesDataTable;
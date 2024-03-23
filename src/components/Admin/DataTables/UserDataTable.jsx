import React from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {CircularProgress} from "@mui/joy";
import UserService from "../../../services/user.service";
import CrudTable from "../ui/DataTable/CrudTable";


const UserDataTable = () => {

    let {data, isLoading, error} = useQuery({
        queryFn: () => UserService.get(),
        queryKey: ['users']
    })

    const invalidateData = () => {
        queryClient.invalidateQueries({queryKey: ['users']})
    }

    const queryClient = useQueryClient()
    const {mutate: deleteMutation} = useMutation({
        mutationFn: (id) => UserService.delete(id),
        mutationKey: ['deleteUser'],
        onSuccess: () => {
            invalidateData()
            toast('User deleted', {
                icon: '🗑️',
            });
        }
    })

    const {mutate: postMutation} = useMutation({
        mutationFn: (user,) => UserService.post(user),
        mutationKey: ['postUser'],
        onSuccess: () => {
            invalidateData()
            toast.success("New user added!")
        },
    })


    const {mutate: putMutation} = useMutation({
        mutationFn: (user) => UserService.put(user),
        mutationKey: ['putUser'],
        onSuccess: () => {
            invalidateData()
            toast('User modified!', {
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
            field: 'username',
            headerName: 'Username',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'password',
            headerName: 'Password',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1,
            valueFormatter: params => '******'

        },
        {
            field: 'role',
            headerName: 'Role',
            align: 'left',
            headerAlign: 'left',
            type:'singleSelect',
            editable: true,
            flex: 1,
            valueOptions: ['employee', 'veterinarian'],
        },
    ];

    return (
        <CrudTable
            columns={columns}
            data={data.error ? [] : data}
            onCreate={postMutation}
            onDelete={deleteMutation}
            onUpdate={putMutation}
            isLoading={isLoading}
            title={'Users'}
            withToolBar={true}
            autoHeight={true}/>
    );
};

export default UserDataTable;
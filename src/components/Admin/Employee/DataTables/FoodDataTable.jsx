import React, {useState} from 'react';
import CrudTable from "../../ui/DataTable/CrudTable";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import FoodService from "../../../../services/food.service";
import toast from "react-hot-toast";
import {useAnimals} from "../../../../hooks/useAnimals";
import {CircularProgress} from "@mui/joy";
import moment from "moment";


const FoodDataTable = () => {

    let {data, isLoading, error, isFetching} = useQuery({
        queryFn: () => FoodService.get(),
        queryKey: ['food']
    })

    const {data: animals, isLoading2, error2} = useAnimals()


    const queryClient = useQueryClient()
    const {mutate: deleteFoodMutation} = useMutation({
        mutationFn: (id) => FoodService.delete(id),
        mutationKey: ['foodDelete'],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['food']})
            toast('Food recording deleted', {
                icon: '🗑️',
            });
        }
    })

    const postFoodMutation = useMutation({
        mutationFn: (food, animalId) => FoodService.post(food, animalId),
        mutationKey: ['postFood'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['food'] })
            toast.success("Food recording added!")
        },
    })



    const putFoodMutation = useMutation({
        mutationFn: (food) => FoodService.put(food),
        mutationKey: ['putFood'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['food'] })
            toast('Food recording modified!', {
                icon: '✏️',
            });
        },
    })

    if (isLoading || isLoading2) {
        return <div
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <CircularProgress/> {/* You can use any loading indicator component here */}
        </div>
    }

    if (error || error2) {
        return <div>error</div>
    }

    const handlePostFoodMutation = (food) => {
        for (let animal of animals) {
            if (food.animal === animal.name) {
                let animalId = animal.id
                postFoodMutation.mutate({food, animalId})
            }
        }
    }

    const handlePutFoodMutation = (food) => {
        for(let animal of animals) {
            if (food.animal === animal.name) {
                let animalId = animal.id
                putFoodMutation.mutate({food, animalId})
            }
        }
    }

    const animalOptions = () => {
        const options = []
        animals.forEach(animal => options.push(animal.name))
        return options
    }

    const columns = [
        { field: 'id', headerName: 'Id', width: 180, editable: false, flex: 1,
            align: 'center',
            headerAlign: 'center', },
        {
            field: 'animal',
            headerName: 'Animal',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1,
            type: 'singleSelect',
            valueOptions: animalOptions(),

        },
        {
            field: 'food_type',
            headerName: 'Food type',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1,
        },
        {
            field: 'food_quantity',
            headerName: 'Food quantity',
            width: 180,
            editable: true,
            flex: 1,
        },
        {
            field: 'dateTime',
            type: 'dateTime',
            headerName: 'Date time',
            width: 220,
            editable: true,
            flex: 1,
            valueFormatter: params => moment.utc(params?.value).format('DD-MM-YYYY HH:mm')
        },

    ];

    return (
        <CrudTable
            columns={columns}
            data={data}
            onDelete={deleteFoodMutation}
            onUpdate={handlePutFoodMutation}
            onCreate={handlePostFoodMutation}
            isLoading={isFetching}
            title={'Animal food'}
            withToolBar={true}/>
    );
};

export default FoodDataTable;
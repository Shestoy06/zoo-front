import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {CircularProgress} from "@mui/joy";
import moment from "moment";
import ReviewsService from "../../../services/reviews.service";
import {useAnimals} from "../../../hooks/useAnimals";
import CrudTable from "../ui/DataTable/CrudTable";


const FoodDataTable = () => {

    let {data, isLoading, error, isFetching} = useQuery({
        queryFn: () => ReviewsService.get(),
        queryKey: ['review']
    })

    const {data: animals, isLoading2, error2} = useAnimals()

    const invalidateData = () => {
        queryClient.invalidateQueries({queryKey: ['review']})
    }


    const queryClient = useQueryClient()
    const {mutate: deleteMutation} = useMutation({
        mutationFn: (id) => ReviewsService.delete(id),
        mutationKey: ['reviewDelete'],
        onSuccess: () => {
            invalidateData()
            toast('Report deleted', {
                icon: '🗑️',
            });
        }
    })

    const {mutate: postMutation} = useMutation({
        mutationFn: (review) => ReviewsService.post(review),
        mutationKey: ['postReview'],
        onSuccess: () => {
            invalidateData()
            toast.success("Report added!")
        },
    })



    const {mutate: putMutation} = useMutation({
        mutationFn: (review) => ReviewsService.put(review),
        mutationKey: ['putReview'],
        onSuccess: () => {
            invalidateData()
            toast('Report modified!', {
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

    const handlePostFoodMutation = (review) => {
        for (let animal of animals) {
            if (review.animal === animal.name) {
                let animalId = animal.id
                postMutation({review, animalId})
            }
        }
    }

    const handlePutFoodMutation = (review) => {
        for(let animal of animals) {
            if (review.animal === animal.name) {
                let animalId = animal.id
                putMutation({review, animalId})
            }
        }
    }

    const animalOptions = () => {
        const options = []
        animals.forEach(animal => options.push(animal.name))
        return options
    }

    const columns = [
        { field: 'id', headerName: 'Id', editable: false,
            align: 'center',
            headerAlign: 'center', },
        {
            field: 'animal',
            headerName: 'Animal',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            type: 'singleSelect',
            valueOptions: animalOptions(),

        },
        {
            field: 'review',
            headerName: 'Review',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1,
        },
        {
            field: 'date',
            type: 'dateTime',
            headerName: 'Date time',
            width: 220,
            editable: true,
            valueFormatter: params => moment.utc(params?.value).format('DD-MM-YYYY HH:mm')
        },

    ];

    return (
        <CrudTable
            columns={columns}
            data={data}
            onDelete={deleteMutation}
            onUpdate={handlePutFoodMutation}
            onCreate={handlePostFoodMutation}
            isLoading={isFetching}
            title={'Vet. Reports'}
            withToolBar={true}
            autoHeight={true}/>
    );
};

export default FoodDataTable;
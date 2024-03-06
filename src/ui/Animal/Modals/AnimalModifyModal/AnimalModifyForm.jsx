import React, {useEffect, useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AnimalService from "../../../../services/animal.service";
import AnimalForm from "../../Form/AnimalForm";
import {Button} from "@mui/material";
import {format} from "date-fns";

const AnimalModifyForm = ({animal, handleClose}) => {

    const queryClient = useQueryClient()
    const modifyAnimalMutation = useMutation({
        mutationFn: (animal) => AnimalService.put(animal),
        mutationKey: ['putAnimal'],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['animals']})
        },
    })

    const[state, setState] = useState({
        id: animal.id,
        name: animal.name ? animal.name : "",
        species: animal.species ? animal.species : "",
        animalHabitat: animal.animalHabitat ? animal.animalHabitat.name : "",
        vetReview: animal.vet_review ? animal.vet_review : "",
        foodType: animal.food_type ? animal.food_type : "",
        foodQuantity: animal.food_quantity ? animal.food_quantity : "",
        lastReview: animal.last_review ? format(new Date(animal.last_review), 'yyyy-MM-dd') : "",
        details: animal.details ? animal.details : ""
    })
    console.log(state.lastReview)
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePutAnimal = () => {
        modifyAnimalMutation.mutate(state)
        handleClose()
    }

    return (
        <div>
            <AnimalForm state={state} handleChange={handleChange} handleSubmit={handlePutAnimal}/>
        </div>
    );
};

export default AnimalModifyForm;
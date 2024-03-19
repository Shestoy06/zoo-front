import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AnimalService from "../../../services/animal.service";
import {useAnimals} from "../../../hooks/useAnimals";
import AnimalTable from "./Animal/Table/Animal/AnimalTable";
const AnimalDataTable = () => {
    const {isLoading, error, data: animal} = useAnimals()

    const queryClient = useQueryClient()
    const {mutate: deleteAnimalMutation} = useMutation({
        mutationFn: (id) => AnimalService.delete(id),
        mutationKey: ['animalDelete'],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['animals']})
        }
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div><h1 style={{textDecoration: "underline", textDecorationColor: "#03c403", marginLeft: 20}}>Animals</h1></div>
            <AnimalTable style={{padding: 20}} animal={animal} deleteAnimal={deleteAnimalMutation}/>
        </div>
    );
};

export default AnimalDataTable;
import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AnimalService from "../../services/animal.service";
import {useAnimals} from "../../hooks/useAnimals";
import AnimalTable from "../../ui/Animal/Table/AnimalTable";
const AdminHome = () => {
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
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <AnimalTable animal={animal} deleteAnimal={deleteAnimalMutation}/>
        </div>
    );
};

export default AdminHome;
import React, {useState} from 'react';
import {Button} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AnimalService from "../../../../services/animal.service";
import AnimalForm from "../../Form/AnimalForm";
import axios from "axios";

const AnimalNewForm = ({handleClose}) => {

    const queryClient = useQueryClient()
    const postAnimalMutation = useMutation({
        mutationFn: (animal) => AnimalService.post(animal),
        mutationKey: ['postAnimal'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['animals'] })
        },
    })

    const[state, setState] = useState({
        name: 'test',
        species: 'test',
        animalHabitat: 'savanna',
        vetReview: 'test',
        foodType: 'test',
        foodQuantity: 'test',
        lastReview: '2023-08-10',
        details: 'test',
        animalImages: []
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const setImageFile = (files) => {
        const promises = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const url = event.target.result;
                    resolve({ fileName: file.name, file: url });
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises)
            .then(fileWithUrlArray => {
                setState(prevState => ({
                    ...prevState,
                    animalImages: fileWithUrlArray
                }))
            })
            .catch(error => {
                console.error('Error reading file:', error);
            });

    }

    const handlePostAnimal = () => {
        postAnimalMutation.mutate(state)
        handleClose()
    }

    return (
        <div>
            <AnimalForm state={state} handleChange={handleChange} handleSubmit={handlePostAnimal} setImageFile={setImageFile}/>
        </div>
    );
};

export default AnimalNewForm;
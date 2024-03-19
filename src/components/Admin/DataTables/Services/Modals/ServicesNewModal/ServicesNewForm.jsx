import React, {useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AnimalService from "../../../../../../services/animal.service";
import ServicesService from "../../../../../../services/services.service";
import toast from "react-hot-toast";
import AnimalForm from "../../../Animal/Form/AnimalForm";
import ServiceForm from "../../Form/ServiceForm";

const ServicesNewForm = ({handleClose}) => {

    const queryClient = useQueryClient()
    const postServiceMutation = useMutation({
        mutationFn: (service) => ServicesService.post(service),
        mutationKey: ['postService'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
    })

    const[state, setState] = useState({
        name: 'test',
        description: 'test',
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePostService = () => {
        postServiceMutation.mutate(state)
        handleClose()
        toast.success('Service added!')
    }


    return (
        <ServiceForm state={state} handleChange={handleChange} handleSubmit={handlePostService}/>
    );
};

export default ServicesNewForm;
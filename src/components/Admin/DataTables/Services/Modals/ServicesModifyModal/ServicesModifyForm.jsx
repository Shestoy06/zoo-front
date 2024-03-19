import React, {useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import ServicesService from "../../../../../../services/services.service";
import toast from "react-hot-toast";
import ServiceForm from "../../Form/ServiceForm";

const ServicesModifyForm = ({service, handleClose}) => {

    const queryClient = useQueryClient()
    const modifyServiceMutation = useMutation({
        mutationFn: (service) => ServicesService.put(service),
        mutationKey: ['putService'],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['services']})
        },
    })

    const[state, setState] = useState({
        id: service.id,
        name: service.name ? service.name : "",
        description: service.description ? service.description : "",
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePutService = () => {
        modifyServiceMutation.mutate(state)
        handleClose()
        toast('Service modified!', {
            icon: '✏️',
        });
    }

    return (
        <div>
            <ServiceForm state={state} handleChange={handleChange} handleSubmit={handlePutService}/>
        </div>
    );
};

export default ServicesModifyForm;
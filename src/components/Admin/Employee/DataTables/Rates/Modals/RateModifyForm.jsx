import React, {useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import RatesService from "../../../../../../services/rates.service";
import RateForm from "../Form/RateForm";

const RateModifyForm = ({rate, handleClose}) => {
    const queryClient = useQueryClient()
    const modifyRateMutation = useMutation({
        mutationFn: (rate) => RatesService.put(rate),
        mutationKey: ['putRate'],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['rates']})
        },
    })

    const[state, setState] = useState({
        id: rate.id,
        pseudo: rate.pseudo ? rate.pseudo : "",
        message: rate.message ? rate.message : "",
        status: rate.status ? rate.status : "",
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePutRate = () => {
        modifyRateMutation.mutate(state)
        handleClose()
        toast('Rate modified!', {
            icon: '✏️',
        });
    }

    return (
        <div>
            <RateForm state={state} handleChange={handleChange} handleSubmit={handlePutRate}/>
        </div>
    );
};

export default RateModifyForm;
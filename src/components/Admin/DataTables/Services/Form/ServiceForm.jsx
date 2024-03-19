import React from 'react';
import s from "../../../ui/Styles/FormStyles.module.css";
import {Button} from "@mui/material";

const ServiceForm = ({state, handleChange, handleSubmit}) => {
    const handleSubmitAndPreventDefault = (e) => {
        e.preventDefault()
        handleSubmit()
    }

    return (
        <form onSubmit={handleSubmitAndPreventDefault} >
            <div className={s.form}>
                <div className={s.attributes}>
                    <div className={s.data}>
                        <div className={s.attribute}>Name:</div>
                        <input type="text" name="name" required value={state.name} onChange={handleChange}/>
                    </div>
                    <div className={s.data}>
                        <div className={s.attribute}>Description:</div>
                        <input type="text" name="description" required value={state.description} onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <Button type={'submit'} style={{paddingTop: 10, marginLeft: -13}}>Save</Button>
        </form>

    );
};

export default ServiceForm;
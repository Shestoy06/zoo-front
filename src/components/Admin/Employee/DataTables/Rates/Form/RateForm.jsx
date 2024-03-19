import React from 'react';
import s from "../../../../ui/Styles/FormStyles.module.css";
import {Button} from "@mui/material";

const RateForm = ({state, handleChange, handleSubmit}) => {
    const handleSubmitAndPreventDefault = (e) => {
        e.preventDefault()
        handleSubmit()
    }

    const statusOptions = ['accepted', 'denied', 'waiting']

    return (
        <form onSubmit={handleSubmitAndPreventDefault} >
            <div className={s.form}>
                <div className={s.attributes}>
                    <div className={s.data}>
                        <div className={s.attribute}>Pseudo: </div>
                        <div style={{width: '100%'}}> {state.pseudo}</div>
                    </div>
                    <div style={{marginTop:10}}>
                        <div className={s.attribute}>Message:</div>
                        <div style={{marginTop:10, textAlign:"left"}}> {state.message}</div>
                    </div>
                    <div className={s.data}>
                        <div className={s.attribute}>Status:</div>
                        <select style={{width: '100%'}} onChange={handleChange} name="status">
                            <option value="">Set status:</option>
                            {statusOptions.map(option => {
                                if (state.status === option) {
                                    return (<option selected value={option}>{state.status}</option>)
                                }
                                return (<option value={option}>{option}</option>)
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <Button type={'submit'} disabled={state.status === ''} style={{paddingTop: 10, marginLeft: -13}}>Save</Button>
        </form>

    );
};

export default RateForm;
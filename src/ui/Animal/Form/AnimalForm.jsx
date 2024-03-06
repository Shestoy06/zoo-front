import React from 'react';
import s from "../Modals/AnimalNewModal/AnimalNewModal.module.css";
import {useQuery} from "@tanstack/react-query";
import HabitatService from "../../../services/habitat.service";
import {Button} from "@mui/material";

const AnimalForm = ({state, handleChange, handleSubmit, setImageFile}) => {

    const {isLoading, isError, data: habitats} = useQuery({
        queryKey: ['habitats'],
        queryFn: () => HabitatService.get(),
    })

    if(isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    const handleSubmitAndPreventDefault = (e) => {
        e.preventDefault()
        handleSubmit()
    }

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const fileArray = Array.from(fileList);
        setImageFile(fileArray);
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
                        <div className={s.attribute}>Species:</div>
                        <input type="text" name="species" required value={state.species} onChange={handleChange}/>
                    </div>
                    <div className={s.data}>
                        <div className={s.attribute}>
                            <div style={{color: 'red', fontStyle: 'italic'}}>required</div>
                            Animal
                            habitat:
                        </div>
                        <select style={{width: '100%'}} onChange={handleChange} name="animalHabitat">
                            <option value="">Select an habitat</option>
                            {habitats.map(habitat => {
                                if (state.animalHabitat === habitat.name) {
                                    return (<option selected value={habitat.name}>{habitat.name}</option>)
                                }
                                return (<option value={habitat.name}>{habitat.name}</option>)
                            })}
                        </select>
                    </div>
                    <div className={s.data}>
                        <div className={s.attribute}>Vet review:</div>
                        <input type="text" name="vetReview" required value={state.vetReview} onChange={handleChange}/>
                    </div>
                    <div className={s.data}>
                        <div className={s.attribute}>Food type:</div>
                        <input type="text" name="foodType" required value={state.foodType} onChange={handleChange}/>
                    </div>
                    <div className={s.data}>
                        <div className={s.attribute}>Food quantity:</div>
                        <input type="text" name="foodQuantity" required value={state.foodQuantity}
                               onChange={handleChange}/>
                    </div>
                    <div className={s.data}>
                        <div className={s.attribute}>Last review:</div>
                        <input type="date" name="lastReview" required value={state.lastReview} style={{width: '100%'}}
                               onChange={handleChange}/>
                    </div>
                    <div className={s.data}>
                        <div className={s.attribute}>Details:</div>
                        <input type="text" name="details" value={state.details} onChange={handleChange}/>
                    </div>
                    <div className={s.data}>
                        <div className={s.attribute}>Photo:</div>
                        <input type="file" name="photo" multiple onChange={handleFileChange}/>
                    </div>
                </div>
            </div>
            <Button type={'submit'} disabled={state.animalHabitat === ''}>Save</Button>
        </form>

    );
};

export default AnimalForm;
import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {CircularProgress} from "@mui/joy";
import AnimalService from "../../../services/animal.service";
import {useAnimals} from "../../../hooks/useAnimals";
import CrudTable from "../ui/DataTable/CrudTable";
import HabitatService from "../../../services/habitat.service";


const AnimalDataTable = () => {

    const {data, isLoading, error} = useAnimals()

    const{data: habitats, isLoading2} = useQuery({
        queryFn: () => HabitatService.get(),
        queryKey: ['habitats']
    })

    const invalidateData = () => {
        queryClient.invalidateQueries({queryKey: ['animals']})
    }

    const queryClient = useQueryClient()
    const {mutate: deleteMutation} = useMutation({
        mutationFn: (id) => AnimalService.delete(id),
        mutationKey: ['animalDelete'],
        onSuccess: () => {
            invalidateData()
            toast('Animal deleted', {
                icon: '🗑️',
            });
        }
    })

    const {mutate: putMutation} = useMutation({
        mutationFn: (animal) => AnimalService.put(animal),
        mutationKey: ['putAnimal'],
        onSuccess: () => {
            invalidateData()
            toast('Animal modified!', {
                icon: '✏️',
            });
        },
    })

    const {mutate: postMutation} = useMutation({
        mutationFn: (animal) => AnimalService.post(animal),
        mutationKey: ['postAnimal'],
        onSuccess: () => {
            invalidateData()
            toast.success('New animal created!')
        },
        onError: (error) => {
            alert(error)
        }
    })

    const [imageData, setImageData] = useState([null])

    const getImages = (id) => {
        AnimalService.getAnimalImage(id).then(
            res => setImageData(res)
        )
    }

    const {mutate: postImageMutation} = useMutation({
        mutationFn: (image) => AnimalService.postAnimalImage(image),
        mutationKey: ['animalPostImage'],
        onSuccess: (animal) => {
            getImages(animal.id)
            toast.success('Image added!')
        }
    })

    const {mutate: deleteImageMutation} = useMutation({
        mutationFn: (image) => AnimalService.deleteAnimalImage(image),
        mutationKey: ['animalDeleteImage'],
        onSuccess: (animal) => {
            getImages(animal.id)
            toast('Image deleted', {
                icon: '🗑️',
            });
        }
    })

    if (isLoading || isLoading2) {
        return <div
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <CircularProgress/>
        </div>
    }

    if (error) {
        return <div>error</div>
    }

    const handlePostMutation = (animal) => {
        for (let habitat of habitats) {
            if (animal.animalHabitat === habitat.name) {
                postMutation({habitat: habitat.name, animal})
            }
        }
    }

    const handlePutMutation = (animal) => {
        for (let habitat of habitats) {
            if (animal.animalHabitat === habitat.name) {
                putMutation({habitat: habitat.name, animal})
            }
        }
    }

    const habitatOptions = () => {
        if(habitats) {
            const options = []
            habitats.forEach(habitat => options.push(habitat.name))
            return options
        }

    }

    const columns = [
        { field: 'id', headerName: 'Id', editable: false, flex: 1,
            align: 'center',
            headerAlign: 'center', },
        {
            field: 'name',
            headerName: 'Name',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1,
        },
        {
            field: 'species',
            headerName: 'Species',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1,
        },
        {
            field: 'animalHabitat',
            headerName: 'Habitat',
            editable: true,
            flex: 1,
            type: 'singleSelect',
            valueOptions: habitatOptions()
        },
        {
            field: 'vet_review',
            headerName: 'Vet. review',
            editable: true,
            flex: 1,
        },
        {
            field: 'last_review',
            headerName: 'Last review',
            align: 'left',
            headerAlign: 'left',
            editable: false,
            flex: 1,
        },
        {
            field: 'details',
            headerName: 'Details',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1,
        },

    ];

    return (
        <CrudTable
            columns={columns}
            data={data.error ? [] : data}
            onCreate={handlePostMutation}
            onDelete={deleteMutation}
            onUpdate={handlePutMutation}
            isLoading={isLoading}
            title={'Animals'}
            withToolBar={true}
            autoHeight={true}

            imageModal={true}
            getImages={getImages}
            imageData={imageData}
            postImage={postImageMutation}
            deleteImage={deleteImageMutation}/>
    );
};

export default AnimalDataTable;
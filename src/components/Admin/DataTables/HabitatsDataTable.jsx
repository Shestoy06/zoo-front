import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {CircularProgress} from "@mui/joy";
import moment from "moment";
import HabitatService from "../../../services/habitat.service";
import CrudTable from "../ui/DataTable/CrudTable";
import ImageModal from "../ui/Modal/ImageModal";
import AnimalService from "../../../services/animal.service";


const RatesDataTable = () => {

    let {data, isLoading, error, isFetching} = useQuery({
        queryFn: () => HabitatService.get(),
        queryKey: ['habitat']
    })

    const invalidateData = () => {
        queryClient.invalidateQueries({queryKey: ['habitat']})
    }

    const queryClient = useQueryClient()
    const {mutate: deleteMutation} = useMutation({
        mutationFn: (id) => HabitatService.delete(id),
        mutationKey: ['habitatDelete'],
        onSuccess: () => {
            invalidateData()
            toast('Habitat deleted', {
                icon: '🗑️',
            });
        }
    })

    const {mutate: putMutation} = useMutation({
        mutationFn: (rate) => HabitatService.put(rate),
        mutationKey: ['putHabitat'],
        onSuccess: () => {
            invalidateData()
            toast('Habitat modified!', {
                icon: '✏️',
            });
        },
    })

    const [imageData, setImageData] = useState([])


    const getImages = (id) => {
        HabitatService.getImage(id).then(
            res => setImageData(res)
        )
    }

    const {mutate: postImageMutation} = useMutation({
        mutationFn: (image) => HabitatService.postImage(image),
        mutationKey: ['habitatPostImage'],
        onSuccess: (habitat) => {
            getImages(habitat.id)
            queryClient.invalidateQueries({queryKey: ['habitat']})
        }
    })

    const {mutate: deleteImageMutation} = useMutation({
        mutationFn: (image) => HabitatService.deleteImage(image),
        mutationKey: ['habitatDeleteImage'],
        onSuccess: (habitat) => {
            getImages(habitat.id)
        }
    })

    if (isLoading) {
        return <div
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <CircularProgress/>
        </div>
    }

    if (error) {
        return <div>error</div>
    }

    const columns = [
        { field: 'id', headerName: 'Id', width: 80, editable: false,
            align: 'center',
            headerAlign: 'center', },
        {
            field: 'name',
            headerName: 'Name',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'comment',
            headerName: 'Comment',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1
        },

    ];

    return (
        <CrudTable
            columns={columns}
            data={data.error ? [] : data}
            onDelete={deleteMutation}
            onUpdate={putMutation}
            isLoading={isFetching}
            title={'Habitats'}
            withToolBar={false}
            autoHeight={true}

            imageModal={true}
            getImages={getImages}
            imageData={imageData}
            postImage={postImageMutation}
            deleteImage={deleteImageMutation}/>
    );
};

export default RatesDataTable;
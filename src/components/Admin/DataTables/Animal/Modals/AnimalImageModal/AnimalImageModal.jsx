import React, {useState} from "react";
import {Button} from "@mui/material";
import AnimalService from "../../../../../../services/animal.service";
import CustomModal from "../../../../ui/Modal/CustomModal";
import 'swiper/css';
import Slider from '../../../../ui/Slider/Slider'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ImageIcon from '@mui/icons-material/Image';



const AnimalImageModal = ({imageId, animalId}) => {

    const {data, refetch} = useQuery({
        queryFn: () => AnimalService.getAnimalImage(animalId).then(images => {
            setImageData(images)
            handleOpen()
        }),
        queryKey: ['animalImages'],
        enabled: false
    })

    const queryClient = useQueryClient()
    const {mutate: postAnimalImageMutation} = useMutation({
        mutationFn: (animalImage) => AnimalService.postAnimalImage(animalId, animalImage),
        mutationKey: ['animalPostImage'],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['animalImages']})
            queryClient.invalidateQueries({queryKey: ['animals']})
            refetch()
        }
    })

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
                postAnimalImageMutation(fileWithUrlArray)
            })
            .catch(error => {
                console.error('Error reading file:', error);
            });

    }

    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState([])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const showImage = () => {
        refetch()
    }

    return (
        <div>
            {imageId ?
                <ImageIcon
                style={{ textTransform: 'none', backgroundColor: "rgba(3,196,3,0.15)", color: "#03c403", borderRadius: 10, padding: 8, cursor: "pointer" }}
                disableElevation
                variant="contained"
                onClick={showImage}/> :
                <ImageIcon
                style={{ textTransform: 'none', backgroundColor: "rgba(213,213,213,0.15)", color: "#d5d5d5", borderRadius: 10, padding: 8, cursor: "pointer" }}
                disableElevation
                variant="contained"
                onClick={showImage}/> }
            <CustomModal open={open} handleClose={handleClose} title={'Animal image'} style={{maxHeight: 300}}>
                {imageData.length && <Slider images={imageData} animalId={animalId} refetchImages={() => refetch()} setImageFile={setImageFile}/>}
            </CustomModal>
        </div>

    )
}

export default AnimalImageModal
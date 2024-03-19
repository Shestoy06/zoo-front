import React from 'react';
import {TableBody} from "@mui/material";
import StyledTableRow from "../../../ui/Table/StyledTableRow";
import StyledTableCell from "../../../ui/Table/StyledTableCell";
import toast from "react-hot-toast";
import AnimalModifyModal from "../../Animal/Modals/AnimalModifyModal/AnimalModifyModal";
import TableDeleteButton from "../../../ui/Buttons/TableDeleteButton/TableDeleteButton";
import AnimalImageModal from "../../Animal/Modals/AnimalImageModal/AnimalImageModal";
import ServicesModifyModal from "../Modals/ServicesModifyModal/ServicesModifyModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AnimalService from "../../../../../services/animal.service";
import ServicesService from "../../../../../services/services.service";

const ServicesTableBody = ({services}) => {
    if (!services.error) {

       const rows = []

       services.forEach(s => {
           rows.push(({id: s.id, name: s.name, description: s.description}))
       })

       return (
           <TableBody>
               {
                   rows.map((row, index) => (
                       <StyledTableRow key={index} style={{padding: 50}}>
                           {Object.values(row).map(el =>  (<StyledTableCell>{el}</StyledTableCell>))}
                           <StyledTableCell>
                               <ButtonsRowAndModal
                                   service={row}
                                   serviceId={row.id}/>
                           </StyledTableCell>
                       </StyledTableRow>
                   ))
               }
           </TableBody>)

   } else {
       return (<div>No services yet!</div>)
   }
};

const ButtonsRowAndModal = ({serviceId, service}) => {

    const queryClient = useQueryClient()
    const {mutate: deleteServiceMutation} = useMutation({
        mutationFn: (id) => ServicesService.delete(id),
        mutationKey: ['serviceDelete'],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['services']})
        }
    })
    const handleDeleteService = () => {
        deleteServiceMutation(serviceId)
        toast('Service deleted', {
            icon: '🗑️',
        });
    }


    return (
        <div style={{ display: 'inline-flex', gap: '8px', textAlign: 'right' }}>
            <ServicesModifyModal title={'Modify service'} service={service}/>
            <TableDeleteButton onClick={handleDeleteService}/>
        </div>
    );
}


export default ServicesTableBody;
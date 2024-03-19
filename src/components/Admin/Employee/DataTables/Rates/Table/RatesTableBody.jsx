import React from 'react';
import {TableBody} from "@mui/material";
import StyledTableRow from "../../../../ui/Table/StyledTableRow";
import StyledTableCell from "../../../../ui/Table/StyledTableCell";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import TableDeleteButton from "../../../../ui/Buttons/TableDeleteButton/TableDeleteButton";
import RatesService from "../../../../../../services/rates.service";
import RateModifyModal from "../Modals/RateModifyModal";

const RatesTableBody = ({rates}) => {
    if (!rates.error) {

        const rows = []

        rates.forEach(s => {
            rows.push(({id: s.id, pseudo: s.pseudo, message: s.message, status: s.status}))
        })

        return (
            <TableBody>
                {
                    rows.map((row, index) => (
                        <StyledTableRow key={index} style={{padding: 50}}>
                            {Object.values(row).map(el =>  (<StyledTableCell>{el}</StyledTableCell>))}
                            <StyledTableCell>
                                <ButtonsRowAndModal
                                    rate={row}
                                    rateId={row.id}/>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))
                }
            </TableBody>)

    } else {
        return (<div>No rates yet!</div>)
    }
};

const ButtonsRowAndModal = ({rate, rateId}) => {

    const queryClient = useQueryClient()
    const {mutate: deleteServiceMutation} = useMutation({
        mutationFn: (id) => RatesService.delete(id),
        mutationKey: ['rateDelete'],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['rates']})
        }
    })
    const handleDeleteRate = () => {
        deleteServiceMutation(rateId)
        toast('Rate deleted', {
            icon: '🗑️',
        });
    }


    return (
        <div style={{ display: 'inline-flex', gap: '8px', textAlign: 'right' }}>
            <RateModifyModal title={'Modify rate'} rate={rate}/>
            <TableDeleteButton onClick={handleDeleteRate}/>
        </div>
    );
}

export default RatesTableBody;
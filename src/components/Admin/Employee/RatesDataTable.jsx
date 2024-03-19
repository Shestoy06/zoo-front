import React from 'react';
import {useQuery} from "@tanstack/react-query";
import ServicesService from "../../../services/services.service";
import ServicesTable from "../DataTables/Services/Table/ServicesTable";
import RatesService from "../../../services/rates.service";
import RatesTable from "./DataTables/Rates/Table/RatesTable";

const RatesDataTable = () => {
    const {data, isLoading, error } = useQuery({
        queryKey: ['rates'],
        queryFn: () => RatesService.get()
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <div><h1 style={{textDecoration: "underline", textDecorationColor: "#03c403", marginLeft: 20}}>Rates</h1></div>
            <RatesTable style={{padding: 20}} rates={data} />
        </div>
    );
};

export default RatesDataTable;
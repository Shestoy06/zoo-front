import React from 'react';
import {useQuery} from "@tanstack/react-query";
import ServicesService from "../../../services/services.service";
import ServicesTable from "./Services/Table/ServicesTable";

const ServicesDataTable = () => {

    const {data, isLoading, error } = useQuery({
        queryKey: ['services'],
        queryFn: () => ServicesService.get()
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <div><h1 style={{textDecoration: "underline", textDecorationColor: "#03c403", marginLeft: 20}}>Services</h1></div>
            <ServicesTable style={{padding: 20}} services={data} />
        </div>
    );
};

export default ServicesDataTable;
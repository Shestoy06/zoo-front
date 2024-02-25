import React from 'react';
import './App.css';
import DataTable from "./ui/Table/DataTable";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import AnimalService from "./services/animal.service";
import {TableCell, TableRow} from "@mui/material";

function App() {

    const {data} = useQuery({
        queryKey: ['animals'],
        queryFn: () => axios.get('http://127.0.0.1:8000/api/animal/1').then(res => res.data)
    })


  return (
      <div className="App">
          {data.map((row, index) => (
              <TableRow key={index} style={{padding: 50}}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.species}</TableCell>
                  <TableCell>{row.animalHabitat ? row.animalHabitat.name : "-"}</TableCell>
                  <TableCell>{row.details === null ? '-' : row.details}</TableCell>
                  <TableCell>{row.animalImages ? row.animalImages.ImageFileName : "-"}</TableCell>
              </TableRow>
          ))}

      </div>
  );
}

export default App;
import {useQuery} from "@tanstack/react-query";
import AnimalService from "../services/animal.service";

export const useAnimals = () => {
    return useQuery({
        queryKey: ['animals'],
        queryFn: () =>  AnimalService.getAll()
    })
}
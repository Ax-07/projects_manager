import { useParams } from "react-router-dom";
import { useGetSpecByProjectIdQuery } from "../services/apis/specApi";

export const useSpecData = () => {
    const { projetId } = useParams();
    const { data = {}, error, isLoading } = useGetSpecByProjectIdQuery(projetId);
    console.log(data);
    const features = data?.description_des_besoins?.besoins_fonctionnels || []; console.log(features);
    return { spec: data, features, error, isLoading };
  };
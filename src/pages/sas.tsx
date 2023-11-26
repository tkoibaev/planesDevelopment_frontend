import React from "react";
import { useParams } from "react-router-dom";

export type sasProps = {
  id?: number;
};

const Sas: React.FC<sasProps> = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  return <div>{id}</div>;
};

export default Sas;

import { AxiosResponse } from "axios";

export default interface Option {
  id: number;
  name: string;
}

export interface optionData {
  id: number;
  title: string;
  category: string;
  description: string;
  features: string[];
  available: boolean;
  price: number;
  image: string;
}

export type cardInfoProps = {
  id: number;
  title: string;
  category: string;
  description: string;
  features: string[];
  available: boolean;
  price: number;
  image: string;
};

export type cartItemProps = {
  id: number;
  title: string;
  category: string;
  description: string;
  features: string[];
  available: boolean;
  price: number;
  image: string;
  amount: number;
};

export type Response = Promise<AxiosResponse> | any;

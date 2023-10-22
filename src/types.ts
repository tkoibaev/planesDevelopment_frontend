export default interface Option {
  id: number;
  name: string;
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

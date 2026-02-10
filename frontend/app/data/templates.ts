export interface Template {
  id: string;
  title: string;
  category: string;
  price: string;
  code: string;
  image: string;
}

export const TEMPLATES: Template[] = [
  {
    id: "birthday",
    title: "Birthday Template",
    category: "Personalize",
    price: "Free",
    code: "BDAY",
    image: "/cards/image1.jpg",
  },
  {
    id: "kwibuka",
    title: "Kwibuka Template",
    category: "Commemorate",
    price: "Free",
    code: "KWBK",
    image: "/kwibuka-bg.jpeg",
  },
  {
    id: "event",
    title: "Event Template",
    category: "Celebrate",
    price: "Free",
    code: "EVNT",
    image: "/cards/image2.jpg",
  },
];

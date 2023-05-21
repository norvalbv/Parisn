export type Message = {
  message: string;
  user: string;
  id: string;
  time: number;
};

export type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  orderNumber?: string;
  message: string;
};

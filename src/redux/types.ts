export interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  state?: string;
  pincode?: string;
}

export interface ContactState {
  contacts: Contact[];
}

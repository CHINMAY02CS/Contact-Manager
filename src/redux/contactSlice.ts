import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Contact, type ContactState } from "./types";

const initialContacts: Contact[] = [
  {
    id: "1",
    fullName: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "987348332",
    addressLine1: "Plot No. 57, Industrial Area Phase 2",
    addressLine2: "",
    state: "Punjab",
    pincode: "160002",
  },
  {
    id: "2",
    fullName: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    phone: "912348332",
    addressLine1: "Unit 48, MIDC Tarajja, Sector 10",
    addressLine2: "Navi Mumbai",
    state: "Maharashtra",
    pincode: "410208",
  },
  {
    id: "3",
    fullName: "Sneha Rao",
    email: "sneha.rao@example.com",
    phone: "827348332",
    addressLine1: "Khasra No. 432, Village Behrampur",
    addressLine2: "Sector 59, Gurugram",
    state: "Haryana",
    pincode: "122101",
  },
  {
    id: "4",
    fullName: "Tanvi Verma",
    email: "tanvi.verma@example.com",
    phone: "937348332",
    addressLine1: "Building 12, Tech Park",
    addressLine2: "Electronic City, Bengaluru",
    state: "Karnataka",
    pincode: "560100",
  },
  {
    id: "5",
    fullName: "Gaurav Agarwal",
    email: "gaurav.agarwal@example.com",
    phone: "942348332",
    addressLine1: "Plot No. 23, Sector 15",
    addressLine2: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
  },
  {
    id: "6",
    fullName: "Ritika Singh",
    email: "ritika.singh@example.com",
    phone: "885432109",
    addressLine1: "Flat 402, Gold Nest, Lokhandwala Complex",
    addressLine2: "Andheri, Mumbai",
    state: "Maharashtra",
    pincode: "400053",
  },
  {
    id: "7",
    fullName: "Kavya Gupta",
    email: "kavya.gupta@example.com",
    phone: "976543210",
    addressLine1: "Survey No. 45, Near Railway Station",
    addressLine2: "Jodhpur",
    state: "Rajasthan",
    pincode: "342001",
  },
];

const initialState: ContactState = {
  contacts: initialContacts,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, "id">>) => {
      const newContact: Contact = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.contacts.unshift(newContact);
    },

    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },

    bulkDeleteContacts: (state, action: PayloadAction<string[]>) => {
      state.contacts = state.contacts.filter(
        (contact) => !action.payload.includes(contact.id)
      );
    },

    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
  },
});

export const { addContact, deleteContact, bulkDeleteContacts, editContact } =
  contactSlice.actions;
export default contactSlice.reducer;

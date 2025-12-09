// src/components/ContactForm.tsx
import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactSchema,
  initialContactDetails,
  type ContactFormData,
} from "../utils/validation";
import { type Contact } from "../redux/types";
import "../styles/ContactForm.css";
import { FormField } from "./elements/FormField";
import { indianStates } from "../data/data";

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  onClose: () => void;
  defaultValues?: Contact;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  onClose,
  defaultValues,
}) => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: defaultValues || initialContactDetails,
  });

  const { register, reset } = form;

  // Reset on edit mode
  useEffect(() => {
    reset(defaultValues || initialContactDetails);
  }, [defaultValues, reset]);

  const onFormSubmit: SubmitHandler<ContactFormData> = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)} className="contact-form">
      <div className="form-grid">
        <FormField name="fullName" label="Name" required form={form} />
        <FormField name="phone" label="Contact No." form={form} />
        <FormField name="email" label="Email" required form={form} />
        <FormField
          name="addressLine1"
          label="Address Line 1"
          required
          form={form}
        />
        <FormField
          name="addressLine2"
          label="Address Line 2 (Optional)"
          form={form}
        />
        {/* State */}
        <div className="form-group">
          <label htmlFor="state">State</label>
          <select id="state" {...register("state")} defaultValue="">
            <option value="" disabled>
              Enter State
            </option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <FormField name="pincode" label="Pincode" required form={form} />
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {defaultValues ? "Save Changes" : "Add Contact"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;

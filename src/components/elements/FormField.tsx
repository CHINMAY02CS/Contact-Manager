import type { useForm } from "react-hook-form";
import type { ContactFormData } from "../../utils/validation";
import RequiredField from "./RequiredField";
import ErrorMessage from "./ErrorMessage";

export const FormField = ({
  label,
  name,
  form,
  required,
  placeholder,
}: {
  label: string;
  name: keyof ContactFormData;
  form: ReturnType<typeof useForm<ContactFormData>>;
  required?: boolean;
  placeholder?: string;
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && <RequiredField />}
      </label>
      <input
        id={name}
        {...form.register(name)}
        placeholder={placeholder ?? `Enter ${label.toLowerCase()}`}
        className={form.formState.errors[name] ? "input-error" : ""}
      />
      {form.formState.errors[name] && (
        <ErrorMessage error={form.formState.errors[name].message} />
      )}
    </div>
  );
};

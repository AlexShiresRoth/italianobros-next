import { sendContact } from "@/app/actions/contact.action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { HeaderContext } from "../header-context";
import { formSchema } from "./form-schema";

interface FormFields {
  firstName: { name: string; errors: string | null };
  lastName: { name: string; errors: string | null };
  email: { name: string; errors: string | null };
  phone: { name: string; errors: string | null };
  message: { name: string; errors: string | null };
}

const ContactForm: React.FC = () => {
  const { setToggled } = useContext(HeaderContext);
  const [lastResult, action] = useFormState(sendContact, undefined);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const { firstName, lastName, email, phone, message } = formData;

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: formSchema });
    },
    onSubmit: () => {
      setLoading(true);
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSuccess = useCallback(() => {
    form.reset();
    setToggled(false);
    setLoading(false);
    toast.success("Thank you for your message! We will get back to you soon.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  }, [form, setToggled]);

  const inputs = [
    {
      title: fields.firstName.name,
      label: "First Name",
      placeholder: "Enter First Name",
      type: "text",
      value: firstName,
    },
    {
      title: fields.lastName.name,
      label: "Last Name",
      placeholder: "Enter Last Name",
      type: "text",
      value: lastName,
    },
    {
      title: fields.email.name,
      label: "Email",
      placeholder: "Enter Your Email",
      type: "email",
      value: email,
    },
    {
      title: fields.phone.name,
      label: "Phone #",
      placeholder: "Enter your phone #",
      type: "tel",
      value: phone,
    },
    {
      title: fields.message.name,
      label: "Message",
      placeholder: "Enter your message",
      type: "text",
      value: message,
    },
  ];

  useEffect(() => {
    if (form.allErrors) {
      setLoading(false);
    }
  }, [form.allErrors]);

  useEffect(() => {
    if (form.status === "success") {
      handleFormSuccess();
    }
  }, [handleFormSuccess, form.status]);

  return (
    <form
      className='grid grid-cols-2 gap-4 w-11/12 p-4'
      action={action}
      onSubmit={form.onSubmit}
      id={form.id}
      noValidate
    >
      {inputs.map((input, i) => (
        <div key={i} className='flex flex-col justify-end relative'>
          <label htmlFor={input.title} className=' text-white text-lg'>
            {input.label}
          </label>
          <input
            name={input.title}
            id={input.title}
            type={input.type}
            placeholder={input.placeholder}
            value={input.value}
            onChange={onChange}
            className='bg-[#c2ac54] border-none p-2 text-white rounded-sm transition-all duration-300 ease-in-out placeholder-white focus:outline-none hover:shadow-lg md:bg-white/25'
          />
          {fields[input.title as keyof FormFields]?.errors && (
            <p className='text-red-600 text-sm absolute top-full left-0'>
              {fields[input.title as keyof FormFields].errors}
            </p>
          )}
        </div>
      ))}
      <button
        type='submit'
        disabled={loading}
        className='bg-white text-primary border-2 border-primary rounded-sm p-2 transition-all duration-300 ease-in-out disabled:opacity-50 self-end'
      >
        {loading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};

export default ContactForm;

import { useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
  };
  return { values, setValues, handleChange };
}

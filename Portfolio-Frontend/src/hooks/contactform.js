import { useState } from "react";

export function useContactform() {
  let [loading, setLoading] = useState(false);
  let [successMessage, setSuccessMessage] = useState(null);
  let [errorMessage, setErrorMessage] = useState(null);

  const submitForm = async (FormData) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("https://formspree.io/f/mwkajnvp", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("There is error in getting a response");
        setErrorMessage(data.error);
      }
      setSuccessMessage("Form Submitted Successfully");
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    submitForm,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    errorMessage,
    loading,
    setLoading,
  };
}

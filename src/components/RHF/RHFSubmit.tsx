import React from "react";
import { useFormContext } from "react-hook-form";

interface RHFSubmitProps {
  label: string;
}

function RHFSubmit({ label }: RHFSubmitProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <button
      type={"submit"}
      className={"p-3 bg-sky-800 text-sky-50 text-xs w-full"}
      disabled={isSubmitting ?? false}
    >
      {label}
    </button>
  );
}

export default RHFSubmit;

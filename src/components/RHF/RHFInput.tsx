import React from "react";
import { Controller } from "react-hook-form";

interface RHFInputProps {
  name: string;
  label: string;
  type?: "text" | "password" | "number";
}

function RHFInput({ name, label, ...others }: RHFInputProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={"flex flex-col gap-1"}>
          <label className={`text-xs ${error?.message ? "text-red-700" : ""}`}>
            {error?.message ? error?.message : label}
          </label>
          <input
            {...others}
            {...field}
            type={others.type || "text"}
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
            className={"border border-1 border-sky-800 px-2 py-1"}
          />
        </div>
      )}
    />
  );
}

export default RHFInput;

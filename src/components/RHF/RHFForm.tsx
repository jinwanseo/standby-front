import React, { ReactElement } from "react";
import { FormProvider } from "react-hook-form";

interface RhfFormProps {
  methods: any;
  onSubmit: Function;
  children: ReactElement | ReactElement[];
  className?: string;
}

function RhfForm({ methods, onSubmit, children, ...others }: RhfFormProps) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...others}>
        {children}
      </form>
    </FormProvider>
  );
}

export default RhfForm;

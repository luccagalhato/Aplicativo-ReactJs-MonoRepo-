import { ValidationError } from "yup";

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    console.log(error);
    validationErrors[`${error}`] = error.message;
  });

  return validationErrors;
}

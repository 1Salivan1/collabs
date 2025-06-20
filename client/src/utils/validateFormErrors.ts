import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import axios from "axios";

export const validateFormErrors = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
) => {
  if (
    axios.isAxiosError(error) &&
    error.response?.status === 400 &&
    Array.isArray(error.response.data?.errors)
  ) {
    const serverErrors = error.response.data.errors;

    serverErrors.forEach((err: any) => {
      const field = err.property as Path<T>;
      const message = Object.values(err.constraints).join(", ");
      
      if (field === "contactCheck") {
        (["telegram", "discord", "linkedin"] as const).forEach((contactField) => {
          setError(contactField as Path<T>, {
            type: "server",
            message,
          });
        });
      }

      setError(field, {
        type: "server",
        message,
      });
    });
  } else {
    console.error("Unhandled error", error);
  }
};

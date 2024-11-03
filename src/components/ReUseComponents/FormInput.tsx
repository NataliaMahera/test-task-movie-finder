import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type: string;
  placeholder: string;
  errors?: FieldError;
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  placeholder,
  errors,
}: FormInputProps<T>) => {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-1 sm:mb-2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        )}
      />
      <p className="text-red-500 text-xs italic">{errors?.message}</p>
    </>
  );
};

export default FormInput;

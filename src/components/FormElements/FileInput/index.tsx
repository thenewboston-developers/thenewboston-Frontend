import {ChangeEvent, FC} from 'react';
import {ErrorMessage, FieldProps, useField} from 'formik';

import * as S from './Styles';

const FileInput: FC<FieldProps<File | null> & {onChange: (event: ChangeEvent<HTMLInputElement>) => void}> = ({
  field,
  form,
  onChange,
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, helpers] = useField<File | null>(field.name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files && event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
    helpers.setValue(file);

    if (onChange) onChange(event);
  };

  return (
    <>
      <input {...field} {...props} accept="image/*" onChange={handleChange} type="file" value={undefined} />
      <S.SecondaryContainer>
        <ErrorMessage component={S.ErrorMessage} name={field.name} />
      </S.SecondaryContainer>
    </>
  );
};

export default FileInput;

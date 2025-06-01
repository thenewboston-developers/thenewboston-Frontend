import {ChangeEvent} from 'react';
import {mdiImagePlus} from '@mdi/js';
import {useField} from 'formik';

import {SFC} from 'types';

import * as S from './Styles';

export interface FileInputProps {
  errors: {[field: string]: string};
  label?: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  touched: {[field: string]: boolean};
}

const FileInput: SFC<FileInputProps> = ({className, errors, label, name, onChange, touched}) => {
  const [field, , helpers] = useField<File | string>(name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      helpers.setValue(file);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      {label && <S.Label>{label}</S.Label>}
      <S.UploadButton htmlFor={name}>
        <S.UploadIcon path={mdiImagePlus} size={0.75} />
        <S.UploadText>Add image</S.UploadText>
        <S.FileInput
          {...field}
          accept="image/*"
          className={className}
          id={name}
          onChange={handleChange}
          type="file"
          value=""
        />
      </S.UploadButton>
      <S.SecondaryContainer>
        {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      </S.SecondaryContainer>
    </>
  );
};

export default FileInput;

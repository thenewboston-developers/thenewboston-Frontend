import {ChangeEvent, FC, MouseEvent, useRef} from 'react';
import {mdiImagePlus} from '@mdi/js';
import {ErrorMessage, FieldProps, useField} from 'formik';

import * as S from './Styles';

const FileInput: FC<
  FieldProps<File | null> & {
    asLink?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    buttonText?: string;
  }
> = ({asLink, buttonText = 'Add image', field, form, onChange, ...props}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, helpers] = useField<File | null>(field.name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files && event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
    helpers.setValue(file);

    if (onChange) onChange(event);
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };
  return (
    <>
      {asLink ? (
        <S.Span>
          <S.Link href="#" onClick={handleLinkClick}>
            choose here
          </S.Link>
          <S.FileInput
            ref={fileInputRef}
            {...field}
            {...props}
            accept="image/*"
            onChange={handleChange}
            type="file"
            value={undefined}
          />
        </S.Span>
      ) : (
        <S.UploadButton htmlFor={field.name}>
          <S.UploadIcon path={mdiImagePlus} size={0.75} />
          <S.UploadText>{buttonText}</S.UploadText>
          <S.FileInput
            ref={fileInputRef}
            {...field}
            {...props}
            accept="image/*"
            id={field.name}
            onChange={handleChange}
            type="file"
            value={undefined}
          />
        </S.UploadButton>
      )}
      <S.SecondaryContainer>
        <ErrorMessage component={S.ErrorMessage} name={field.name} />
      </S.SecondaryContainer>
    </>
  );
};

export default FileInput;

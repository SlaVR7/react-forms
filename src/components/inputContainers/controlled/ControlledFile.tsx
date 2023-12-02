import React, { useEffect } from 'react';
import { IFileContainer } from '../../../lib/types/interfaces';

export function ControlledFile({
  errors,
  setValue,
  file,
  setFile,
}: IFileContainer) {
  useEffect(() => {
    if (file) {
      setValue('file', file, { shouldValidate: true });
    } else {
      setValue('file', file!, { shouldValidate: false });
    }
  }, [file]);
  return (
    <label>
      <div className="field-name">Upload picture:</div>
      <div>
        <div className={errors ? 'warning' : 'empty-warning'}>{errors}</div>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) setFile(e.target.files[0]);
          }}
        />
      </div>
    </label>
  );
}

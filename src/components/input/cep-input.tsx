import React from 'react';
import InputMask from 'react-input-mask';

import { Input } from '@/components/ui/input';

const CepInput = React.forwardRef<HTMLInputElement, any>(
  ({ ...props }, ref) => {
    return (
      <div className="space-y-2">
        <InputMask mask="99999-999" {...props}>
          {(inputProps: any) => (
            <Input
              {...inputProps}
              ref={ref}
              id="cep"
              placeholder="00000-000"
              className="w-full"
            />
          )}
        </InputMask>
      </div>
    );
  },
);

CepInput.displayName = 'CepInput';
export default CepInput;

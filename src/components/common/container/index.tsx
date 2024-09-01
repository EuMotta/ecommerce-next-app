import React from 'react';

import { ChildrenProps, ClassNames } from '@/../@Types/global';

import styles from './Container.module.css';

const Container: React.FC<ChildrenProps & ClassNames> = ({
  children,
  className,
  ...rest
}) => {
  let containerClassName = styles.space;

  if (className) {
    containerClassName = `${containerClassName} ${className}`;
  }

  return (
    <div className={containerClassName} {...rest}>
      {children}
    </div>
  );
};

export default Container;

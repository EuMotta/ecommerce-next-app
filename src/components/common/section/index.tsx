import { ForwardedRef, HTMLAttributes, forwardRef } from 'react';

import styles from './Section.module.css';

/* Interface para receber as tipagens padroes do HTML */
interface SectionProps extends HTMLAttributes<HTMLElement> {}

const Section = forwardRef(function Section(
  props: SectionProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const { children, className, ...rest } = props;

  let sectionClassName = styles.section;

  if (className) {
    sectionClassName = `${sectionClassName} ${className}`;
  }

  return (
    <section ref={ref} className={sectionClassName} {...rest}>
      {children}
    </section>
  );
});

export default Section;

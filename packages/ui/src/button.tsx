import { forwardRef } from "react";
import { button, type ButtonVariantProps } from "styled-system/recipes";
import { cx } from "styled-system/css";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const [variantProps, rest] = button.splitVariantProps(props);
    const { className, ...htmlProps } = rest;
    return (
      <button
        ref={ref}
        className={cx(button(variantProps), className)}
        {...htmlProps}
      />
    );
  }
);

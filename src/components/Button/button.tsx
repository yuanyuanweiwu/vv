import React, { FC } from "react";
import classNames from "classnames";
export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}
export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

const Button: FC<BaseButtonProps> = (props) => {
  const { type, className, disabled, size, children, href } = props;
  const classes = classNames("btn", className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled: type === "link" && disabled,
  });
  if (type === "link" && href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  type: ButtonType.Default,
};
export default Button;

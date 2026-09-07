import { alert, type AlertVariantProps } from "styled-system/recipes";

export type AlertProps = AlertVariantProps & {
  title: string;
  children: React.ReactNode;
};

export function Alert({ tone, title, children }: AlertProps) {
  const classes = alert({ tone });
  return (
    <div className={classes.root}>
      <p className={classes.title}>{title}</p>
      <p className={classes.description}>{children}</p>
    </div>
  );
}

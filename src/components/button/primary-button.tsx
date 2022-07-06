import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

export const PrimaryButton: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  return (
    <button
      className="bg-purple-500 text-white py-3 px-8 rounded-md justify-center"
      {...props}
    />
  );
};

export const PrimaryButtonWithAlertOption: React.FC<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { isAlert: boolean }
> = ({ isAlert, ...props }) => {
  return (
    <button
      className={clsx("text-white py-3 rounded-md flex flex-1 justify-center", {
        "bg-purple-500": !isAlert,
        "bg-red-500": isAlert,
      })}
      {...props}
    />
  );
};

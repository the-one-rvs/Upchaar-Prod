import React from "react";

const sizes = {
  xs: "text-[11px] font-normal",
  lg: "text-[15px] font-medium",
  s: "text-xs font-normal",
  "2xl": "text-lg font-medium",
  "3xl": "text-[27px] font-medium md:text-[25px] sm:text-[23px]",
  xl: "text-[17px] font-medium",
  md: "text-[13px] font-normal",
};

const Text = ({ children, className = "", as, size = "s", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-blue_gray-800_01 font-abeezee ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };

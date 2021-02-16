import React, { forwardRef, ReactHTMLElement } from "react";
import { Helmet } from "react-helmet";

const Page = forwardRef((props: any, ref) => {
  const { children, title, ...rest } = props;

  return (
    <div ref={ref as any} {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;

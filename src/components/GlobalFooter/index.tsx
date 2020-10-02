import React from "react";
import "./index.less";
// @ts-ignore
export const GlobalFooter = ({ className, links, copyright }) => {
  return (
    <footer className={"globalFooter"}>
      {links && (
        <div className={"links"}>
          {links.map(
            (link: {
              key: string;
              blankTarget: any;
              href: string | undefined;
              title: string;
            }) => (
              <a
                key={link.key}
                title={link.key}
                target={link.blankTarget ? "_blank" : "_self"}
                href={link.href}
              >
                {link.title}
              </a>
            )
          )}
        </div>
      )}
      {copyright && <div className={"copyright"}>{copyright}</div>}
    </footer>
  );
};

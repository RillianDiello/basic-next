import Link, {LinkProps} from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}
export function ActiveLink ({children, activeClassName, ...otherProps}: 
  ActiveLinkProps) {
  const {asPath} = useRouter();

  const classNameActive = asPath === otherProps.href ? activeClassName : '';
  return (
    <Link legacyBehavior {...otherProps}>
      {cloneElement(children, {className:classNameActive})}
    </Link>
  )
}
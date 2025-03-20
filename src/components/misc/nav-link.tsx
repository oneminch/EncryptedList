"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  activeClassName: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  activeClassName,
  children,
  className,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link {...props} className={`${className} ${isActive && activeClassName}`}>
      {children}
    </Link>
  );
};

export default NavLink;

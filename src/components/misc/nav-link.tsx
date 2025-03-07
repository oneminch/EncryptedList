"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  activeClassName: string;
}

export default function NavLink({
  activeClassName,
  children,
  className,
  ...props
}: NavLinkProps): React.ReactNode {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link {...props} className={`${className} ${isActive && activeClassName}`}>
      {children}
    </Link>
  );
}

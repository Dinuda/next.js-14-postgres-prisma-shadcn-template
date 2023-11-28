import Link from "next/link";
import { INavLink } from "../../interface/INavLink";


export function NavElements({ navigationLinks }: { navigationLinks: INavLink[] }) {
  return (
    <nav
      className="flex items-center space-x-4 lg:space-x-6">
        {navigationLinks.map((link: { key: string, value: string}) => (
            <Link
            key={link.key}
            href={`/${link.value}`}
            className="text-sm font-medium transition-colors hover:text-primary"
            >
            {link.key}
            </Link>
        ))}
    </nav>
  );
}

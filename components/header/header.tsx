import { getServerSession } from "next-auth/next";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import SignOut from "../sign-out";

export default async function Header() {
  const navigation = [
    { key: "Home", value: "" },
    { key: "features", value: "features" },
    { key: "pricing", value: "pricing" },
  ];

  const session = await getServerSession();
  return (
    <div className="bg-white absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              className="h-8 w-auto"
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {Object.values(navigation).map((item) => (
            <a
              key={item.key}
              href={item.value}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.key}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {session && session.user ? (
            <div>
            <p>Hello, {session.user?.email}</p>
            <SignOut />
            </div>
          ) : (
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
          )}
        </div>
      </nav>
    </div>
  );
}

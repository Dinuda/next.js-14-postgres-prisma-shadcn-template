import { getServerSession } from "next-auth/next";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import ProfileSwitcher from "../ui/nav/profile-switcher";
import { UserNav } from "../ui/nav/user-nav";
import { NavElements } from "../ui/nav/nav-elements";

export default async function Header() {
  const navigation = [
    { key: "Home", value: "" },
    { key: "features", value: "features" },
    { key: "pricing", value: "pricing" },
  ];

  const session = await getServerSession();
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <ProfileSwitcher />
            <div className="mx-6">
              <NavElements />
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

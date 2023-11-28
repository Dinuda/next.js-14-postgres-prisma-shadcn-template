import { getServerSession } from "next-auth/next";
import ProfileSwitcher from "../ui/nav/profile-switcher";
import { UserNav } from "../ui/nav/user-nav";
import { NavElements } from "../ui/nav/nav-elements";
import { INavLink } from "../interface/INavLink";


export default async function Header() {
  const navigation = [
    { key: "Home", value: "" },
    { key: "About", value: "features" },
    { key: "Pricing", value: "pricing" },
  ] as INavLink[];

  const session = await getServerSession();
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <ProfileSwitcher />
            <div className="mx-6">
              <NavElements navigationLinks={navigation} />
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

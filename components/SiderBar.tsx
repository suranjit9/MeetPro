"use client";
import { siderBarLink } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SiderBar = () => {
  const pathname = usePathname();
  return (
    <section className=" static left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className=" flex flex-col gap-6">
        {siderBarLink.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(link.route);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                `flex gap-4 items-center p-4 rounded-lg justify-center`,
                { "bg-blue-1": isActive }
              )}
            >
              <Image src={link.imgUrl} alt={link.label} width={24} height={24}/>
              {link.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SiderBar;
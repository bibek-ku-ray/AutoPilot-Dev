
import { onBoardUser } from "@/modules/actions";
import Navbar from "@/modules/home/components/nav-bar";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  await onBoardUser();
  return (
    <div className="">
      <Navbar/>
      {children}</div>
  );
}

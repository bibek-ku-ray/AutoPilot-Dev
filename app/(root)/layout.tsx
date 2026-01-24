import Navbar from "@/components/nav-bar";
import { onBoardUser } from "@/modules/actions";
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

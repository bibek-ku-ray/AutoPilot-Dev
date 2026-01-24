"use client";

import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-500">
      <div className="flex justify-around items-center">
        <div className="">Logo</div>
        <div className="">nav</div>

        <div className="space-x-2">
          <ModeToggle />
          <Button
            onClick={() => router.push("/sign-up")}
            className="cursor-pointer"
          >
            Sign up
          </Button>
          <Button
            onClick={() => router.push("/sign-in")}
            className="cursor-pointer"
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

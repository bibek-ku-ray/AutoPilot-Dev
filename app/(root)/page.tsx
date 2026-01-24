import { UserButton } from "@clerk/nextjs";

export default async function Page() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <p className="">bibek</p>
        <UserButton/>
      </div>
    </>
  );
}

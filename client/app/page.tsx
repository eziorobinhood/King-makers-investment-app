import Image from "next/image";
import DashboardPage from "./dashboard/page";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans bg-white">
      <DashboardPage />
    </div>
  );
}

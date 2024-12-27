import Navbar from "@/app/ui/dashboard/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-screen h-screen flex bg-gray-50 gap-x-2">
      <header className="shadow-md shadow-gray-200 bg-white">
        <Navbar />
      </header>

      <div className="items-stretch grow w-full h-full overflow-y-auto pr-6 pl-4 pt-9 pb-4">
        {children}
      </div>
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Siderbar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";

const Dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
  const ApiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <div>
          <Siderbar isPro={isPro} apiLimitCount={ApiLimitCount} />
        </div>
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};
export default Dashboardlayout;

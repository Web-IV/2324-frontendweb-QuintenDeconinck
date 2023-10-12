import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";

export default function Home() {
  //const { data } = api.products.getAll.useQuery();

  return (
    <>
      <div className="space-y-10 pb-10">
        <div className="overflow-hidden rounded-lg p-4 sm:p-6 lg:p-8">
          <div
            style={{ backgroundImage: `url(French_Fries.jpg)` }}
            className="relative aspect-square overflow-hidden rounded-lg bg-cover md:aspect-[2.4/1]"
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
              <div className=" max-w-xs rounded-lg p-8 font-bold sm:max-w-xl">
                <Button size="lg" className="w-full p-12 text-3xl">
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

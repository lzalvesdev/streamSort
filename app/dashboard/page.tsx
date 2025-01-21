import Loading from "@/components/ui/loader";
import { Suspense } from "react";
import GerarPlaylistPage from "./gerarPlaylist/gerarPlaylist";

export default async function PageHome() {

  return (
    <>
      <div className='md:max-w-[980px] justify-center mx-auto'>
        <Suspense fallback={<Loading />}>
          <GerarPlaylistPage />
        </Suspense>
      </div>
    </>
  );
}

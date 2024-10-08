import Docs from "@/components/Docs/Docs";
import { ToTopComponent } from "@/components/Docs/ToTopComponent";
import dynamic from "next/dynamic";

const CurvyLineArt = dynamic(() => import("@/components/Docs/CurvyLineArt"), {
  ssr: false,
});
export default async function Home() {
    return (
      <>
      <div className="relative flex h-full flex-col px-4 py-24 sm:px-6 lg:px-8 backdrop-blur-3xl bg-black" >
        <div className="absolute left-1/2 top-0 ml-[-50%] h-[25rem] w-full -z-50 max-w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-900  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-blue-500/30 dark:to-[#450a0a]/80 ">
            <svg
              aria-hidden="true"
              className="dark:fill-white/2.5 absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:stroke-white/5"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern
                  id="gridPattern"
                  width="72"
                  height="56"
                  patternUnits="userSpaceOnUse"
                  x="-12"
                  y="4"
                >
                  <path d="M.5 56V.5H72" fill="none"></path>
                </pattern>
              </defs>
              <rect width="100%" height="100%" strokeWidth="0" fill="url(#gridPattern)"></rect>
              <svg x="-12" y="4" className="overflow-visible">
                <rect strokeWidth="0" width="73" height="57" x="288" y="168"></rect>
                <rect strokeWidth="0" width="73" height="57" x="144" y="56"></rect>
                <rect strokeWidth="0" width="73" height="57" x="504" y="168"></rect>
                <rect strokeWidth="0" width="73" height="57" x="720" y="336"></rect>
              </svg>
            </svg>
          </div>
          <svg
            viewBox="0 0 1113 440"
            aria-hidden="true"
            className="absolute left-1/2 top-0 w-full max-w-[69.5625rem] ml-[-50%] fill-white blur-[26px] dark:hidden"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z"></path>
          </svg>
        </div>
       
        <Docs/>
        <CurvyLineArt/>
      </div>
      <ToTopComponent />

      </>
    );
  }
  
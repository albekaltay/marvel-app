"use client";

// next
import Link from "next/link";

// ----------------------------------------------------------------------------

const HomeView = () => {
  return (
    <div className="flex flex-col min-h-screen items-center px-10 py-5 md:px-24 md:py-12">
      <div className="font-semibold mb-14 xl:mb-28 flex flex-col items-center justify-center">
        <p className="text-center text-2xl  xl:text-4xl mb-2">
          Welcome to Marvel APP!
        </p>
        <p className="text-center text-xl xl:text-2xl">
          Explore Comics, Series, Characters and more...
        </p>
      </div>

      <div className="flex flex-col xl:flex-row xl:space-x-8 xl:space-y-0 space-y-8">
        <HomeImage
          text="Comics"
          href="/comics"
          source={
            "http://i.annihil.us/u/prod/marvel/i/mg/c/80/5e3d7536c8ada.jpg"
          }
        />
        <HomeImage
          text="Characters"
          href="/characters"
          source={
            "http://i.annihil.us/u/prod/marvel/i/mg/b/70/4c0035adc7d3a.jpg"
          }
        />

        <HomeImage
          text="Series"
          href="/series"
          source={
            "http://i.annihil.us/u/prod/marvel/i/mg/1/00/51644d6b47668.jpg"
          }
        />
      </div>
    </div>
  );
};

export default HomeView;

const HomeImage = ({
  text,
  href,
  source,
}: {
  text: string;
  href: string;
  source: string;
}) => {
  return (
    <Link href={href}>
      <div className="relative overflow-hidden rounded-md  max-w-[400px]  hover:scale-105 cursor-pointer">
        <img
          alt="React Rendezvous"
          loading="lazy"
          width="250"
          height="330"
          decoding="async"
          data-nimg="1"
          className="h-auto w-auto object-fill transition-all hover:scale-105 aspect-[3/4] blur-sm hover:blur-none"
          src={source}
          style={{ color: "transparent" }}
        />
        <span className="absolute font-semibold text-4xl text-white  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          {text}
        </span>
      </div>
    </Link>
  );
};

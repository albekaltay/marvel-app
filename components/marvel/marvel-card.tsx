// types
import { Creators, Item } from "@/types/comics";
// next
import Link from "next/link";
//
import MarvelImage from "./marvel-image";

// ----------------------------------------------------------------------------

interface MarvelCardProps {
  type: "comics" | "series" | "characters";
  href: string;
  src: string;
  title?: string;
  creators?: Creators;
  startYear?: number;
}

// ----------------------------------------------------------------------------

const MarvelCard = ({
  type,
  href,
  src,
  title,
  creators,
  startYear,
}: MarvelCardProps) => {
  return (
    <Link href={href}>
      <div className="space-y-3 w-[250px]">
        <MarvelImage src={src} />
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">{title}</h3>
          <p className="text-xs text-muted-foreground truncate pe-4">
            {startYear && <span> {startYear}</span>}
            {type === "comics" &&
              creators?.items.map((item: Item, index: number) => (
                <span key={index} className="">
                  {item.name +
                    (index + 1 !== creators.items.length ? ", " : "")}
                </span>
              ))}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MarvelCard;

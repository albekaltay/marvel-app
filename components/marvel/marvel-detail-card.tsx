// lib
import { cn } from "@/lib/utils";
//
import MarvelImage from "./marvel-image";

// ----------------------------------------------------------------------------

interface MarvelDetailCardProps {
  title?: string;
  content?: React.ReactNode;
  src?: string;
}

// ----------------------------------------------------------------------------

const MarvelDetailCard = ({ title, content, src }: MarvelDetailCardProps) => {
  return (
    <div className="flex flex-col xl:flex-row xl:space-x-4 justify-center items-center xl:items-start xl:justify-normal ">
      <div className="overflow-hidden rounded-md mb-8 xl:mb-0">
        <MarvelImage width="300" height="380" type="detail" src={src} />
      </div>
      <div className="xl:space-y-1 text-lg py-2 max-w-[750px]">
        {title && (
          <h3 className="leading-none text-md font-semibold mb-4">{title}</h3>
        )}

        {content}
      </div>
    </div>
  );
};

export default MarvelDetailCard;

export const MarvelDetailCardItem = ({
  label,
  text,
  className,
  textGroup,
}: {
  label?: string;
  text?: string;
  textGroup?: any[];
  className?: string;
}) => {
  return (
    <div className={cn("py-2", className)}>
      <p className="text-sm font-semibold">{label}</p>
      {textGroup ? (
        <p className="text-xs text-muted-foreground">
          <span>
            {textGroup?.map(
              (item: any, index: number) =>
                item.name + (index + 1 !== textGroup.length ? ", " : "")
            )}
          </span>
        </p>
      ) : (
        <p className="text-xs text-muted-foreground"> {text}</p>
      )}
    </div>
  );
};

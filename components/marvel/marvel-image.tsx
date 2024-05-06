// lib
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------------

interface MarvelImageProps {
  type?: "normal" | "detail";
  src?: string;
  width?: string;
  height?: string;
  className?: string;
}
// ----------------------------------------------------------------------------

const MarvelImage = ({
  src,
  width = "250",
  height = "330",
  className,
  type = "normal",
}: MarvelImageProps) => {
  return (
    <div className="overflow-hidden rounded-md">
      <img
        alt="React Rendezvous"
        loading="lazy"
        width={width}
        height={height}
        decoding="async"
        data-nimg="1"
        className={cn(
          "object-fill transition-all aspect-[3/4] min-w-[180px] min-h-[146px]",
          type === "normal" && "h-auto w-auto hover:scale-105",
          className
        )}
        src={src}
        style={{ color: "transparent" }}
      />
    </div>
  );
};

export default MarvelImage;

// next
import { useRouter } from "next/navigation";
//
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

// ----------------------------------------------------------------------------

interface MarvelDetailControlerProps {
  title: string;
}
// ----------------------------------------------------------------------------

const MarvelDetailControler = ({ title }: MarvelDetailControlerProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-row items-center space-x-4 py-8">
      <Button variant="outline" size="icon" onClick={() => router.back()}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="font-semibold text-md"> {title} </span>
    </div>
  );
};

export default MarvelDetailControler;

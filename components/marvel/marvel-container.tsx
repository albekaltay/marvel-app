//
import { MarvelCategoriesNav } from "./marvel-categories-nav";

// ----------------------------------------------------------------------------

const MarvelContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-10 py-5 md:px-6 md:py-12">
      <MarvelCategoriesNav />
      <div className="flex min-h-screen flex-col items-center justify-between">
        {children}
      </div>
    </div>
  );
};

export default MarvelContainer;

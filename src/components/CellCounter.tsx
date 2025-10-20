import { useState } from "react";
import { RotateCcw } from "lucide-react";

type CellType = {
  id: string;
  label: string;
  count: number;
};

const CellCounter = () => {
  const [cells, setCells] = useState<CellType[]>([
    { id: "baso", label: "BASO", count: 0 },
    { id: "eosin", label: "EOSINO", count: 0 },
    { id: "myelo", label: "MYELO", count: 0 },
    { id: "juven", label: "JUVEN", count: 0 },
    { id: "stab", label: "STAB", count: 0 },
    { id: "seg", label: "SEG", count: 0 },
    { id: "lymph", label: "LYMPH", count: 0 },
    { id: "mono", label: "MONO", count: 0 },
  ]);

  const total = cells.reduce((sum, cell) => sum + cell.count, 0);

  const incrementCell = (id: string) => {
    setCells((prev) =>
      prev.map((cell) =>
        cell.id === id ? { ...cell, count: cell.count + 1 } : cell
      )
    );
  };

  const resetAll = () => {
    setCells((prev) => prev.map((cell) => ({ ...cell, count: 0 })));
  };

  const formatCount = (count: number): string => {
    return count.toString().padStart(3, "0");
  };

  const getPercentage = (count: number): string => {
    if (total === 0) return "0.0";
    return ((count / total) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="w-full max-w-7xl">
        <div 
          className="bg-[hsl(var(--device-casing))] p-6 rounded-3xl relative"
          style={{
            boxShadow: "var(--shadow-device), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl" />
          
          {/* Display Section - Horizontal Layout */}
          <div className="mb-6 bg-[hsl(var(--lcd-bg))] p-4 rounded-xl relative overflow-hidden"
            style={{ boxShadow: "var(--shadow-display)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between gap-3 relative z-10">
              {cells.map((cell) => (
                <div key={cell.id} className="flex-1 text-center">
                  <div className="text-xs font-bold mb-1 px-2 py-0.5 bg-white/90 text-[hsl(var(--lcd-bg))] rounded inline-block">
                    {cell.label}
                  </div>
                  <div 
                    className="font-mono text-3xl font-bold tracking-wider text-[hsl(var(--lcd-text))]"
                    style={{ 
                      textShadow: "0 0 10px hsl(var(--lcd-text)), 0 0 20px hsl(var(--lcd-text))",
                      transition: "var(--transition-smooth)"
                    }}
                  >
                    {formatCount(cell.count)}
                  </div>
                  <div 
                    className="font-mono text-sm font-semibold tracking-wide text-[hsl(var(--lcd-text))]/80 mt-1"
                    style={{ 
                      textShadow: "0 0 5px hsl(var(--lcd-text))",
                    }}
                  >
                    {getPercentage(cell.count)}%
                  </div>
                </div>
              ))}
              
              {/* Total Display */}
              <div className="flex-1 text-center border-l-2 border-white/20 pl-3">
                <div className="text-xs font-bold mb-1 px-2 py-0.5 bg-destructive text-destructive-foreground rounded inline-block">
                  TOTAL
                </div>
                <div 
                  className="font-mono text-3xl font-bold tracking-wider text-[hsl(var(--lcd-text-total))]"
                  style={{ 
                    textShadow: "0 0 10px hsl(var(--lcd-text-total)), 0 0 20px hsl(var(--lcd-text-total))",
                    transition: "var(--transition-smooth)"
                  }}
                >
                  {formatCount(total)}
                </div>
                <div className="font-mono text-sm font-semibold tracking-wide text-[hsl(var(--lcd-text-total))]/80 mt-1">
                  100%
                </div>
              </div>
            </div>
          </div>

          {/* Button Section - Horizontal Layout */}
          <div className="flex items-center justify-between gap-2">
            {cells.map((cell) => (
              <button
                key={cell.id}
                onClick={() => incrementCell(cell.id)}
                className="flex-1 aspect-square bg-[hsl(var(--button-bg))] hover:bg-[hsl(var(--button-active))] active:scale-95 rounded-full transition-all duration-150 text-white font-bold text-xs flex items-center justify-center relative overflow-hidden group"
                style={{ boxShadow: "var(--shadow-button), inset 0 1px 0 hsl(255 255% 255% / 0.1)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">{cell.label}</span>
              </button>
            ))}
            
            {/* Reset Button */}
            <button
              onClick={resetAll}
              className="flex-1 aspect-square bg-destructive hover:bg-destructive/90 active:scale-95 rounded-full transition-all duration-150 text-destructive-foreground font-bold text-sm flex items-center justify-center relative overflow-hidden group"
              style={{ boxShadow: "var(--shadow-button), inset 0 1px 0 hsl(255 255% 255% / 0.1)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <RotateCcw className="w-5 h-5 relative z-10" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-black/10 to-transparent rounded-b-3xl" />
        </div>
      </div>
    </div>
  );
};

export default CellCounter;

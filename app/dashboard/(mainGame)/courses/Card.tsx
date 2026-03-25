import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";
type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};

const Card = ({ title, id, imageSrc, onClick, disabled, active }: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-7",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="min-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
            <Check className="text-white stroke-[4] h-3 w-3 lg:h-3 lg:w-3" />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={60}
        width={60}
        className="rounded-lg drop-shadow-md border object-cover"
      />
      <p className="text-neutral-700 text-center font-bold mt-3" >
        {title}
      </p>
    </div>
  );
};

export default Card;

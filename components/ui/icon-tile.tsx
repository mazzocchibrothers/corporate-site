import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Site-wide feature/topic icon badge — the colored square that sits above a
 * heading in pillar/feature/benefit cards. `mode` is which background the
 * tile sits on (light section vs. dark section), not a user-facing theme.
 *
 * Spec: 40x40 container, 24x24 icon, 12px border radius, no border.
 *  - dark:  icon #6366F8 @ 100%, background #6366F8 @ 15%
 *  - light: icon #4B4DF7 @ 100%, background #4B4DF7 @ 10%
 */
export type IconTileMode = "light" | "dark";

export interface IconTileProps {
  icon: LucideIcon;
  mode?: IconTileMode;
  className?: string;
  iconClassName?: string;
}

export function IconTile({ icon: Icon, mode = "dark", className, iconClassName }: IconTileProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-xl shrink-0",
        mode === "light" ? "bg-[#4B4DF7]/10" : "bg-[#6366F8]/15",
        className
      )}
    >
      <Icon
        className={cn("w-6 h-6", mode === "light" ? "text-[#4B4DF7]" : "text-[#6366F8]", iconClassName)}
        strokeWidth={1.5}
      />
    </div>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface RgbContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const RgbContainer = ({ children, className }: RgbContainerProps) => {
    return (
        <div
            className={cn(
                "relative rounded-xl overflow-hidden shadow-sm p-[2px] pt-0",
                className
            )}
        >
            {/* Animated Gradient Background - Acts as the border for L, R, B */}
            <motion.div
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity
                }}
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "linear-gradient(90deg, #FF0080, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #AA00FF, #FF0080)",
                    backgroundSize: "200% 100%"
                }}
            />

            {/* Inner Content Container */}
            <div className="relative z-10 w-full h-full bg-white dark:bg-zinc-950 rounded-b-lg rounded-t-xl border-t border-zinc-200 dark:border-zinc-800">
                {children}
            </div>
        </div>
    );
};

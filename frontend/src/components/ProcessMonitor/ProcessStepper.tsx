"use client";

import React from "react";
import { useJobStore } from "@/store/useJobStore";
import { Check, Circle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function ProcessStepper() {
    const { steps } = useJobStore();

    return (
        <div className="w-full max-w-sm mx-auto p-4">
            <div className="relative">
                {/* Track Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-zinc-200 dark:bg-zinc-800" />

                <div className="space-y-8 relative">
                    {steps.map((step, index) => {
                        const isCompleted = step.status === "completed";
                        const isCurrent = step.status === "current";
                        const isPending = step.status === "pending";

                        return (
                            <div key={step.name} className="relative flex items-center gap-4">
                                {/* Icon Container */}
                                <div
                                    className={cn(
                                        "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500",
                                        isCompleted
                                            ? "border-emerald-500 bg-emerald-500 text-white"
                                            : isCurrent
                                                ? "border-amber-500 bg-amber-500/10 text-amber-500"
                                                : "border-zinc-200 bg-white text-zinc-300 dark:border-zinc-700 dark:bg-zinc-900"
                                    )}
                                >
                                    {isCompleted && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                        >
                                            <Check className="h-5 w-5" />
                                        </motion.div>
                                    )}
                                    {isCurrent && (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    )}
                                    {isPending && (
                                        <Circle className="h-3 w-3 fill-current" />
                                    )}
                                </div>

                                {/* Text Content */}
                                <div className="flex flex-col">
                                    <span
                                        className={cn(
                                            "text-sm font-medium transition-colors duration-300",
                                            isCompleted || isCurrent
                                                ? "text-zinc-900 dark:text-zinc-100"
                                                : "text-zinc-400 dark:text-zinc-500"
                                        )}
                                    >
                                        {step.name}
                                    </span>
                                    {isCurrent && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-xs text-amber-500"
                                        >
                                            In Progress...
                                        </motion.span>
                                    )}
                                    {isCompleted && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-xs text-emerald-500"
                                        >
                                            Completed
                                        </motion.span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

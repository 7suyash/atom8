"use client";

import { AnimatedBeam } from "@/components/magicui/animated-beam";
import React, { useRef } from "react";
import { useJobStore } from "@/store/useJobStore";
import {
  Activity,
  Play,
  Monitor,
  Cloud,
  FileUp,
  ScanSearch,
  Database,
  ShieldCheck,
  Check,
  Loader2,
  Circle
} from "lucide-react";
import { usePipeline } from "@/hooks/usePipeline";
import { RgbContainer } from "@/components/magicui/RgbContainer";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function ProcessMonitor() {
  const { status, logs, steps } = useJobStore();
  const { startPipeline } = usePipeline();

  const containerRef = useRef<HTMLDivElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  // Refs for each step
  const stepRef0 = useRef<HTMLDivElement>(null);
  const stepRef1 = useRef<HTMLDivElement>(null);
  const stepRef2 = useRef<HTMLDivElement>(null);
  const stepRef3 = useRef<HTMLDivElement>(null);

  const stepRefs = [stepRef0, stepRef1, stepRef2, stepRef3];

  const isRunning = status === "processing" || status === "uploading";

  // Helper to determining step icon
  const getStepIcon = (index: number, stepStatus: string) => {
    if (stepStatus === 'completed') return <Check className="h-5 w-5 text-emerald-500" />;
    if (stepStatus === 'current') return <Loader2 className="h-5 w-5 animate-spin text-amber-500" />;

    // Default icons based on index
    switch (index) {
      case 0: return <FileUp className="h-5 w-5 text-zinc-500" />;
      case 1: return <ScanSearch className="h-5 w-5 text-zinc-500" />;
      case 2: return <Database className="h-5 w-5 text-zinc-500" />;
      case 3: return <ShieldCheck className="h-5 w-5 text-zinc-500" />;
      default: return <Circle className="h-5 w-5 text-zinc-300" />;
    }
  };

  return (
    <RgbContainer>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500" />
            Live Monitor
          </h2>

          {status === "idle" && (
            <button
              onClick={startPipeline}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              <Play className="w-4 h-4" />
              Start Job
            </button>
          )}
        </div>

        {/* Horizontal Process Visualization */}
        <div
          ref={containerRef}
          className="relative flex h-32 w-full items-center justify-between overflow-hidden rounded-xl bg-zinc-50 px-4 dark:bg-zinc-900"
        >
          {/* Start Node: Monitor */}
          <div className="flex flex-col items-center gap-2 z-10 w-20">
            <div
              ref={monitorRef}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800"
            >
              <Monitor className="h-6 w-6 text-zinc-500" />
            </div>
            <span className="text-xs font-medium text-zinc-500">System</span>
          </div>

          {/* Steps */}
          {steps.map((step, index) => {
            const isCurrent = step.status === 'current';
            const isCompleted = step.status === 'completed';

            return (
              <div key={step.name} className="flex flex-col items-center gap-2 z-10 w-24 text-center">
                <div
                  ref={stepRefs[index]}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border transition-colors duration-300",
                    isCompleted ? "border-emerald-500 ring-2 ring-emerald-500/20" :
                      isCurrent ? "border-amber-500 ring-2 ring-amber-500/20" :
                        "border-zinc-200 dark:border-zinc-800",
                    "dark:bg-zinc-950"
                  )}
                >
                  {getStepIcon(index, step.status)}
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isCurrent ? "text-amber-500" :
                    isCompleted ? "text-emerald-500" :
                      "text-zinc-400"
                )}>
                  {step.name}
                </span>
              </div>
            );
          })}

          {/* End Node: Cloud */}
          <div className="flex flex-col items-center gap-2 z-10 w-20">
            <div
              ref={cloudRef}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800"
            >
              <Cloud className="h-6 w-6 text-zinc-500" />
            </div>
            <span className="text-xs font-medium text-zinc-500">Cloud</span>
          </div>

          {/* Beams */}
          {/* Monitor -> Step 0 */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={monitorRef}
            toRef={stepRef0}
            className={cn("opacity-0", isRunning && "opacity-50")}
            duration={2}
          />

          {/* Step 0 -> Step 1 */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={stepRef0}
            toRef={stepRef1}
            className={cn("opacity-0", isRunning && "opacity-50")}
            duration={2}
          />

          {/* Step 1 -> Step 2 */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={stepRef1}
            toRef={stepRef2}
            className={cn("opacity-0", isRunning && "opacity-50")}
            duration={2}
          />

          {/* Step 2 -> Step 3 */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={stepRef2}
            toRef={stepRef3}
            className={cn("opacity-0", isRunning && "opacity-50")}
            duration={2}
          />

          {/* Step 3 -> Cloud */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={stepRef3}
            toRef={cloudRef}
            className={cn("opacity-0", isRunning && "opacity-50")}
            duration={2}
          />
        </div>

        {/* Console / Logs */}
        <div className="mt-6 bg-zinc-950 rounded-xl overflow-hidden font-mono text-xs border border-zinc-800">
          <div className="flex items-center px-4 py-2 border-b border-zinc-900 bg-zinc-900/50">
            {/* ... (keep dots) ... */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            </div>
            <span className="ml-3 text-zinc-500">Pipeline Output</span>
          </div>

          <div className="p-4 h-32 overflow-y-auto space-y-1 text-zinc-400">
            {logs.length === 0 && (
              <span className="opacity-30">
                Waiting for job to start...
              </span>
            )}
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-zinc-600">
                  [{new Date().toLocaleTimeString()}]
                </span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RgbContainer>
  );
}

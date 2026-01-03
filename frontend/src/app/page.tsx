"use client";

import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import ProcessMonitor from "@/components/ProcessMonitor";

function LandingOverlay({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex items-center justify-center" ref={containerRef}>

      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatedBeam
          className="opacity-40"
          containerRef={containerRef}
          fromRef={fromRef}
          toRef={toRef}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Try
          <span className="block bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
            Atom8
          </span>
        </h1>

        <p className="mt-6 max-w-xl mx-auto text-zinc-400 text-lg">
          Visual AI-powered data extraction.
          Transform unstructured documents into structured data instantly.
        </p>

        <button
          onClick={onClose}
          className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-black text-sm font-semibold transition hover:scale-105"
        >
          Try Atom8
          <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
        </button>

        <p className="mt-4 text-xs text-zinc-500">
          No signup required · Live demo
        </p>
      </div>

      {/* Hidden dummy elements for beam */}
      <div ref={fromRef} className="absolute top-10 left-10 w-1 h-1 opacity-0" />
      <div ref={toRef} className="absolute bottom-10 right-10 w-1 h-1 opacity-0" />
    </div>
  );
}
import IngestionPanel from "@/components/IngestionPanel";
import ResultPreview from "@/components/ResultPreview";
import SchemaEditor from "@/components/SchemaEditor";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";


export default function Home() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <>
      {showLanding && (
        <LandingOverlay onClose={() => setShowLanding(false)} />
      )}
      <main className="min-h-screen bg-zinc-50/50 dark:bg-black p-4 sm:p-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Top App Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Atom8</h1>
            <AnimatedThemeToggler
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Data Extraction Pipeline
              </h1>
              <p className="text-zinc-500 mt-2">
                Transform unstructured documents into structured data with AI.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 my-auto animate-pulse" />
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 my-auto">System Operational</span>
            </div>
          </div>

          {/* content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Column: Configuration */}
            <div className="lg:col-span-4 space-y-6 flex flex-col h-full">
              <IngestionPanel />
              <div className="flex-1 min-h-[400px]">
                <SchemaEditor />
              </div>
            </div>

            {/* Right Column: Execution & Results */}
            <div className="lg:col-span-8 space-y-6 flex flex-col h-full">
              <ProcessMonitor />
              <div className="flex-1 min-h-[400px]">
                <ResultPreview />
              </div>
            </div>

          </div>


        </div>
      </main>
    </>
  );
}

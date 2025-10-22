"use client";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function PixelatedCanvasDemo() {
  return (
    <section className="site-container py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <Badge
          variant="outline"
          className="mb-4 border-slate-700 text-slate-300"
        >
          <Sparkles className="w-3 h-3 mr-2" />
          Interactive Canvas
        </Badge>
        <h2 className="fluid-title font-bold text-white mb-4">
          Experience the Magic
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Hover over the canvas to see the interactive pixelated effect in action
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <PixelatedCanvas
          src="/supabase-logo.png"
          width={640}
          height={360}
          cellSize={3}
          dotScale={0.9}
          shape="square"
          backgroundColor="#000000"
          dropoutStrength={0.3}
          interactive
          distortionStrength={4}
          distortionRadius={100}
          distortionMode="swirl"
          followSpeed={0.15}
          jitterStrength={5}
          jitterSpeed={3}
          sampleAverage
          tintColor="#3ECF8E"
          tintStrength={0.3}
          responsive
          className="rounded-xl border border-slate-800 shadow-2xl w-full max-w-2xl mx-auto"
        />
      </motion.div>
    </section>
  );
}

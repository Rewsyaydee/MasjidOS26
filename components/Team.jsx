"use client";

import { motion } from "framer-motion";
import { Crown, FileText, PenTool, PieChart } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { fadeUp, stagger, viewportOnce } from "@/components/motion";

/**
 * Team — MetamangDev credibility section.
 *
 * Real names + roles signal "this is a committed founding team, not a flyer".
 * Each member gets a role-appropriate icon and the member's initials as a
 * lightweight avatar so we don't depend on photo assets.
 */
const ICONS = [Crown, FileText, PenTool, PieChart];

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Team() {
  const { t } = useLang();
  const tm = t.team;

  return (
    <section id="team" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-50" />
      <div className="arabesque pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            {tm.eyebrow}
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {tm.name}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-2 text-sm font-semibold uppercase tracking-wider text-emerald-glow">
            {tm.built_by}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 italic text-white/60">
            &ldquo;{tm.desc}&rdquo;
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {tm.members.map((member, i) => {
            const Icon = ICONS[i] ?? Crown;
            return (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-gold-500/40"
              >
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-midnight-600 to-midnight-800 font-display text-lg font-bold text-white ring-1 ring-white/10">
                    {initials(member.name)}
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-midnight-950 shadow-glow">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-bold text-white">{member.name}</h3>
                <p className="mt-1 text-xs text-gold-400/90">{member.role}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

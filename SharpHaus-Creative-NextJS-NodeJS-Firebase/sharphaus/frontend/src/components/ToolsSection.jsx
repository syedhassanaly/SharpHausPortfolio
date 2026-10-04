import {
  PenTool,
  Image as ImageIcon,
  Layout,
  Figma,
  Code2,
  Palette,
} from "lucide-react";

import Reveal, {
  StaggerGroup,
  StaggerItem,
} from "@/components/Reveal";

import { tools } from "@/data/services";

const iconMap = {
  PenTool,
  Image: ImageIcon,
  Layout,
  Figma,
  Code2,
  Palette,
};

export default function ToolsSection() {
  return (
    <section className="py-6 sm:py-8">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">

        <Reveal className="mb-6 sm:mb-8">

          <span className="text-brand-500 font-bold text-sm sm:text-base tracking-wider">
            TOOLS OF THE TRADE
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            Software We{" "}
            <span className="text-gradient-brand">
              Design With
            </span>
          </h2>

        </Reveal>

        <StaggerGroup className="flex flex-wrap justify-center gap-3 sm:gap-4">

          {tools.map((tool) => {
            const Icon = iconMap[tool.icon];

            return (
              <StaggerItem key={tool.name}>

                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-ink-800 border-2 border-brand-500/15 hover:border-brand-500 transition-colors duration-300">

                  <Icon
                    size={20}
                    className="text-brand-500"
                  />

                  <span className="text-slate-200 font-semibold text-sm sm:text-base">
                    {tool.name}
                  </span>

                </div>

              </StaggerItem>
            );
          })}

        </StaggerGroup>

      </div>

    </section>
  );
}
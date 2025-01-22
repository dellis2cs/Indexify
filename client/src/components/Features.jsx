import { FileText, Zap, Brain } from "lucide-react";

const features = [
  {
    name: "PDF to Index Cards",
    description:
      "Upload your PDF notes and get condensed, easy-to-review index cards.",
    icon: FileText,
  },
  {
    name: "AI-Powered Summarization",
    description:
      "Our ML model extracts key information for efficient studying.",
    icon: Zap,
  },
  {
    name: "Optimized for Learning",
    description:
      "Designed to enhance retention and make studying more effective.",
    icon: Brain,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-earthyOffWhite font-sourGummy" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-earthyBrown font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-earthyGreen sm:text-4xl">
            Study Smarter with Indexify
          </p>
        </div>
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative bg-earthyCream p-6 rounded-lg shadow-sm"
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-earthyBrown text-earthyCream">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-earthyGreen">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-earthyBrown">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

import React from "react";

interface PolicyHeaderProps {
  badge: string;
  title: string;
  meta: string[];
  description: React.ReactNode;
}

export function PolicyHeader({
  badge,
  title,
  meta,
  description,
}: PolicyHeaderProps) {
  return (
    <header className="space-y-3 pb-6 border-b border-gray-200">
      <div className="inline-block px-3 py-1 bg-[#233768]/10 text-[#233768] rounded-full text-xs font-bold uppercase tracking-wider">
        {badge}
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
        {title}
      </h1>
      <div className="text-xs text-gray-500 flex items-center gap-3 flex-wrap">
        {meta.map((item, index) => (
          <React.Fragment key={item}>
            {index > 0 && <span>•</span>}
            <span>{item}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="text-sm text-gray-600 leading-relaxed font-medium pt-2">
        {description}
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import { SportCategory } from "@/lib/types";

export default function SportCategoryTabs({
  categories,
  onSelect,
}: {
  categories: SportCategory[];
  onSelect?: (sport: SportCategory["id"]) => void;
}) {
  const [active, setActive] = useState<SportCategory["id"]>(categories[0]?.id);

  const handleSelect = (id: SportCategory["id"]) => {
    setActive(id);
    onSelect?.(id);
  };

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {categories.map((category) => {
        const isActive = category.id === active;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => handleSelect(category.id)}
            className={`rounded-2xl border px-6 py-6 text-center transition-colors ${
              isActive
                ? "border-indigo-600 bg-indigo-50 shadow-sm"
                : "border-black/10 bg-white hover:border-black/20"
            }`}
          >
            <span className="text-2xl">{category.icon}</span>
            <p className="mt-2 font-semibold text-ink">{category.label}</p>
            <p className="mt-1 text-sm text-ink/50">
              {category.openGamesCount} açıq oyun
            </p>
          </button>
        );
      })}
    </div>
  );
}
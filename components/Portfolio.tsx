"use client";
import { useState } from "react";
import { ventures } from "@/lib/portfolio";
export function Portfolio() {
  const [filter, setFilter] = useState("All work");
  const visible = ventures.filter(
    (v) => filter === "All work" || v.category === filter,
  );
  return (
    <>
      <div className="amp-filters" aria-label="Filter portfolio">
        {["All work", "Platforms", "Community", "Lifestyle", "Media"].map(
          (f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ),
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} projects shown
      </p>
      <div className="amp-project-grid">
        {visible.map((v) => (
          <a className={"amp-project project-" + v.id} key={v.id} href={v.href}>
            <div className="amp-project-image">
              {v.image ? (
                <img
                  src={v.image}
                  alt={v.name}
                  loading="lazy"
                  width="700"
                  height="460"
                />
              ) : (
                <div className="amp-product-wordmark">
                  <span>A MACKPROJEKT / PLATFORMS</span>
                  <strong>
                    CarePort<span>Connect</span>
                  </strong>
                  <p>Continuity through every handoff.</p>
                </div>
              )}
              <span className="amp-project-category">{v.category}</span>
              <span className="amp-project-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
            <div className="amp-project-copy">
              <p className="amp-label">{v.label}</p>
              <h3>{v.name}</h3>
              <p>{v.description}</p>
              <span className="amp-project-action">
                {v.action} <span aria-hidden="true">↗</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

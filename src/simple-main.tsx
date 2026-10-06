import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { companies } from "./companies";
import "./simple.css";

function CompanyMap() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    const view = L.map(container.current, { zoomControl: false });
    map.current = view;
    L.control.zoom({ position: "bottomright" }).addTo(view);
    const tiles = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    );
    let errors = 0;
    tiles
      .on("tileerror", () => {
        if (++errors >= 3) setFailed(true);
      })
      .addTo(view);
    for (const company of companies) {
      const link = document.createElement("a");
      link.href = company.careers;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className =
        "company-pin" + (company.name === "Addepar" ? " label-left" : "");
      link.setAttribute(
        "aria-label",
        `${company.name} — official careers (${company.area})`,
      );
      link.title = `${company.name} · ${company.area}\nOpen official careers`;
      const emoji = document.createElement("span");
      emoji.className = "pin-emoji";
      emoji.textContent = "📍";
      emoji.setAttribute("aria-hidden", "true");
      const label = document.createElement("span");
      label.className = "pin-name";
      label.textContent = company.name;
      const area = document.createElement("small");
      area.textContent = company.area;
      label.append(area);
      link.append(emoji, label);
      L.DomEvent.disableClickPropagation(link);
      L.marker([company.lat, company.lng], {
        keyboard: false,
        interactive: false,
        icon: L.divIcon({
          className: "pin-container",
          html: link,
          iconSize: [34, 44],
          iconAnchor: [17, 42],
        }),
      }).addTo(view);
    }
    const fit = () =>
      view.fitBounds(
        companies.map((c) => [c.lat, c.lng] as [number, number]),
        {
          paddingTopLeft: [55, 150],
          paddingBottomRight: [180, 80],
          maxZoom: 12,
        },
      );
    fit();
    const observer = new ResizeObserver(() => view.invalidateSize());
    observer.observe(container.current);
    return () => {
      observer.disconnect();
      view.remove();
      map.current = null;
    };
  }, []);
  return (
    <main>
      <div ref={container} className="map" aria-label="Pune company map" />
      <header>
        <div className="eyebrow">PUNE + PCMC</div>
        <h1>Pune Hiring Map</h1>
        <p>
          Click a <span>📍</span> company to open its official careers page.
        </p>
      </header>
      <button
        className="reset"
        onClick={() =>
          map.current?.fitBounds(
            companies.map((c) => [c.lat, c.lng] as [number, number]),
            { padding: [65, 80], maxZoom: 12 },
          )
        }
      >
        Show all pins
      </button>
      {failed && (
        <aside className="fallback">
          <strong>Map unavailable. Open company careers:</strong>
          {companies.map((c) => (
            <a
              key={c.name}
              href={c.careers}
              target="_blank"
              rel="noopener noreferrer"
            >
              📍 {c.name} ↗
            </a>
          ))}
        </aside>
      )}
      <footer>
        Office locations, not live vacancies. Area-level pins are labelled.{" "}
        <details>
          <summary>Location sources</summary>
          {companies.map((c) => (
            <div key={c.name}>
              <a href={c.source} target="_blank" rel="noreferrer">
                {c.name} office ↗
              </a>
              <a href={c.coordinateSource} target="_blank" rel="noreferrer">
                Map reference ↗
              </a>
            </div>
          ))}
        </details>
      </footer>
    </main>
  );
}
createRoot(document.getElementById("root")!).render(<CompanyMap />);

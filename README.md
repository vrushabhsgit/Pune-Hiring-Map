# Pune Hiring Map

A simple Pune map. Click a red **📍 company pin** or its name to open the company's official careers/application page in a new tab.

No job dashboard, accounts, filters, database, or scheduled ingestion. Pins represent offices/office areas, not claims of current vacancies.

## Open locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. For the built version:

```sh
npm run build
npm start
```

Open http://127.0.0.1:3001. The `dist/` directory can also be served by any static website host.

## Pins

Edit `src/companies.ts` to add a company: name, coordinates, area label, official careers URL, and location sources. Do not guess office coordinates.

- **NiCE — Hinjawadi Phase II**: coordinates from the directions link on its [official offices page](https://www.nice.com/company/global-locations?country=208). Opens [official application page](https://www.nice.com/careers/apply).
- **Addepar — Kalyani Nagar, approximate area**: office area confirmed by [Addepar](https://addepar.com/offices/pune); pin uses the [OSM neighbourhood point](https://www.openstreetmap.org/node/2263008472), not a claimed building location. Opens [official careers](https://addepar.com/careers).
- **Cybage — Wadgaon Sheri, campus area**: [official address](https://www.cybage.com/about-us/company-overview) and [OSM campus](https://www.openstreetmap.org/way/438991867). Opens [official careers](https://www.cybage.com/careers).

Office/career sources reviewed 6 October 2026. Current roles and application details are on each company's website.

Map data © OpenStreetMap contributors, ODbL. Tiles follow the [OSMF tile usage policy](https://operations.osmfoundation.org/policies/tiles/): attribution remains visible, normal browser caching, no bulk download or prefetching. Two OSM coordinates were obtained in one-time, sequential lookups and are stored in the source file; the map makes **no geocoding API calls**. The [Nominatim policy](https://operations.osmfoundation.org/policies/nominatim/) limits requests to one per second, requires an identifying user agent and cached results, and prohibits autocomplete/systematic scraping.

If map tiles are unavailable, direct company careers links appear as a fallback.

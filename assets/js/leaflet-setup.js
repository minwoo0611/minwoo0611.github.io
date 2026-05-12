/* Create leaflet map as another node and hide the code block, appending the leaflet node after it */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre>code.language-geojson").forEach((elem) => {
    const jsonData = elem.textContent;
    const backup = elem.parentElement;
    backup.classList.add("unloaded");
    /* create leaflet node */
    let mapElement = document.createElement("div");
    mapElement.classList.add("map");
    backup.after(mapElement);

    var map = L.map(mapElement, {
      maxBounds: [
        [-85, -180],
        [85, 180],
      ],
      maxBoundsViscosity: 0.75,
    });
    map.attributionControl.addAttribution("Map data: Natural Earth");

    const escapeHtml = (value) =>
      String(value).replace(/[&<>"']/g, (character) => {
        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        }[character];
      });

    const pointData = JSON.parse(jsonData);
    const addPlaces = () => {
      let geoJSON = L.geoJSON(pointData, {
        pointToLayer: (feature, latlng) => {
          const isHome = feature.properties && feature.properties.home;
          return L.circleMarker(latlng, {
            radius: isHome ? 7 : 5,
            weight: isHome ? 2.5 : 1.5,
            color: isHome ? "#b91c1c" : "#1d4ed8",
            fillColor: isHome ? "#ef4444" : "#2563eb",
            fillOpacity: isHome ? 0.95 : 0.85,
          });
        },
        onEachFeature: (feature, layer) => {
          const properties = feature.properties || {};
          const title = properties.home ? `Home: ${properties.name}` : properties.name || properties.title;
          const details = [properties.country, properties.region].filter((value, index, values) => value && value !== "Home" && values.indexOf(value) === index);
          if (title || details.length) {
            const popupParts = [];
            if (title) popupParts.push(`<strong>${escapeHtml(title)}</strong>`);
            details.forEach((detail) => popupParts.push(escapeHtml(detail)));
            const popup = popupParts.join("<br>");
            layer.bindPopup(popup);
          }
        },
      }).addTo(map);
      const bounds = geoJSON.getBounds();
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [24, 24] });
      requestAnimationFrame(() => map.invalidateSize());
    };

    fetch("/assets/geo/world-countries-110m.geojson")
      .then((response) => response.json())
      .then((worldData) => {
        L.geoJSON(worldData, {
          interactive: false,
          style: {
            color: "#90a4b8",
            fillColor: "#f8fafc",
            fillOpacity: 0.98,
            weight: 0.7,
          },
        }).addTo(map);
      })
      .catch(() => {
        mapElement.classList.add("map-basemap-fallback");
      })
      .finally(addPlaces);

    window.addEventListener("resize", () => map.invalidateSize());
  });
});

export const searchHelpByLocation = (
  type: 'groups' | 'professionals',
  onStart?: () => void,
  onComplete?: () => void
) => {
  if (onStart) onStart();

  const baseQuery = type === 'groups' 
    ? "grupos de apoyo alcoholicos anonimos" 
    : "psicologos especialistas en adicciones alcoholismo";

  const fallbackSearch = () => {
    if (onComplete) onComplete();
    window.open(`https://www.google.com/search?q=${encodeURIComponent(baseQuery + " cerca de mi")}`, '_blank');
  };

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (onComplete) onComplete();
        const { latitude, longitude } = position.coords;
        // Abre Google Maps centrado en la ubicación del usuario buscando los términos
        window.open(`https://www.google.com/maps/search/${encodeURIComponent(baseQuery)}/@${latitude},${longitude},14z`, '_blank');
      },
      (error) => {
        console.warn("Error obteniendo ubicación, usando búsqueda general:", error);
        fallbackSearch();
      },
      { timeout: 5000, maximumAge: 60000 }
    );
  } else {
    fallbackSearch();
  }
};

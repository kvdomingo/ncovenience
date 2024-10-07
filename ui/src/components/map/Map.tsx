import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useCallback, useEffect, useRef, useState } from "react";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl, { type Map as MapGL } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { api } from "@/api";
import {
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardHeader as CardHeader,
} from "mdbreact";
import "./Map.css";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

function MapView() {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const [mapState, setMapState] = useState({
    lng: 121,
    lat: 12.5,
    zoom: 4.5,
  });
  const mapContainerRef = useRef<HTMLDivElement>(null!);
  const mapRef = useRef<MapGL>(null!);

  useEffect(() => {
    initMap();
  }, []);

  const provinceQuery = useQuery({
    queryKey: ["provinces"],
    queryFn: async () => {
      try {
        const provinces = await api.data.getProvinces();
        initProvinces(provinces.data);
        return provinces;
      } catch (e) {
        let msg = "";
        if (e instanceof AxiosError) {
          msg = e.message;
        }
        console.error(`Provinces failed to load. ${msg}`);
      }
    },
  });

  useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      try {
        const cases = await api.data.cases();
        initCases(cases);
        return cases;
      } catch (e) {
        let msg = "";
        if (e instanceof AxiosError) {
          msg = e.message;
        }
        console.error(`Cases failed to load. ${msg}`);
      }
    },
    enabled: Object.keys(provinceQuery.data?.data ?? {}).length > 0,
  });

  const initMap = useCallback(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom,
    });

    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      }),
    );

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
    );

    mapRef.current.on("move", () => {
      setMapState({
        lng: mapRef.current.getCenter().lng,
        lat: mapRef.current.getCenter().lat,
        zoom: mapRef.current.getZoom(),
      });
    });
  }, [mapState.lng, mapState.lat, mapState.zoom]);

  const initProvinces = useCallback((provinces: Record<string, any>) => {
    mapRef.current.on("load", () => {
      mapRef.current.addSource("provinces", {
        type: "geojson",
        // @ts-ignore
        data: provinces,
      });

      let hoveredStateId: number | null = null;

      mapRef.current.on("mousemove", "province-fills", (e) => {
        if (e.features?.length) {
          if (hoveredStateId) {
            mapRef.current.setFeatureState(
              { source: "provinces", id: hoveredStateId },
              { hover: false },
            );
          }
          hoveredStateId = e.features?.[0].properties?.ID_1 ?? null;
          if (hoveredStateId != null) {
            mapRef.current.setFeatureState(
              { source: "provinces", id: hoveredStateId },
              { hover: true },
            );
          }
        }
      });

      mapRef.current.on("mouseleave", "province-fills", () => {
        if (hoveredStateId) {
          mapRef.current.setFeatureState(
            { source: "provinces", id: hoveredStateId },
            { hover: false },
          );
        }
        hoveredStateId = null;
      });

      mapRef.current.addLayer({
        id: "province-fills",
        type: "fill",
        source: "provinces",
        layout: {},
        paint: {
          "fill-color": "#cccccc",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.5,
          ],
        },
      });

      mapRef.current.addLayer({
        id: "province-borders",
        type: "line",
        source: "provinces",
        layout: {},
        paint: {
          "line-color": "#fcfcfc",
          "line-width": 2,
        },
      });
    });
  }, []);

  const initCases = useCallback((cases: Record<string, any>) => {
    mapRef.current.addSource("cases", {
      type: "geojson",
      // @ts-ignore
      data: cases,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    mapRef.current.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "cases",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 5,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });

    mapRef.current.addLayer({
      id: "clusters",
      type: "circle",
      source: "cases",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#f1f075",
          100,
          "#f19a75",
          750,
          "#f28cb1",
        ],
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      },
    });

    mapRef.current.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "cases",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    });

    mapRef.current.on("click", "clusters", (e) => {
      const features = mapRef.current.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0].properties?.cluster_id;
      const caseSource: any = mapRef.current.getSource("cases");
      caseSource.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
        if (err) return;
        mapRef.current.easeTo({
          // @ts-ignore
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      });
    });

    mapRef.current.on("click", "unclustered-point", (e) => {
      // @ts-ignore
      const coordinates = e.features?.[0].geometry.coordinates.slice();
      const props = e.features?.[0].properties;
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `
          Location: ${props?.residence}
          `,
        )
        .addTo(mapRef.current);
    });

    mapRef.current.on("mouseenter", "clusters", () => {
      mapRef.current.getCanvas().style.cursor = "pointer";
    });

    mapRef.current.on("mouseleave", "clusters", () => {
      mapRef.current.getCanvas().style.cursor = "";
    });
  }, []);

  return (
    <div className="map-container mt-4 mb-5">
      <Card className="mx-5 mb-3">
        <CardHeader className="text-left text-muted text-uppercase">
          Cases Map
        </CardHeader>
        <CardBody className="p-0">
          <div className="map" ref={mapContainerRef} />
        </CardBody>
      </Card>
    </div>
  );
}

export default MapView;

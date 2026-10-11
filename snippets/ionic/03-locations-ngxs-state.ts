/**
 * SHOWCASE SNIPPET — NGXS locations state (map UI)
 * Illustrative only. Keeps map markers / panel / add-mode out of page components.
 */

// import { Action, State, StateContext } from "@ngxs/store";

export interface ILocationMarker {
  markerType: "default" | "user" | "location" | string;
  locationId?: string;
  lat?: number;
  lng?: number;
}

export interface ILocationsStateModel {
  locations?: unknown[];
  selectedLocationInfo?: unknown;
  mapMarkers?: ILocationMarker[];
  mapPanelData?: ILocationMarker;
  locationToBoundId?: string | null;
  selectedMapSegment?: "locations" | "favorites";
  addLocationMode?: boolean;
  newLocationData?: { newLocationMode?: number };
}

const defaults: ILocationsStateModel = {
  addLocationMode: false,
  locationToBoundId: null,
  mapPanelData: { markerType: "default" },
  newLocationData: { newLocationMode: 2 },
  mapMarkers: [],
  locations: []
};

// @State<ILocationsStateModel>({ name: "locations", defaults })
export class LocationsStateShowcase {
  // @Action(LoadLocationsData)
  loadLocationsData(
    patchState: (partial: Partial<ILocationsStateModel>) => void,
    payload: unknown[]
  ) {
    patchState({ locations: payload });
  }

  // @Action(LoadMapMarkers)
  loadMapMarkers(
    patchState: (partial: Partial<ILocationsStateModel>) => void,
    payload: ILocationMarker[]
  ) {
    patchState({ mapMarkers: payload });
  }

  // @Action(SetMapPanel)
  setMapPanel(
    patchState: (partial: Partial<ILocationsStateModel>) => void,
    payload: ILocationMarker
  ) {
    patchState({ mapPanelData: payload });
  }

  // @Action(SetAddLocationMode)
  setAddLocationMode(
    patchState: (partial: Partial<ILocationsStateModel>) => void,
    payload: boolean
  ) {
    patchState({ addLocationMode: payload });
  }
}

void defaults;

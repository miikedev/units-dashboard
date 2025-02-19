import { atom } from "jotai";

import data from "../../../assets/geo.json";

export const statusFilterAtom = atom();
export const fetchedPositionsAtom = atom([]);

export const pageAtom = atom(1);
export const inactivePageAtom = atom(1)
export const unitsAtom = atom([]);
export const unitsPaginationAtom = atom({});
export const columnsAtom = atom([
  { name: "စဥ်", uid: "id" },
  { name: "နာမည်", uid: "name" },
  { name: "လိပ်စာ", uid: "contact" },
  { name: "ရာထူး", uid: "position" },
  { name: "STATUS", uid: "recruitment_status" },
  { name: "LOCATION", uid: "location" },
  { name: "ACTIONS", uid: "actions" },
]);

export const selectedCreateStateKeyAtom = atom({});
export const selectedCreateDistrictKeyAtom = atom({});
export const selectedCreatedTownshipKeyAtom = atom({});
const states = data.map((d) => ({ key: d.mm, label: d.mm }));

export const stateAtom = atom(states);
export const districtAtom = atom((get) =>
  filterDistricts(get(selectedCreateStateKeyAtom)),
);
export const townshipAtom = atom((get) =>
  filterTownships(
    get(selectedCreateStateKeyAtom),
    get(selectedCreateDistrictKeyAtom),
  ),
);

const filterDistricts = (state) => {
  const filterData = data.filter((d) => d.mm === state.state)[0];
  const refinedData = filterData?.districts.map((d) => {
    return { key: d.mm, label: d.mm };
  });
  return refinedData;
};

const filterTownships = (state, district) => {
  if (Object.keys(state).length === 0 || Object.keys(district).length === 0)
    return;
  const filterData = data.filter((d) => d.mm === state?.state)[0];
  const filterTownshipData = filterData?.districts.filter(
    (d) => d.mm === district?.district,
  )[0];
  return filterTownshipData?.townships.map((d) => {
    return { key: d.mm, label: d.mm };
  });
};
export const levelDetailsAtom = atom(
  (get) => {
    const selectedState = get(selectedCreateStateKeyAtom);
    const selectedDistrict = get(selectedCreateDistrictKeyAtom);
    const selectedTownship = get(selectedCreatedTownshipKeyAtom);

    // Build level_details dynamically
    const levelDetails = {};

    if (selectedState) {
      levelDetails.state = { name: selectedState.state };
    }

    if (selectedDistrict) {
      levelDetails.district = { name: selectedDistrict.district };
    }

    if (selectedTownship) {
      levelDetails.township = { name: selectedTownship.township };
    }

    return levelDetails;
  },
  (get, set, update) => {
    if (update.state) {
      set(selectedCreateStateKeyAtom, { state: update.state });
    }
    if (update.district) {
      set(selectedCreateDistrictKeyAtom, { district: update.district });
    }
    if (update.township) {
      set(selectedCreatedTownshipKeyAtom, { township: update.township });
    }
  },
);

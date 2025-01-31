import geo from '../assets/state-and-township.json'
export const states = () => {
    return geo.map(g => g.mm)
}
export const districts = () => {
    return geo.flatMap((state) =>
      state.districts.map((district) => ({
        state: state.mm,
        district: district.mm,
      })),
    )
  }

  export const townships = () => {
    return geo.flatMap((state) =>
      state.districts.flatMap((district) =>
        district.townships.map((township) => ({
          state: state.mm,
          district: district.mm,
          township: township.mm,
        })),
      ),
    )
  }
  
  
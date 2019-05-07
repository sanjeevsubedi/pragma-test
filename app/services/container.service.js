class ContainerService {
  constructor() {}
  /**
   * returns the temperature of various containers
   */

  getContainerTempRange() {
    const containerTempRange = {
      pilsner: {
        min: 4,
        max: 6,
        alias: "Pilsner"
      },
      ipa: {
        min: 5,
        max: 6,
        alias: "IPA"
      },
      lager: {
        min: 4,
        max: 7,
        alias: "Lager"
      },
      stout: {
        min: 6,
        max: 8,
        alias: "Stout"
      },
      wheat: {
        min: 3,
        max: 5,
        alias: "Wheat"
      },
      paleAle: {
        min: 4,
        max: 6,
        alias: "Pale Ale"
      }
    };
    return containerTempRange;
  }
}

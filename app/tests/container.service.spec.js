describe("Container Service", function() {
  let containerService;

  beforeEach(() => {
    containerService = new ContainerService();
  });

  it("should be an instance", () => {
    expect(containerService instanceof ContainerService).toBeTruthy();
  });

  it("getContainerTempRange() should return temperature info of containers", () => {
    const stub = {
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
    const actual = containerService.getContainerTempRange();
    expect(actual).toEqual(stub);
  });
});

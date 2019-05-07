describe("Container Monitor Component", function() {
  let containerMonitorComponent;
  let shadowDOM;
  window = {};

  beforeEach(() => {
    containerMonitorComponent = new ContainerMonitorComponent();

    function createElem(type, options) {
      const elem = document.createElement(type);
      if (options && options.id) {
        elem.setAttribute("id", options.id);
      }
      return elem;
    }
    shadowDOM = createElem("div", null);
    shadowDOM.append(createElem("div", { id: "content" }));

    spyOn(window, "WebSocket").and.returnValue(() => {
      return { onmessage: null };
    });
  });

  it("should be an instance", () => {
    expect(
      containerMonitorComponent instanceof ContainerMonitorComponent
    ).toBeTruthy();
  });

  it("initSensorWebSocket() should initialize web socket", () => {
    const address = "ws://127.0.0.1:1337";
    containerMonitorComponent.initSensorWebSocket();
    expect(window.WebSocket).toHaveBeenCalledWith(address);
  });

  it("render() should render view", () => {
    const realTimeData = {
      pilsner: 5,
      ipa: 5,
      lager: 5,
      stout: 6,
      wheat: 5,
      paleAle: 5
    };
    const shadowRoot = containerMonitorComponent.render(
      realTimeData,
      shadowDOM
    );
    expect(shadowRoot.querySelector("#content").innerHTML).not.toBeNull();
  });
});

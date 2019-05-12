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
      return { onmessage: () => {} };
    });
  });

  it("should be an instance", () => {
    expect(
      containerMonitorComponent instanceof ContainerMonitorComponent
    ).toBeTruthy();
  });

  describe("initSensorWebSocket()", () => {
    let socket;
    beforeEach(() => {
      socket = new window.WebSocket("fake addr");
    });

    it("should initialize web socket", () => {
      containerMonitorComponent.initSensorWebSocket();
      expect(window.WebSocket).toHaveBeenCalledWith("ws://127.0.0.1:1337");
    });

    it("should render view on onmessage callback", () => {
      spyOn(containerMonitorComponent, "render");
      containerMonitorComponent.initSensorWebSocket();
      socket.onmessage({ data: "{}" });
      expect(containerMonitorComponent.render).toHaveBeenCalled();
    });
  });

  it("connectedCallback() should trigger initiation of web socket", () => {
    spyOn(containerMonitorComponent, "initSensorWebSocket");
    containerMonitorComponent.connectedCallback();
    expect(containerMonitorComponent.initSensorWebSocket).toHaveBeenCalled();
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

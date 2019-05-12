const template = document.createElement("template");
template.innerHTML = `
          <style>
            .header {
                display: flex;
                font-size: 18px;
                font-weight: bold;
                border-bottom: 1px solid #000;
            }
            .row div {
                display: flex;
            }
            .col {
                flex: 1;
                padding: 10px;
            }
            .note {
                padding-top: 20px;
                font-weight: bold;
            }
            .error {
              color: #c72f2f;
              border: 1px #c72f2f solid;
              padding: 10px;
              margin: 20px 0;
            }
          </style>
          <div class="header">
              <div class="col">Beer Container</div>
              <div class="col">Real Time Temperature (&deg;C)</div>
              <div class="col">Desired Temperature (&deg;C)</div>
          </div>
          <div id="content" class="row"></div>
          <div class="note">
              Note: Wait for 10 secs to get the undesired temperature. Node js server will send alert after 10 secs (Mimicking Real-time data). There is a web socket listening for live events in the app.
          </div>
  `;

class ContainerMonitorComponent extends HTMLElement {
  constructor() {
    // If you define a constructor, always call super() first as it is required by the CE spec.
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.contentNode = this.shadowRoot.querySelector("#content");
  }

  initSensorWebSocket() {
    const env = new EnvService().getEnv();
    const websocket = new WebSocket(env.socketUrl);
    websocket.onmessage = evt => {
      const realTimeTempInfo = JSON.parse(evt.data) || null;
      if (realTimeTempInfo) {
        this.render(realTimeTempInfo, this.shadowRoot);
      }
    };

    websocket.onerror = evt => {
      this.handleSockerError(this.contentNode);
    };

    websocket.onclose = evt => {
      this.handleSockerError(this.contentNode);
    };
  }

  // Called when element is inserted in DOM
  connectedCallback() {
    this.initSensorWebSocket();
  }

  // TODO: optimize by using interpolation/ template engine in the future
  render(realTimeTempInfo, DOM) {
    const shadowRoot = DOM;
    const containerService = new ContainerService();
    const containerMetaData = containerService.getContainerTempRange();
    const wrapper = shadowRoot.querySelector("#content");
    wrapper.innerHTML = "";

    for (const container in realTimeTempInfo) {
      const realTimeContainerTemp = realTimeTempInfo[container];
      const desiredContainer = containerMetaData[container];
      const containerData = JSON.stringify({
        name: desiredContainer.alias,
        temperature: realTimeContainerTemp,
        range: `${desiredContainer.min} - ${desiredContainer.max}`,
        alert:
          realTimeContainerTemp > desiredContainer.max ||
          realTimeContainerTemp < desiredContainer.min
            ? "true"
            : "false"
      });
      const beerContainer = document.createElement("beer-container");
      beerContainer.setAttribute("data", containerData);
      wrapper.appendChild(beerContainer);
    }
    return shadowRoot;
  }

  handleSockerError(contentNode) {
    const error = document.createElement("div");
    error.classList.add("error");
    error.innerHTML = "Connection error: Please start your socket server";
    contentNode.innerHTML = "";
    contentNode.append(error);
  }
}
window.customElements.define("container-monitor", ContainerMonitorComponent);

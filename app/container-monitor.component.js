class ContainerMonitorComponent extends HTMLElement {
  constructor() {
    // If you define a constructor, always call super() first as it is required by the CE spec.
    super();
    this.initSensorWebSocket();
  }

  initSensorWebSocket() {
    const env = new EnvService().getEnv();
    const websocket = new WebSocket(env.socketUrl);
    websocket.onmessage = evt => {
      const realTimeTempInfo = JSON.parse(evt.data);
      if (realTimeTempInfo) {
        this.render(realTimeTempInfo, this.shadowRoot);
      }
    };
    websocket.onerror = evt => {
      this.shadowRoot.querySelector("#content").innerHTML =
        "<div class='error'>Connection error: Please start your socket server</div>";
    };
  }

  // Called when element is inserted in DOM
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const currentDocument = document.currentScript.ownerDocument;
    const template = currentDocument.querySelector(
      "#container-monitor-template"
    );
    const templateContent = template.content;
    const templateClone = templateContent.cloneNode(true);
    // Append a clone of the template content to the shadow root
    shadowRoot.appendChild(templateClone);
  }

  // TODO: optimize by using interpolation/ template engine in the future
  render(realTimeTempInfo, DOM) {
    const shadowRoot = DOM;
    const containerService = new ContainerService();
    const containerMetaData = containerService.getContainerTempRange();

    let html = "";
    for (const container in realTimeTempInfo) {
      const realTimeContainerTemp = realTimeTempInfo[container];
      const desiredContainer = containerMetaData[container];

      html += `<div class='${
        realTimeContainerTemp > desiredContainer.max ||
        realTimeContainerTemp < desiredContainer.min
          ? "alert"
          : ""
      }'>
        <div class='col'>${desiredContainer.alias}</div>
        <div class='col'>${realTimeContainerTemp}</div>
        <div class='col'>${desiredContainer.min} - ${desiredContainer.max}</div>
      </div>`;
    }

    if (shadowRoot) {
      shadowRoot.querySelector("#content").innerHTML = html;
    }
    return shadowRoot;
  }
}
customElements.define("container-monitor", ContainerMonitorComponent);

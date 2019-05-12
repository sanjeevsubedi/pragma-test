const DateTimeComponent = (function() {
  const template = document.createElement("template");
  template.innerHTML = `
            <style>
            </style>
            <div class="last-updated">Last updated: <span></span></div>
          `;
  class DateTimeComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.lastUpdated = this.shadowRoot.querySelector(".last-updated span");
    }

    connectedCallback() {
      window.addEventListener(
        "onMessage",
        this.handleOnMessageListener.bind(this)
      );
    }

    handleOnMessageListener(evt) {
      this.lastUpdated.innerHTML = formatDate(evt.detail) || null;
    }

    disconnectedCallback() {
      window.removeEventListener(
        "onMessage",
        this.handleOnMessageListener,
        true
      );
    }
  }

  window.customElements.define("date-time", DateTimeComponent);

  return DateTimeComponent;
})();

(function() {
  const template = document.createElement("template");
  template.innerHTML = `
          <style>
          .row {
            display: flex;
          }
          .col {
            flex: 1;
            padding: 10px;
          }
          .alert {
            color: #fff;
            background: #c72f2f;
            border-bottom: 1px solid #fff;
          }
          </style>
          <div class="row">
              <div class="col name"></div>
              <div class="col temperature"></div>
              <div class="col temp-range"></div>
          </div>
        `;
  class BeerContainer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.temperature = this.shadowRoot.querySelector(".temperature");
      this.name = this.shadowRoot.querySelector(".name");
      this.range = this.shadowRoot.querySelector(".temp-range");
      this.row = this.shadowRoot.querySelector(".row");
    }

    connectedCallback() {
      const data = JSON.parse(this.data) || null;
      if (data) {
        this.name.innerHTML = data.name;
        this.temperature.innerHTML = data.temperature;
        this.range.innerHTML = data.range;
        data.alert === "true"
          ? this.row.classList.add("alert")
          : this.row.classList.remove("alert");
      }
    }

    get data() {
      return this.getAttribute("data");
    }
  }

  window.customElements.define("beer-container", BeerContainer);
})();

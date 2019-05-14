describe("DateTime Component", function() {
  let dateTimeComponent;
  window = jasmine.createSpyObj("window", [
    "addEventListener",
    "removeEventListener"
  ]);

  beforeEach(() => {
    dateTimeComponent = new DateTimeComponent();
  });

  it("should be an instance", () => {
    expect(dateTimeComponent instanceof DateTimeComponent).toBeTruthy();
  });

  it("should add event listener when component is added to the DOM", () => {
    spyOn(window, "addEventListener");
    dateTimeComponent.connectedCallback();
    expect(window.addEventListener).toHaveBeenCalled();
  });

  it("should remove event listener when component is disconnected from the document's DOM", () => {
    spyOn(window, "removeEventListener");
    dateTimeComponent.disconnectedCallback();
    expect(window.removeEventListener).toHaveBeenCalled();
  });
});

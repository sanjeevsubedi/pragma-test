const test = require("tape");
const Sensor = require("../modules/sensor");

test("sensor", function(t) {
  const sensor = new Sensor();
  t.ok(typeof sensor === "object", "should be an object");
  t.end();
});

test("getRealTimeTempInfo()", function(t) {
  const sensor = new Sensor();
  t.ok(
    typeof sensor.getRealTimeTempInfo === "function",
    "should be a function"
  );
  const actual = sensor.getRealTimeTempInfo();
  const expected = {
    pilsner: 5,
    ipa: 5,
    lager: 5,
    stout: 6,
    wheat: 5,
    paleAle: 5
  };
  t.deepEqual(actual, expected);
  t.end();
});

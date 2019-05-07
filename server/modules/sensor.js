class Sensor {
  // Mock the sensor data
  // This will be coming from the IoT devices via wifi/ cellular network etc.

  getRealTimeTempInfo() {
    const realTimeData = {
      pilsner: 5,
      ipa: 5,
      lager: 5,
      stout: 6,
      wheat: 5,
      paleAle: 5
    };
    return realTimeData;
  }

  // Mimic some of the containers are out of temperature range
  sendAlert() {
    const realTimeData = {
      pilsner: 5,
      ipa: 5,
      lager: 12,
      stout: 5,
      wheat: 5,
      paleAle: 9
    };
    return realTimeData;
  }
}

module.exports = Sensor;

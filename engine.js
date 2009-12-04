function Engine() {}

Engine.prototype.addSwitchControl = function(switchControl) {
  if (!switchControl) { return }
  if (this.switchControls.contains(switchControl)) { return }
  
  this.switchControls.push(switchControl)
  this.addSwitchControlOnMap(switchControl)
  return this
}

Engine.prototype.removeSwitchControl = function(switchControl) {
  if (switchControl) {
    var i = this.switchControls.indexOf(switchControl)
    if (i < 0) { return }
    this.switchControls.splice(i, 1)
    this.removeSwitchControlFromMap(switchControl)
  } else {
    if (this.switchControls.length > 0) {
      this.removeSwitchControlFromMap(this.switchControls[0])
      this.switchControls.splice(0, 1)
    }
  }
}
function GoogleSwitchControl(engine) {
  this.engine = engine
  this.mapWrapper = this.engine.mapWrapper
  this.container = document.createElement("div")
}

GoogleSwitchControl.prototype = new GControl()

GoogleSwitchControl.prototype.initialize = function(gmap) {
  for (var i = 0; i < this.mapWrapper.engines.length; i++) {
    this._makeDiv(i)
  }
  gmap.getContainer().appendChild(this.container)
  return this.container
}

GoogleSwitchControl.prototype.addEngine = function(engine) {
  if (this.engine == engine) { return } // don't add control to switch to this engine
  
  var div = document.createElement("div")
  this._setButtonStyle(div)
  this.container.appendChild(div);
  div.appendChild(document.createTextNode(engine.codename));
  var _this = this
  GEvent.addDomListener(div, "click", function() {
    _this.mapWrapper.selectEngine(engine)
  });
}

GoogleSwitchControl.prototype._makeDiv = function(engine_index) {
  this.addEngine(this.mapWrapper.engines[engine_index])
}

GoogleSwitchControl.prototype.getDefaultPosition = function() {
  return new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(220, 7));
}

GoogleSwitchControl.prototype._setButtonStyle = function(button) {
  style = { 
    textDecoration: 'underline',
    color: 'darkblue', 
    backgroundColor: 'white', 
    font: 'small Verdana',
    border: '1px solid black',
    padding: '2px',
    marginBottom: '3px',
    textAlign: 'center',
    width: '6em',
    cursor: 'pointer' }
  for (var k in style) {
    button.style[k] = style[k]
  }
}
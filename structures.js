function GeoPoint(lat, lng) {
  this.lat = lat
  this.lng = lng
}

function Marker(lat, lng, style) {
  this.geopoint = new GeoPoint(lat, lng)
  this.style = style
}
Element.prototype.show = function() {
  this.style.display = "block"
  return this
}

Element.prototype.hide = function() {
  this.style.display = "none"
  return this
}

if(!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj) {
    for (i = this.length; i > -1; i--) {
      if (this[i] === obj) {
        return i;
      }
    }
    return -1;
  }
}

Array.prototype.contains = function(obj) { return this.indexOf(obj) > -1 }

// Object.prototype.className = function() {
//   if (this.constructor && this.constructor.toString) {  
//     var arr = this.constructor.toString().match(/function\s*(\w+)/);  
//     if (arr && arr.length == 2) {  
//         return arr[1];  
//     }
//   }  
//   return undefined;
// }
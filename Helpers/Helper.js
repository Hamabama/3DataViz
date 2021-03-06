var Application = Application || {};

Application.Helper = {

  /**
  * Load files orderly.
  * @param files An array of files.
  * @param callback A callback function to be fired when it complete.
  */
  requireOrderly: function(files, callback) {
    Application.Helper.loadFiles(files, 0, function() {
      if (typeof callback === 'function') {
        callback();
      }
    });
  },

  /**
  * Load files recursively.
  */
  loadFiles: function(files, index, callback) {
    if (typeof files[index] === 'undefined') { // load completed.
      if (typeof callback === 'function') {
        callback();
      }
    } else {
      var _files;
      if (typeof files[index] === 'string') {
        _files = [files[index]]; // to load individual file by require.js.
      } else {
        _files = files[index];
      }
      //    console.log(_files);
      require(_files, function() {
        //    console.log("loaded.");
        Application.Helper.loadFiles(files, index + 1, callback);
      });
    }
  },

  /**
  * Inherits prototype of the parent object and copies it into the child object.
  * @param childObject A child object.
  * @param parentObject A parent object.
  */
  inherit: function(childObject, parentObject) {

    var copyOfParent = Object.create(parentObject.prototype);

    copyOfParent.constructor = childObject;
    childObject.prototype = copyOfParent;
  },

  /**
  * Convert Geo coordinates to XYZ coordinates
  * @return THREE.Vector3
  */
  geoToxyz: function(lon, lat, r) {

    var r = r || 1;

    // var phi = lat * Math.PI / 180;
    // var theta = (lon + 90) * Math.PI / 180;
    // var x = r * Math.cos(phi) * Math.sin(theta);
    // var y = r * Math.sin(phi);
    // var z = r * Math.cos(phi) * Math.cos(theta);

    var phi = +(90 - lat) * 0.01745329252;
    var the = +(180 - lon) * 0.01745329252;
    var x = r * Math.sin(the) * Math.sin(phi) * -1;
    var z = r * Math.cos(the) * Math.sin(phi);
    var y = r * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  },
  map: function(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  },
  /**
  * Convert decimal to HEX
  * @return hex
  */
  decToHex: function(c) {
    var hc;
    if (c < 10) {
      hc = ('0' + c.toString(16));
    } else if (c < 17) {
      hc = c.toString(16) + '0';
    } else {
      hc = c.toString(16);
    }
    return hc;
  },

  /**
  * Convert RBG to HEX
  * @return hex
  */
  rgbToHex: function(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  },

  /**
  * Convert component to HEX
  * @return hex
  */
  componentToHex: function(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  },

  getPixelClicked: function(place, canvasContext) {
    var x = place.x;
    var y = place.y;
    var z = place.z;

    var lat = Math.asin(y / radius) * (180 / Math.PI); // LAT in radians
    var lon = Math.atan2(z, x) * (180 / Math.PI) * -1; // LON in radians

    var p = this.geoToxy(lon, lat);

    var imageData = canvasContext.getImageData(p.x, p.y, 1, 1);
    var pixel = imageData.data;

    var r = pixel[0],
    g = pixel[1],
    b = pixel[2];

    var color = this.decToHex(r) +
    this.decToHex(g) +
    this.decToHex(b);

    return color;
  },
  getCountryById: function(id) {
    var country = countiresList[0].elements;
    if (id == '000000')
    return false;
    for (var i = 0; i < country.length; i++) {
      if (country[i].id == id) {
        return country[i];
      }
    }
  },
  getCountryByName: function(name) {
    var country = countiresList[0].elements;
    if (id == '')
    return false;
    for (var i = 0; i < country.length; i++) {
      if (country[i].name == name) {
        return country[i];
      }
    }
  },

  convertDateTimeToStamp: function(datetime) {

    var dateString = datetime,
    dateParts = dateString.split(' '),
    timeParts = dateParts[1].split(':'),
    date;

    dateParts = dateParts[0].split('/');

    date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]);

    return date.getTime();

  },
  getNumber: function(entity) {

    var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
    var number = null;

    if (entity !== 'undefined') {

      if (!isNaN(entity)) number = entity; // check if value is a number
      else {

        var isNumber = FLOAT.test(entity);  // check if value is number in form of string

        var formattedNumber = entity.replace(/[\,\s]/g, ''); // replace commas in string

        var isNumber = FLOAT.test(formattedNumber);  // check if now the string is a number

        if (isNumber) number = parseFloat(formattedNumber); // parse out number if so

      }

    }
    return number;
  },

  formatNumber: function(num) {
    return (num) ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : "";
  },

  breakStringToArray: function(string) {

    var array = string.split(/[\,\.\s]/);
    array.forEach(function(element, index) {

      element.replace(/\s/g, '');

      var index = array.indexOf('');

      if (index != -1)
      array.splice(index, 1);
    });

    return array;

  },
  getFileExtention: function(filename){
    return (/[.]/.exec(filename)) ? (/[^.]+$/.exec(filename))[0] : undefined;
  },

  capitalize: function(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  getRandomColor: function(obj){
    return randomColor(obj || {luminosity: 'bright' });
  },
  lerp: function(a,b,u) {
    return (1-u) * a + u * b;
  },
  produceColorsArray: function(start, end, amount) {
    var array = [];
    var step_u = 1.0/amount;
    var u = 0.0;

    for (var i = 0; i < amount; i++) {
      var r = parseInt(lerp(start.r, end.r, u));
      var g = parseInt(lerp(start.g, end.g, u));
      var b = parseInt(lerp(start.b, end.b, u));
      var colorname = 'rgb('+r+','+g+','+b+')';
      u += step_u;

      array.push(colorname);
    }
    return array;
  },
  positionImageText: function(scene, text, x, y, z, callback){
    this.getSVGTextImage(text, function(img){

      var sprite = new THREE.Texture(img);
      var sp = new THREE.SpriteMaterial({
        map: sprite,
        color: 0xffffff
      });
      var mesh = new THREE.Sprite(sp);
      mesh.scale.multiplyScalar(10);
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.position.z = z;
      sprite.needsUpdate = true;
      scene.add(mesh);
      if(typeof callback !== 'undefined') callback(mesh);
    });
  },
  getSVGTextImage: function(str, callback){

    var data = 'data:image/svg+xml,' + '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="2000" width="2000" viewBox="0 0 2000 2000"><text x="1000" y="1000" fill="white" font-size="600" style="text-anchor: middle; dominant-baseline: middle;">'+str+'</text></svg>';
    var img = new Image();

    var canvas = document.createElement( "canvas" );
    canvas.width = 2000;
    canvas.height = 2000;
    var ctx = canvas.getContext( "2d" );
    img.onload = function() {
      ctx.drawImage( img, 0, 0 );
      var pngImg = new Image();
      pngImg.onload = function(){
        svg = null;
        canvas = null;
        ctx = null;
        img = null;
        if( callback ) callback(pngImg);
      }
      pngImg.src = canvas.toDataURL( "image/png" )
    };
    img.src = data;
  },

  HSV2HEX : function(h,s,v) {
    // adapted from http://schinckel.net/2012/01/10/hsv-to-rgb-in-javascript/
    var rgb, i, data = [];
    if (s === 0) {
      rgb = [v,v,v];
    } else {
      h = h / 60;
      i = Math.floor(h);
      data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
      switch(i) {
        case 0:
        rgb = [v, data[2], data[0]];
        break;
        case 1:
        rgb = [data[1], v, data[0]];
        break;
        case 2:
        rgb = [data[0], v, data[2]];
        break;
        case 3:
        rgb = [data[0], data[1], v];
        break;
        case 4:
        rgb = [data[2], data[0], v];
        break;
        default:
        rgb = [v, data[0], data[1]];
        break;
      }
    }
    return '#' + rgb.map(function(x){
      return ("0" + Math.round(x*255).toString(16)).slice(-2);
    }).join('');
  }
}

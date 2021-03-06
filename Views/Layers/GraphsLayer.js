/**
** @author Bruno Di Giuseppe / smokingcobra.com
**/
var Application = Application || {};

Application.GraphsLayer = Application.BaseGlobeView.extend({

    initialize: function(decorator, collections) {

        Application.BaseGlobeView.prototype.initialize.call(this, decorator, collections);

        //time factor for animations
        this.t = 0;

        this.timer = []; // array of timers for setTimeout

        //variables used to set the size of the objects and camera/controls orientation
        this.cylinderRadius = this.globeRadius * 0.005;
        this.cylinderHeight = this.globeRadius / 500;

        // Arrays for controlling the scene actors
        this.airportPoints = [];
        this.airports = [];
        this.flights = [];
        this.airportMeshes = [];
        this.createdAirports = [];
        this.createdAirplaness = [];
        this.paths = [];
        this.categories = [];
        this.moObjects = [];
        this.prevObjects = [];
        // this is where I set up all the objects. Later on, I just instantiate them
        // with different positions/ rotations. This is the main improvement so far,
        // performance wise

        this.airportGeometry = new THREE.SphereGeometry(this.cylinderRadius, 12, 10);
        this.airportMaterial = new THREE.MeshBasicMaterial({
            color: 0x1944e4
        });

        this.pathMaterial = new THREE.LineBasicMaterial({
            color: 0xadedff,
            transparent: true,
        });

        this.airplaneGeometry = new THREE.TetrahedronGeometry(this.cylinderRadius);
        this.airplaneMaterial = new THREE.MeshBasicMaterial({
            color: 0xa4c800
        });
    },
    destroy: function() {

        this.resetGlobe();
        Application.BaseGlobeView.prototype.destroy.call(this);

        var that = this;
        this.airportMeshes = null;
        this.moObjects = null;
    },
    reset: function() {
        Application.BaseGlobeView.prototype.reset.call(this);
        this.resetGlobe();
    },
    resetGlobe: function() {

        var that = this;

        if (this.timer && this.timer.length) {

            $.each(this.timer, function(index, id) {
                clearTimeout(id);
            });
        }

        $.each(this.airportMeshes, function(i, mesh) {
            if(that.scene){
              that.scene.remove(mesh);
            }
            // mesh.geometry.dispose();
            mesh.material.dispose();
        });

        if (this.airportMeshes.length) {
        this.airportMeshes[0].geometry.dispose();  // hadve to do it this way because all the meshes share geometry
    }

        this.airportMeshes.length = 0;

        $.each(this.moObjects, function(i, mesh) {
            if(that.scene){
              that.scene.remove(mesh);
            }
            mesh.geometry.dispose();
            mesh.material.dispose();
        });

        this.moObjects.length = 0;

        this.airportPoints.length = 0;

    },
    // visualization specific functionality
    updateGlobe: function() {
        //this is going to move the airplanes around the world.
        // First we check to see if there are paths and planes
        // second, we iterate through the airplanes list
        // then we check to see if the path is finished or not
        // then black magic and things move.
        if (typeof(this.createdAirplaness) !== "undefined" && typeof(this.paths) !== "undefined") {

            for (var i = 0; i < this.createdAirplaness.length; i++) {

                if (this.createdAirplaness[i][2] >= 1) {

                    this.createdAirplaness[i][2] = 0;
                } else {

                    this.createdAirplaness[i][2] += this.createdAirplaness[i][1]
                }

                (this.t >= 1) ? this.t = 0: this.t += 0.005;

                pt = this.paths[i].getPoint(this.createdAirplaness[i][2]);
                this.createdAirplaness[i][0].position.set(pt.x, pt.y, pt.z);
            }
        }

        Application.BaseGlobeView.prototype.updateGlobe.call(this);
    },

    clickOn: function(event) {

        var intersectedMesh = Application.BaseGlobeView.prototype.clickOn.call(this, event);

        Application._vent.trigger('vizinfocenter/message/off');

        if (intersectedMesh) {

            var name = intersectedMesh.object.userData.name;
            Application._vent.trigger('vizinfocenter/message/on', name +
            ': ' + this.pointsPerCountry(this.airportMeshes, name) + ' points');

        }
    },
    onMouseMove: function(e) {

        Application.BaseGlobeView.prototype.onMouseMove.call(this, e);
        var that = this;
        //ray casting
        var closest = this.rayCast(this.moObjects, e);
        this.changePrevObjects();

        if (closest != null) {

            if (closest.object.visible == false ) return;

            if (closest.object.name !== 'globe') {
                closest.object.material.linewidth = 8;

                this.prevObjects.push(closest);
                var data = closest.object.userData;
                var msg = "";
                if (typeof data.label_from !== 'undefined' && typeof data.label_to !== 'undefined' && data.label_to !== "" && data.label_from !== "") {
                    msg += ("From: " + data.label_from + "<br>" + "To: " + data.label_to + "<br>");
                }
                if (typeof data.value !== 'undefined') {
                    msg += (" (" + data.value + ")");
                }
                if (msg !== "") {
                    Application._vent.trigger('vizinfocenter/message/on', msg);
                }

            } else {
                this.changePrevObjects();
            }
        } else {
            this.changePrevObjects();
            Application._vent.trigger('vizinfocenter/message/off');
        }

    },
    changePrevObjects: function() {
        var that = this;
        if (typeof this.prevObjects !== 'undefined') {
            $.each(this.prevObjects, function(i, obj) {
                if (typeof obj != 'undefined') {
                    obj.object.material.linewidth = 1;
                    that.prevObjects.splice($.inArray(i, that.prevObjects), 1);
                }
            });
        }
    },
    // core function of the application. THIS IS WHERE THE MAGIC HAPPENS
    addPaths: function(results) {
        //  console.log(Application.attrsMap);
        var i = 0
        var dataRecord;
        var randomIndex;

        var srcAirport;
        var destAirport;
        var time = 100;
        var that = this;
        var timeoutref = null;

        // if(dataRecord == null || dataRecord.length == 0){
        //     Application._vent.trigger('vizinfocenter/message/on', "There is no data can visualize.");
        // }

        $.each(results, function(index, dataRecord) {

            time = time + 10;
            if (dataRecord.latitude_from == null || dataRecord.longitude_from == null || dataRecord.latitude_to == null || dataRecord.longitude_to == null) {
                return;
            }

            var timeoutref = setTimeout(function() {

                // console.log(dataRecord);
                var category = that.getCategoryObj(dataRecord.category);

                var airportFrom = {
                    longitude: dataRecord.longitude_from || null,
                    latitude: dataRecord.latitude_from || null,
                    label: dataRecord.label_from || null,
                }

                var airportTo = {
                    longitude: dataRecord.longitude_to || null,
                    latitude: dataRecord.latitude_to || null,
                    label: dataRecord.label_to || null,
                }

                if (!that.airportCreated(airportFrom)) {
                    var from = that.createAirportMesh(airportFrom, category);
                }
                if (!that.airportCreated(airportTo)) {
                    var to = that.createAirportMesh(airportTo, category);
                }

                var vF = Application.Helper.geoToxyz( airportFrom.longitude , airportFrom.latitude , 51);
                var vT = Application.Helper.geoToxyz( airportTo.longitude , airportTo.latitude , 51);
                var dist = vF.distanceTo(vT);
                var path = that.createPath(vF, vT, dist, category);
                path.userData = dataRecord;

                // var flight = {};

                // flight.category = category;
                // flight.from = from;
                // flight.to = to;
                // flight.path = path;

                // that.flights.push(flight);

                //gets the distance between the points. Maxium = 2*radius
                // var speed = Application.Helper.map(dist, 0, that.globeRadius * 2, 0, 2.9);
                // that.createAirplaneMesh(speed, that.paths[that.paths.length-1].getPoint(0), category);


            }, time);

            that.timer.push(timeoutref);
        });

        //this.moObjects.push(this.globe);

    },
    airportCreated: function(airport) {

        if (airport.latitude == null || airport.longitude == null) {
            return;
        }

        var arr = $.grep(this.airportPoints, function(points) {
            return (airport.latitude == points.latitude && airport.longitude == points.longitude);
        });
        if (arr.length > 0) {
            // console.log("exists");
            return true;
        } else {
            // console.log("create new airport");
            var newAirport = {
                latitude: airport.latitude,
                longitude: airport.longitude
            }

            this.airportPoints.push(newAirport);
            return false;
        }

    },

    createPath: function(vT, vF, dist, category) {

        // get the control points' vectors
        var cvT = vT.clone();
        var cvF = vF.clone();

        var xC = (0.5 * (vF.x + vT.x));
        var yC = (0.5 * (vF.y + vT.y));
        var zC = (0.5 * (vF.z + vT.z));

        var mid = new THREE.Vector3(xC, yC, zC);

        var smoothDist = Application.Helper.map(dist, 0, 10, 0, 15 / dist);

        mid.setLength(this.globeRadius * smoothDist);

        cvT.add(mid);
        cvF.add(mid);

        cvT.setLength(this.globeRadius * smoothDist);
        cvF.setLength(this.globeRadius * smoothDist);

        //create the bezier curve
        var pathGeometry = new THREE.Geometry();
        var curve = new THREE.CubicBezierCurve3(vF, cvF, cvT, vT);

        pathGeometry.vertices = curve.getPoints(35);

        var material;
        if (category) {
            material = new THREE.LineBasicMaterial({
                color: category.color,
                transparent: true,
            });
        } else {
            // material = this.pathMaterial;
            material = new THREE.LineBasicMaterial({
                color: 0xadedff,
                transparent: true
            });
        }

        var curveObject = new THREE.Line(pathGeometry, material);

        this.paths.push(curve);
        this.scene.add(curveObject);
        this.moObjects.push(curveObject);

        return curveObject;
    },

    createAirplaneMesh: function(speed, point, category) {

        //TODO avoid creating same airport that already exists.

        //airplane 3D object
        var material;
        if (category != null) {
            material = new THREE.MeshBasicMaterial({
                color: category.color
            });
        } else {
            material = this.airplaneMaterial;
        }

        airplaneInstance = new THREE.Mesh(this.airplaneGeometry, material);

        // airplane object for controlling the scene actors
        // it's got the 3D object, it's speed and current location
        var airplane = [airplaneInstance, (3 - speed) / 500, 0];

        //gets the path first position
        airplaneInstance.position.copy(point);

        this.createdAirplaness.push(airplane);
        this.scene.add(airplaneInstance);

    },

    createAirportMesh: function(airport, category) {

        var material;
        if (category != null) {
            material = new THREE.MeshBasicMaterial({
                color: category.color,
                transparent: true,
                opacity: 0.6
            });
        } else {
            material = this.airportMaterial.clone();
        }

        // this is for object airports
        var airportInstance = new THREE.Mesh(this.airportGeometry, material);
        airportInstance.rotation.y = airport.longitude * Math.PI / 180;

        var xRotationSign = airport.longitude + 90 > 90 ? -1 : 1;
        airportInstance.rotation.x = xRotationSign * (90 - airport.latitude) * Math.PI / 180;
        airportInstance.position.copy(Application.Helper.geoToxyz(airport.longitude, airport.latitude, 50.5));

        airportInstance.userData = airport;

        airportInstance.userData.country = this.determineCountry(airportInstance);

        this.airportMeshes.push(airportInstance);

        //airport.mesh = airportInstance;

        //this.createdAirports.push(airport);
        this.scene.add(airportInstance);

        return airportInstance;

    },
    getAllResults: function() {

    Application.BaseGlobeView.prototype.getAllResults.call(this);

      var results = this.collection[0].models;
    //  this.getCategoriesWithColors(results);
       this.showResults(results);
    },
    showResults: function(results) {

        Application.BaseGlobeView.prototype.showResults.call(this, results);

        if (results.length == 0) {
            Application._vent.trigger('controlpanel/message/on', 'NO DATA RECIEVED');
            return;
        } else if (!results[0].longitude_from || !results[0].latitude_from || !results[0].longitude_to || !results[0].latitude_to) {
            Application._vent.trigger('controlpanel/message/on', 'The data is not compatible with this template.<br>Please choose different data or a template');
            return;
        }

        this.addPaths(results);
    },
    sortResultsByCategory: function() {

        var that = this;

        Application.BaseGlobeView.prototype.sortResultsByCategory.call(this);

        this.hideAllResults();

        if (!this.activeCategories.length) this.showAllResults();

        $.each(this.activeCategories, function(i, category) {

            $.each(that.moObjects, function(k, path) {

                if (path.userData.category == category) {

                    path.visible = true;

                }

            });

        });

    },
    hideAllResults: function() {

        var that = this;

        $.each(this.moObjects, function(i, path) {

            if (path != that.globe) {

                path.visible = false;
            }

        });
    },
    showAllResults: function() {

        Application.BaseGlobeView.prototype.showAllResults.call(this);

        var that = this;

        $.each(this.moObjects, function(i, path) {

            if (path != that.globe) {

                path.visible = true;
            }

        });
    },

});

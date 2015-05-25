var Application = Application || {};

Application.GeometryGlobeDecorator = (function() {

    function GeometryGlobeDecorator() {

        // TODO: privatize
        this.intersected = null;
        this.countries = [];
        this.results;

        this.colors = [

            '0xFF0000',
            '0xFF1919',
            '0xFF3333',
            '0xFF4D4D',
            '0xFF6666',
            '0xFF8080',
            '0xFF9999',
            '0xFFB2B2',
            '0xFFCCCC',
            '0xFFE6E6'
        ];
        this.added = []; // list of countries participating and their old colors
        Application._vent.on('data/ready', privateMethods.getResults.bind(this));
    };
    Application.Helper.inherit(GeometryGlobeDecorator, Application.BaseGlobeDecorator);

    // properties
    GeometryGlobeDecorator.prototype.decorateGlobe = function(globeView) {

        privateMethods.loadGeometry.call(this, globeView);
    };

    // functionality
    GeometryGlobeDecorator.prototype.destroy = function(globeView) {

        for (var i = 0; i < this.countries.length; ++i) {

            if (globeView.globe !== this.countries[i]) {

                globeView.globe.remove(this.countries[i]);

                this.countries[i].material.dispose();
                this.countries[i].geometry.dispose();
            }
        }
        this.countries = null;

        this.colors = null;
        this.added = null;

        Application.BaseGlobeDecorator.prototype.destroy.call(this, globeView);
    };

    GeometryGlobeDecorator.prototype.clickOnIntersect = function(globeView, intersect) {

        var mesh = intersect.object;
        privateMethods.highlightCountry.call(this, mesh);
    };

    var privateMethods = Object.create(GeometryGlobeDecorator.prototype);
    // visualization specific functionality
    privateMethods.loadGeometry = function(globeView) {

        var that = this;
        $.ajax({
            type: 'GET',
            url: 'Models/geodata.json',
            dataType: 'json',
            cache: false,
            error: function() {

                console.log('An error occurred while processing a countries file.');
            },
            success: function(data) {

                privateMethods.addGeometry.call(that, globeView, data);
            }
        });
    };

    privateMethods.addGeometry = function(globeView, data) {

        var green = 1;
        for (var countryName in data) {

            green = (2 * green) % 100;

            var countryColor = Application.Helper.rgbToHex(10, 50 + green, 0);
            var material = new THREE.MeshPhongMaterial({
                shininess: 0,
                color: countryColor
            });

            var geometry = new Map3DGeometry(data[countryName], 0);
            var mesh = new THREE.Mesh(geometry, material);

            // TODO: review
            var scale = globeView.globeRadius + 0.5;

            mesh.scale.set(scale, scale, scale);
            mesh.geometry.computeBoundingSphere();

            mesh.userData.name = countryName;
            mesh.userData.code = data[countryName].code;

            // TODO: review
            globeView.globe.add(mesh);
            globeView.rayCatchers.push(mesh);

            this.countries.push(mesh);
        }

        privateMethods.showCountriesFromResults.call(this);
    };

    // country selection functionality
    privateMethods.findCountryMeshByName = function(name) {

        var countries = this.countries;
        for (var i = 0; i < countries.length; i++) {

            if (countries[i].userData.name.toLowerCase() == name.toLowerCase()) {

                return countries[i];
            }
        }
    };

    privateMethods.findCountryMeshByCode = function(code) {

        var countries = this.countries;
        for (var i = 0; i < countries.length; i++) {

            if (countries[i].userData.code.toLowerCase() == code.toLowerCase()) {

                return countries[i];
            }
        }
    };

    privateMethods.highlightCountry = function(object) {

        var intersected = this.intersected;
        if (intersected != object) {

            // for countries shapes
            if (intersected) {

                intersected.material.color.setHex(intersected.currentColor);
            }

            this.intersected = object;
            intersected = this.intersected;

            intersected.currentColor = intersected.material.color.getHex();
            intersected.material.color.setHex(0x0000FF);
        }
    };

    // TODO: to Dmitry Yastertsky
    privateMethods.showCountriesFromResults = function(countryCodes) {

        if (this.results.length == 0) return;

        var that = this;

        this.results.forEach(function(item, index) {

            var countrymesh = privateMethods.findCountryMeshByCode.call(that, item.countrycode);

            if (!countrymesh)
                return;

            console.log(countrymesh.userData.name);

            var obj = {};
            obj.mesh = countrymesh;
            obj.color = countrymesh.material.color.getHex();

             that.added.push(obj);

            if (typeof that.colors[index] !== 'undefined' ) {
            countrymesh.material.color.setHex(that.colors[index]);
        }
        
        });
    };

    privateMethods.getResults = function(array) {

        this.results = array;

    };

    return GeometryGlobeDecorator;
})();
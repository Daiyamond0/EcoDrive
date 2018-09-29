/**
 * @imports
 */
import GeoLib from 'geolib';

/**
 * @class
 */
export default class Simulator {

    /**
     * constructor
     * @param apiKey
     * @param options
     */
    constructor(instance)
    {
        this.instance = instance;
        this.speed = 30;
        this.turnSpeed = 700;
    }
    decode(t, e) {
		for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
			a = null, h = 0, i = 0;
			do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
			n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
			do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
			o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]);
		}

		return d = d.map(function(t) {
			return {
				latitude: t[0],
				longitude: t[1],
			};
		});
	}
    /**
     * start
     * @param route
     */
    start(route) {
        this.pointIndex = 0;
        const steps = route;
    
        let points = [];
        let result = [];

        steps.map(step => this.decode(step.polyline.points).map(coordinate => points.push(Object.assign({}, coordinate))));
        // console.log(points)

        points.forEach((point, index) => {

            const nextPoint = points[index + 1];

            if(nextPoint && !nextPoint.final == true) {

                // calculate distance between each point
                const distance = Math.round(GeoLib.getDistance(point, nextPoint));
                const bearing =  GeoLib.getBearing(point, nextPoint);

                if(bearing !== 0) {

                    if (distance > 1) {

                        for (var x = 1; x < distance; x++) {

                            result.push(Object.assign({}, {bearing}, GeoLib.computeDestinationPoint(point, x, bearing)));
                        }

                    } else {
                        result.push(Object.assign({}, {bearing}, point));
                    }
                }
            }
        });

        this.pointIndex = 0;
        this.points = result;
        this.lastBearing = false;

        this.drive.bind(this);

    }

    drive()
    {
        const point = this.points[this.pointIndex];

        let speed = this.speed;

        if(point && point.bearing) {

            let allowPositionUpdate = true;


            if(this.lastBearing != point.bearing) {

                // check if it's just a small bump
                if(point.bearing > this.lastBearing - 10 && point.bearing  < this.lastBearing + 10) {

                    this.instance.updateBearing(point.bearing, this.turnSpeed);

                } else {
                    allowPositionUpdate = false;
                    speed = this.turnSpeed;
                    this.instance.updateBearing(point.bearing, this.turnSpeed);
                }

                this.lastBearing = point.bearing;
            }

            if(allowPositionUpdate) {

                this.instance.setPosition({
                    ...point,
                    heading: point.bearing,
                });

                this.pointIndex++;
            }

            setTimeout(() => this.drive(), speed);
        }
    }
}
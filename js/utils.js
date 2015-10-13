var MODULE = (function(hex) {
    hex.toCubeCoord = function(q, r) {
        /**  Function to convert odd-q offset coordinates to cube coordinates. Reference: http://www.redblobgames.com/grids/hexagons/
         * @param {Number} q - the column of the hex
         * @param {Number} r - the row of the hex
         */
        this.r = r;
        this.q = q;
        var x = this.q
        var z = this.r - (this.q - (this.q & 1)) / 2
        var y = -x - z
        var cube = {
            x: x,
            y: y,
            z: z
        };

        return cube;
    }
    hex.toOffsetCoord = function(x, y, z) {
        /**  Function to convert cube coordinates to odd-q offset coordinates. Reference: http://www.redblobgames.com/grids/hexagons/
         * @param {Number} x - the x cube coord of the hex
         * @param {Number} y - the y cube coord of the hex
         * @param {Number} z - the z cube coord of the hex
         */
        this.x = x;
        this.y = y;
        this.z = z;
        var q = this.x;
        var r = this.z + (this.x - (this.x & 1)) / 2
        var offset = {
            q: q,
            r: r
        };

        return offset;
    }
    hex.getNeighbors = function(x, y, z) {
        /**  Function to find all neighboring hexes via cube coordinates. Reference: http://www.redblobgames.com/grids/hexagons/
         * @param {Number} x - the x cube coord of the hex
         * @param {Number} y - the y cube coord of the hex
         * @param {Number} z - the z cube coord of the hex
         */
        this.x = x;
        this.y = y;
        this.z = z;
        var neighbors = [{
            x: this.x + 1,
            y: this.y - 1,
            z: z
        }, {
            x: this.x + 1,
            y: y,
            z: this.z - 1
        }, {
            x: x,
            y: this.y + 1,
            z: this.z - 1
        }, {
            x: this.x - 1,
            y: this.y + 1,
            z: z
        }, {
            x: this.x - 1,
            y: y,
            z: this.z + 1
        }, {
            x: x,
            y: this.y - 1,
            z: this.z + 1
        }];
        var chk = toOffsetCoord(x, y, z);
        if (typeof(map.data[chk.r][chk.q].connect) != "undefined" || map.data[chk.r][chk.q].connect != "") {
            for (i = 0; i < map.data[chk.r][chk.q].connect.length; i++) {
                var tmp = toCubeCoord(map.data[chk.r][chk.q].connect[i].col, map.data[chk.r][chk.q].connect[i].row);
                neighbors.push(tmp);
            }
        }

        return neighbors;
    }

    hex.getDirection = function(x1, x2, y1, y2, z1, z2) {
        var delX = 0;
        var delY = 0;
        var delZ = 0;
        delX = x1 - x2;
        delY = y1 - y2;
        delZ = z1 - z2;
        var direction = "";
        if (delX == 0 && delY == 1 && delZ == -1) {
            return "n";
        }
        if (delX == 1 && delY == 0 && delZ == -1) {
            return "ne";
        }
        if (delX == 1 && delY == -1 && delZ == 0) {
            return "se";
        }
        if (delX == 0 && delY == -1 && delZ == 1) {
            return "s";
        }
        if (delX == -1 && delY == 0 && delZ == 1) {
            return "sw";
        }
        if (delX == -1 && delY == 1 && delZ == 0) {
            return "nw";
        }
    }

    return hex;

}(MODULE));
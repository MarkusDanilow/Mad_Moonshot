class MadColor {

    constructor(r, g, b, a = 1) {
        this.a = a;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toString() {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    }

}

MadColor.RED = new MadColor(255, 0, 0);
MadColor.GREEN = new MadColor(0, 255, 0);

MadColor.fromString = function(colorString) {
    if (colorString && colorString.indexOf("rgba") > -1) {
        colorString = colorString.replace('rgba(', '').replace(')', '').replace(/\s/g, '');
        let colors = colorString.split(',');
        for (let i = 0; i < colors.length; i++)
            colors[i] = parseInt(colors[i]);
        return new MadColor(colors[0], colors[1], colors[2], colors[3]);
    }
    return MadColor.RED;
}
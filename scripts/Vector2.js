export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distanceBetween(vector) {
        return Math.sqrt((vector.x - this.x) ** 2 + (vector.y - this.y) ** 2);
    }
    squaredDistanceBetween(vector) {
        return (vector.x - this.x) ** 2 + (vector.y - this.y) ** 2;
    }
    set(direction, magnitude) {
        // Direction can be any magnitude but it will point in that direction
        let normalized = Vector2.normalize(direction);
        this.x = magnitude * normalized.x;
        this.y = magnitude * normalized.y;
    }
    static normalize(vector) {
        let divideAmount = Math.sqrt(vector.x ** 2 + vector.y ** 2)
        return new Vector2(vector.x/divideAmount, vector.y/divideAmount)
    }
    getMagnitude(){
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    copy(){
        return new Vector2(this.x, this.y)
    }

    static get ZERO() { // get ensures independentness?
        return new Vector2(0, 0);
    }
}
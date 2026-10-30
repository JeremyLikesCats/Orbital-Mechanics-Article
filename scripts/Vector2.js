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
}
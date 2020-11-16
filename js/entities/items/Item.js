class Item extends Entity {

    constructor(type) {
        super();
        this.type = type;
        this.damage = 0;
    }

    isDangerous() {
        return this.damage > 0;
    }

}
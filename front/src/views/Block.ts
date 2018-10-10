import Items from "@/views/Items";

class Block {

    constructor() {
        this.items = [
            new Items(),
            new Items()
        ];
    }

    public title: any;
    public items: Items[];

}

export default Block;

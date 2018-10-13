import Items from './Item';

class Block {

    public title: any;
    public items: Items[];

    constructor() {
        this.items = [
            new Items(),
        ];
    }

}

export default Block;

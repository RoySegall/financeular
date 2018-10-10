import Items from '@/views/Items';

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

import moment from "moment";

export default class Order {
    constructor(id, items, totalAmount, date) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get stringDate() {
        return moment(this.date).format("YYYY-MM-DD, hh:mm")
    }
}
import { SortDescriptorBase } from "./sortDescriptorBase";
import { FilterDescriptorBase } from ".";

export class DynamicQuery {
    public filters: FilterDescriptorBase[];
    public sorts: SortDescriptorBase[];
    constructor() {
        this.filters = [];
        this.sorts = [];
    }
}

export interface SortProps{
    fromId:number;
    referenceId:number;
    type:"before"|"after";
    fromKanbanId?:number;
    toKanbanId?:number;
}
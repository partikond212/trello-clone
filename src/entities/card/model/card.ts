
export type Card = {
    id:string,
    title:string,
    description?:string,
    columnId:string,
    order:number,
    notesCount?:number,
    completedTaskCount?:number,
}
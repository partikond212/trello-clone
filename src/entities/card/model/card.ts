export type cardTagButton = {
    tagName:string,
    tagColor:string
}
export type Task = {
    isDone:boolean,
    taskTitle:string,
}
export type Card = {
    id:string,
    title:string,
    description?:string,
    columnId:string,
    order:number,
    completedTaskCount?:number,
    totalTaskCount?:number,
    tags?:string[],
    tasks?:Task[],
    priority?:"high"| "mid" | "low",
    dueDate?:string,
}
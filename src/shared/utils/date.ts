export const toInputDate:(date?:string) => string = (date?:string) => {
    return date? date.slice(0,10) : '' 
}
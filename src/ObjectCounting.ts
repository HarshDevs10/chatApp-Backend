import type { User } from "./UserInterface"

export const  ObjectCounting = (arr: User[], pro: string) => {
    let obj = []
    for (let i = 0; i < arr.length; i++){
        if(arr[i]?.room === pro){
            obj.push(arr[i])
        }
    }
    return obj.length
}
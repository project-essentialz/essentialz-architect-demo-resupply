export type ResolutionTarget = {
    source: string;
    target: string;
    strategy?: (source: string, target: string) => any
}
export const Resolver = <T>() => {
    const resolve = (entity: T, field: string, id:string) => {

    }
}
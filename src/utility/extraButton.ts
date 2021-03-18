export type ExtraButton = {
    title: string,
    onClick: () => void
}
export const extraButton = (title: string, onClick: () => void): ExtraButton => {
    return {title, onClick}
}
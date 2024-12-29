export interface IResponseType<T> {
    code: number,
    msg: string,
    data: T
}
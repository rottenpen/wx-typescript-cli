interface Options {
    prefix?: string;
    suffix?: string;
}
interface ReturnOptions {
    url?: string;
    options?: Options;
}
declare const addfix: (url: any, options?: Options) => ReturnOptions;
export default addfix;

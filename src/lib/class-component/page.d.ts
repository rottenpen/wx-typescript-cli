export declare class View<S> {
    data: S;
    onLoad?(options: any): void;
    onReady?(): void;
    onShow?(): void;
    onHide?(): void;
    onUnload?(): void;
    onPullDownRefresh?(): void;
    onReachBottom?(): void;
    onShareAppMessage?(): void;
    onPageScroll?(): void;
    onTabItemTap?(item: any): void;
}
export { default as Component } from "./component";

export class View<S> {
  public data: S;
  public onLoad?(options: any): void;
  public onReady?(): void;
  public onShow?(): void;
  public onHide?(): void;
  public onUnload?(): void;
  public onPullDownRefresh?(): void;
  public onReachBottom?(): void;
  public onShareAppMessage?(): void;
  public onPageScroll?(): void;
  public onTabItemTap?(item: any): void;
}

export { default as Component } from "./component";
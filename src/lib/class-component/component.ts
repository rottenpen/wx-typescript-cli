
import { View } from "./page";
export type ViewClass = typeof View;

export const $internalHooks = [
  "data",
  "onLoad",
  "onReady",
  "onShow",
  "onHide",
  "onUnload",
  "onPullDownRefresh",
  "onReachBottom",
  "onShareAppMessage",
  "onPageScroll",
  "onTabItemTap",
];

function componentFactory<S>(
  Cm: ViewClass,
  options: any
): ViewClass {
  
  const proto = Cm.prototype;

  Object.getOwnPropertyNames(proto).forEach((key): void => {
    if (key === "constructor") {
      return;
    }

    options[key] = proto[key];
  });

  const data = new Cm().data;
  if (data) {

    const plainData = options.data || {};
    Object.keys(data).forEach((key): void => {
      if (data[key] !== undefined) {
        plainData[key] = data[key];
      }
    });
    options.data = plainData as S;
  }

  !options.onShareAppMessage && (options.onShareAppMessage = function (): any {
    return {
      title: '嘉盛真实账户申请',
      imageUrl: '/images/sharelogo.jpg',
      path: 'pages/main/home/index'
    }
  })
  Page(options);
  return Cm;
}

function Component<S>(options: any = {}): any {
  // console.log(options)
  if (typeof options === "function") {
    return componentFactory(options, undefined);
  }
  return (Cm: ViewClass): any => {
    return componentFactory<S>(Cm, options);
  };
}

export default Component;
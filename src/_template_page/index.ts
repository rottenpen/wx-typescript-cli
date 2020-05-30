import { TmgPage } from "@/typings/page";
interface IndexPageData {
  list? : any[]
}
/**
* 定义 page 类
*/
const com = global['__Component']
@com()
class TemplatePage extends TmgPage{
  public data: IndexPageData = {
    list: ['a']
  }
  /**
   * onLoad
   */
  public onLoad(options) {
  }
  /**
   * showToast
  */
  public showToast(e: WXEvent): void {
  }
  public onTapSearchBtn(e: WXEvent): void {
  }
  /**
   * onCancel
   */
  public onCancel(e: WXEvent): void {
  }
}

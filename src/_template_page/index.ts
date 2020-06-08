import { TmgPage } from "@/typings/page";
import ajax from '@/api/wxfetch'
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
  public onLoad() {
    let data = {
      name: 'Tom'
    }
    this.getUser({data}).then(res => {
      console.log(res)
    })
  }
  /**
   * getUser
   */
  public getUser(options) {
    let CancelToken = ajax.CancelToken
    let source = CancelToken.source()
    options.cancelToken = source.token
    let p = ajax.post('/users/', options)
    // source.cancel('???')
    return p
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

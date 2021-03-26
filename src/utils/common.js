
import { Message } from 'element-ui'
let common = {
  // 下载文件js处理后端返回的文件流
  downFile(res){
    if(res.type=='application/json'){
      let reader = new FileReader();
      reader.onload =e =>{
        let err = JSON.parse(e.target.result);
        Message({
          message:err.msg,
          type: 'error',
          // duration: 5 * 1000
        })
      }
      reader.readAsText(res)
    }else{
      let content= res.data;
      const filename = res.filename.split(';')[1].split('=')[1];
      let decodeFilename = decodeURI(filename)
      const blob = new Blob([content])
      if (window.navigator.msSaveOrOpenBlob) {
        // 兼容IE10
        navigator.msSaveBlob(blob, decodeFilename)
      } else {
        //  chrome/firefox
        const aTag = document.createElement('a')
        aTag.download = JSON.parse(decodeFilename);
        aTag.href = URL.createObjectURL(blob)
        aTag.click()
        URL.revokeObjectURL(aTag.href)
      }
    }
  },


} 

export default common
/*
* @method exportCsv
* @param { params: Object, required }
*   [ fileName: String ] 文件名称
*   [ titleForKey: Array[String] ] 表头所对应的字段
*   [ title: Array[String] ] 表头所对应的字段名称
*   [ data: Array[Object] ] 表格数据
* @return null
*/
export function exportCsv (params) {
  let titleForKey = params.titleForKey,
    data = params.data,
    str = [];

  str.push(params.title.join(',') + '\n');

  for (let i = 0; i < data.length; i++) {
    str.push(titleForKey.map(item => data[i][item]).join(',') + '\n');
  }

  let url = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str.join('')),
    downloadLink = document.createElement('a');

  downloadLink.href = url;
  downloadLink.download = params.fileName + '.csv';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
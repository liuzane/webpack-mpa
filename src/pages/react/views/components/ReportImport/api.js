// http 模块
import { server } from '@/http';


// 上传导入数据
export const flowEnergizeImportMoney = (data) => {
  return server({
    method: 'post',
    url: '/brokerService/report/flow_energize_import_money',
    data,
    message: false
  });
};

const LabelService = require('../service/label.service')

/**
 * 
 * 传入labels时，不确定label是否已经存在了
 * 先遍历查询是否存在，不存在的则新增到label表
 * 然后把新增的数据传递到下一个中间件
 */
const verifyLabelExists = async (ctx, next) => {
  // 1.获取标签
  const { labels } = ctx.request.body
  // 2.判断label是否已经存在label表中
  const newLabels = []
  for (const name of labels) {
    const result = await LabelService.queryLabelByName(name)
    const labelObj = { name }
    if (result) {
      // 已存在,获取label的id
      labelObj.id = result.id
    } else {
      console.log('buc');
      // 不存在，插入label，获取id
      const insertResult = await LabelService.addOne({ name })
      console.log(insertResult);
      labelObj.id = insertResult.insertId
    }
    newLabels.push(labelObj)
  }
  // 3.所有的labels都变成了[{name:'唱歌',id:1}]
  // 将新增的label和动态关联起来
  ctx.labels = newLabels
  await next()
}


module.exports = {
  verifyLabelExists
}
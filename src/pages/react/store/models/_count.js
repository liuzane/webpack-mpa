
const _count = {
  state: {
    num: 1,
    type: 2
  },
  reducers: {
    increment(state, num) { // 从第二个变量开始为调用increment时传递进来的参数，后面依次类推，例如：dispatch.count.increment(10, 20)时， num1 = 10 , num2 = 20.
      return {
　　　　　...state,
        num,
      };
    },
  },
  effects: {
    async incrementAsync(num1, rootState, num2) { // 第二个变量为当前model的state的值，num1为调用incrementAsync时传递进来的第一个参数，num2为调用时传递的第二个参数，后面依次类推。例如：dispatch.count.incrementAsync(10, 20)时，num1 = 10, num2 = 20
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.increment(num1);
    }
  }
};

export default _count;
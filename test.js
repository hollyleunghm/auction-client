// 输入参数
const inputArr = [13, 9, 3, 8, 5, 25, 31, 11, 21];

// 方法 先排序 再依次查找

let sortArr = inputArr.sort((a, b) => a - b);
let maxArr = [];
function findFibonacci(sortArr) {
    for (let i = 0; i < sortArr.length; i++) {
        // 从0 开始查找所有可能性
        let startNum = sortArr[i];
        let res = [];
        res.push(startNum);
        for (let j = 1; j < sortArr.length - 1; j++) {
            if (startNum + sortArr[j] === sortArr[j + 1]) {
                // 此时符合条件
                startNum = sortArr[j];
                res.push(startNum);
                // 将后面的数加入数组
                res.push(sortArr[j + 1]);
            }
        }
        // 处理length < 2
        if (res.length > 1) {
            // 对比length长度
            maxArr = res.length > maxArr.length ? res : maxArr;
        }
    }
}
findFibonacci(sortArr);

console.log(maxArr);



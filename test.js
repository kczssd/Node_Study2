//利用flat展开
var arr = [1, 2, '3', [4, ['5', [6]]]];
console.log(arr.flat(Infinity));
//递归查找
function flatarr(arr) {
    let result = [];
    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatarr(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
console.log(flatarr(arr));
//reduce方法
function flatarr2(arr) {
    return arr.reduce((result, item) => {
        return result.concat(Array.isArray(item) ? flatarr2(item) : item);
    }, []);
}
console.log(flatarr2(arr));
//扩展运算符
function flatarr3(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
        console.log(arr);
    }
    return arr;
}
console.log(flatarr3(arr));
//柯里化函数
function curry(fn) {
    let args = [].slice.call(arguments, 1);
    console.log(args);
    let len = fn.length;
    console.log(len);
    let nowlen = args.length;
    function __curry() {
        args.push(...arguments);
        console.log(args);
        nowlen += arguments.length;
        if (nowlen === len) {
            return fn.apply(this, args);
        } else {
            return __curry;
        }
    }
    if (args.length === len) {
        return fn.apply(this, args);
    }
    return __curry;
}
function add(x, y, z) {
    return x + y + z;
}
console.log(curry(add)(1)(2)(3));
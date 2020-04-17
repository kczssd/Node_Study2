function checkedType(target) {
    //准确判断数据类型，防止一切皆对象等导致类型判断错误
    return Object.prototype.toString.call(target).slice(8, -1)
}

// //实现深度克隆---对象/数组
// function clone(target) {

//     let result, targetType = checkedType(target)

//     if (targetType === 'Object') {
//         result = {}
//     } else if (targetType === 'Array') {
//         result = []
//     } else { //是基本数据类型，则直接返回，不用result深度克隆了
//         return target
//     }

//     //遍历目标数据
//     for (let i in target) {
//         //获取遍历数据结构的每一项值。
//         let value = target[i]
//         //判断目标结构里的每一值是否存在对象/数组
//         if (checkedType(value) === 'Object' || checkedType(value) === 'Array') {
//             //对象/数组里嵌套了对象/数组
//             //将value深拷贝给result的对应项
//             result[i] = clone(value)
//         } else { //获取到value值是基本数据类型或者是函数
//             result[i] = value;
//         }
//     }
//     return result
// }
function cloneloop(x) {
    const uniquelist = [];
    const root = {};
    const stick = [
        {
            parent: root,
            key: undefined,
            data: x
        }
    ]

    while (stick.length) {

        const node = stick.pop();
        // console.log(node);
        const parent = node.parent;
        const key = node.key;
        const data = node.data;


        let result = parent;
        if (typeof key !== 'undefined') {
            result = parent[key] = {};
        }
        let uniquedata = find(uniquelist, data);
        if (uniquedata) {
            parent[key] = uniquedata.target;
            continue;
        }
        uniquelist.push({
            source: data,
            target: result,
        })
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    stick.push({
                        parent: result,
                        key: k,
                        data: data[k]
                    })
                } else {
                    result[k] = data[k]
                }
            }
        }
    }
    return root;
}
function find(arr, item) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].source === item) {
            return arr[i];
        }
    }
    return null
}
let a1 = {
    a: 1,
    b: {
        c: 2,
        d: {
            e: 3
        }
    },
    f: 5,
}
a1.a1 = a1;
console.log(a1);
let a2 = cloneloop(a1);
console.log(a2);
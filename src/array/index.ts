/**
 * This file records answers for leetcode questions which tag are array.
 * Coded in TypeScript.
 */

/**
 * Question 0001 to find the index of numbers which sum is equal to target.
 * In the first solution, we will use nested loop to find the suitable number.
 * @param {number[]} nums An array given
 * @param {number} target A target number
 * @return {number[]} An array contains index of numbers which sum equals given target
 */
// time 96ms
// size 43.6mb
const twoSum1 = (nums: number[], target: number): number[] => {
    // first do some validate check
    if (nums.length === 0) return []
    // then to iterate through the numbers
    for (let i = 0; i < nums.length; i++) {
        // use inner loop to calculate the sum
        // since numbers cannot repeat use, j starts with (i+1)
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === target - nums[j]) {
                return [i, j]
            }
        }
    }
    return []
}

/**
 * Still question 0001
 * Since some elements in numbers are larger than given target
 * It is unnecessary to calculate sum of those elements
 * 需要注意到 测试集中数字可能有负数 例如 nums = [-3,4,3,90] target = 0
 * 所以是不能这样优化的
 * 同时注意到 如果先按照升序排序 效率会有提升 
 * 但是排序的话 势必会打乱原有的索引位置
 * 故而考虑到 hashtable
 * @param {number[]} nums An array given
 * @param {number} target A target number
 * @return {number[]} An array contains index of numbers which sum equals given target
 */
const twoSum2 = (nums: number[], target: number): number[] => {
    // first do some validate check
    if (nums.length === 0) return [];
    // sort array first
    nums.sort((a, b) => a - b)
    // then to iterate through the numbers
    for (let i = 0; i < nums.length; i++) {
        // use inner loop to calculate the sum
        // since numbers cannot repeat use, j starts with (i+1)
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === target - nums[j]) {
                return [i, j]
            }
        }
    }
    return []
}

/**
 * 考虑 hashtable 的解法
 * 由于 hashtable 可以做到 O(1) 的访问速度
 * 而目标是寻找两数之和
 * 那么在一个数字确定的情况下
 * 采用 target - num 来搜索 hashtable
 * @param {number[]} nums An array given
 * @param {number} target A target number
 * @return {number[]} An array contains index of numbers which sum equals given target
 */
// time 72ms
// size 45.9mb
const twoSum3 = (nums: number[], target: number): number[] => {
    // first do some validate check
    if (nums.length === 0) return []
    // build hashtable for nums
    // 建立 hashtable 的时候需要考虑如何处理数组中重复元素的问题
    const map = new Map<number, number[]>()
    nums.forEach((n, index) => {
        if (map.get(n) === undefined) {
            map.set(n, [index])
        } else {
            const tmp = map.get(n) || []
            tmp.push(index)
            map.set(n, tmp)
        }
    })
    // after build hashtable for nums
    // then iterate to search
    // forEach 无返回值
    for (let i = 0; i < nums.length; i++) {
        const n = target - nums[i]
        if (map.get(n) !== undefined) {
            if ((map.get(n) || []).length === 1 && i !== (map.get(n) || [])[0]) return [i, (map.get(n) || [])[0]]
            if ((map.get(n) || []).length > 1) {
                for (let j = 0; j < (map.get(n) || []).length; j++) {
                    if ((map.get(n) || [])[j] !== i) return [i, j]
                }
            }
        }
    }
    return []
}

/**
 * 像上面那样的话
 * 第一遍建立哈希表
 * 第二遍去遍历数组，再去哈希表里找匹配
 * 这样的话，有两个问题
 * 一个是建立哈希表的时候，元素不唯一怎么办，存成数组？
 * 第二个是极限情况下，如果元素都不唯一，那么搞成数组的话
 * 遍历起来是 O^2 的复杂度
 * 所以不能一次性建立哈希表
 * 需要边搜索边建表
 */
// time 60ms
// size 44.1mb
const twoSum4 = (nums: number[], target: number): number[] => {
    // 先做合法性校验
    if (nums.length === 0) return []
    // 遍历数组 建立哈希表 同时搜索合适的值 搜不到就存在表里
    const map: Map<number, number> = new Map();
    for (let i = 0; i < nums.length; i++) {
        const tar = target - nums[i]
        if (map.get(tar) !== undefined) return [i, map.get(tar) || 0]
        // 表里存的应该是 数组元素的值 --> 数组元素的索引
        map.set(nums[i], i)
    }
    return []
}

/***************************************************************************************************** */

/**
 * Question 26 
 * Given 一个升序排列的数组
 * Require 删除数组中的重复项目
 * Restrict 原地删除 空间复杂度 O(1)
 * Return 删除后的长度
 */
/**
 * 思路
 * 遍历这个升序数组
 * 如果有重复的元素
 * 那么这两个元素必然相邻
 * 使用双指针
 * 发现重复的话 把重复的值变成最大值
 * 然后再排序
 * 时间换空间了属于是
 */
const removeDuplicates = (nums: number[]): number => {
    // 惯例先检查长度
    if (nums.length === 0) return 0;
    if (nums.length === 1) return 1;
    if (nums.length === 2) return nums[0] === nums[1] ? 1 : 2;
    // 设置两个指针
    let begin = 0, end = 1;
    let len = nums.length;
    // 开始遍历
    while (end < nums.length) {
        // 重复的情况
        if (nums[begin] === nums[end]) {
            nums[end] = Number.MAX_SAFE_INTEGER;
            len--;
            // 这里需要重新排一下顺序
            nums.sort((a, b) => a - b)
        }
        if (nums[begin] < nums[end]) {
            begin++; end++
        }
    }
    return len;
}

/**
 * 思路
 * 遍历数组
 * 双指针
 * 后一个指针值与前一个相同时
 * 后一个置为最大
 * 当前值比后值小时，前指针 = 后指针 && 后指针++
 * @param nums 
 * @returns 
 */
// time 76ms faster than 62.33%
// size 45.9mb smaller than 5.06% 
// MAX_SAFE_INTEGER 改成 10001 size 44.7mb smaller than 16%
const removeDuplicates1 = (nums: number[]): number => {
    // 惯例先检查长度
    if (nums.length === 0) return 0;
    if (nums.length === 1) return 1;
    if (nums.length === 2) return nums[0] === nums[1] ? 1 : 2;
    // 设置两个指针
    let begin = 0, end = 1;
    // 用来置换
    let len = nums.length;
    // 开始遍历
    while (end < nums.length) {
        if (nums[begin] === nums[end]) {
            nums[end] = 10001;
            end++;
            len--;
        }
        if (nums[begin] < nums[end]) {
            begin = end; end++;
        }
    }
    // 最后排序
    nums.sort((a, b) => a - b)
    return len;
}

const swap = (nums: number[], idx1: number, idx2: number): void => {
    try {
        nums[idx1] = nums[idx1] ^ nums[idx2];
        nums[idx2] = nums[idx1] ^ nums[idx2];
        nums[idx1] = nums[idx1] ^ nums[idx2]
    } catch (e) {
        console.error(e)
    }
}

/***************************************************************************************************** */

/**
 * 要求原地移除掉值 = val 的元素
 * 空间复杂度 O(1)
 * 思路
 * 单指针遍历数组
 * 遇到元素 = val 则将该元素的值置为 -1
 * 因为 0 <= nums[i] <= 50
 * 最后给数组排下顺序
 * 把 -1 都放在最后
 * @param nums 
 * @param val 
 * @returns 
 */
// time 84ms faster than 7%
// size 43mb smaller than 9%
const removeElement = (nums: number[], val: number): number => {
    let len = nums.length;
    let begin = 0;
    while (begin < nums.length) {
        if (nums[begin] === val) {
            nums[begin] = -1;
            len--;
        }
        begin++
    }
    nums.sort((a, b) => b - a)
    return len;
}

// 接上面解法
// 性能瓶颈可能在于最后要给数组排序
// 我们省略掉这个步骤，再看看复杂度
// time 60ms faster than 84%
// size 42mb smaller than 70%
// 确实能快一些
const removeElement1 = (nums: number[], val: number): number => {
    let len = nums.length;
    let begin = 0;
    let last = nums.length - 1;
    let swap = false
    while (begin < nums.length) {
        swap = false;
        if (nums[begin] === val) {
            // 这里要省略掉排序的话
            // 需要把这个 -1 挪到数组的最后
            nums[begin] = nums[last];
            nums[last] = -1;
            last--;
            swap = true;
            len--;
        }
        if (!swap) {
            begin++
        }
    }
    // nums.sort((a, b) => b - a)
    return len;
}

/***************************************************************************************************** */

/**
 * question 0035
 * 给一个排序过的数组
 * 和一个目标值
 * 要求查找这个值的索引
 * 时间复杂度要求 logn
 * 很明显
 * 需要使用二分搜索
 * 二分的思路是这样
 * 设立 left mid right 三个指针
 * 每次设置下这三个指针的位置
 * 每次循环将 nums[mid] 跟 target 对比
 * 如果 mid 大于 target
 * 说明 target 落在左边的区间里
 * 那么置 right = mid, mid = (left + right) / 2
 * 继续搜索
 * 直到 left >= right
 * @param nums 
 * @param target 
 * @returns 
 */
// time 60ms faster than 84%
// size 42mb smaller than 99%
const searchInsert = (nums: number[], target: number): number => {
    // 合法性校验
    if (nums.length === 0 || nums[0] >= target) return 0;
    if (nums[nums.length - 1] < target) return nums.length;
    let left = 0, right = nums.length - 1;
    while (left < right) {
        let mid = (left + right) >> 1;
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1;
        if (nums[mid] > target) right = mid
    }
    // 注意 这里推出的情况
    // 最后结果都是 left === right
    return left;
};

/***************************************************************************************************** */

/**
 * question 0066
 * 给一个由数组组成的整数加一
 * 用 js api 做比较讨巧
 * arr.join -> str -> parseInt -> +1 -> str.split -> arr
 * 上面方法有个问题
 * 没有考虑到整数溢出的情况
 * 所以需要改用 es11 bigInt
 * arr.join -> str -> BigInt -> +1n -> BigInt.toString -> str.split -> arr -> arr.map(char => parseInt(char))
 * @param digits 
 * @returns 
 */
const plusOne = (digits: number[]): number[] => {
    // 测试集发现一个潜在的问题
    // parseInt 会超出范围
    // js 中运算能保持精度的最大整数是 9007199254740991
    // 9007199254740991 === Number.MAX_SAFE_INTEGER
    // 超出会产生 unexpected result
    // js 为了解决这种情况
    // 引入了 BigInt 内建类型 版本 ES11(2020)
    return String(BigInt(digits.join("")) + 1n).toString().split("").map(char => parseInt(char))
};

// 当然 抛出语言特性
// 这道题想考的肯定是要我们自己实现
// 大整数的四则运算符
// 跟其他语言的大整数运算思路一样
// 使用 string 并重写运算符
const plusOne1 = (digits: number[]): number[] => {
    return []
};

const add4BigInt = (num1: string, num2: string): string => {
    return ""
}
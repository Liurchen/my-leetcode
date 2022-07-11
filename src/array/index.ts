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
    const map: Map<number, number> = new Map()
    for (let i = 0; i < nums.length; i++) {
        const tar = target - nums[i]
        if (map[tar] !== undefined) return [i, map[tar]]
        // 表里存的应该是 数组元素的值 --> 数组元素的索引
        map[nums[i]] = i
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
    debugger
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

const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
removeDuplicates(nums)

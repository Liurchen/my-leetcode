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
        if (map[n] === undefined) {
            map[n] = [index]
        } else {
            map[n].push(index)
        }
    })
    // after build hashtable for nums
    // then iterate to search
    // forEach 无返回值
    for (let i = 0; i < nums.length; i++) {
        const n = target - nums[i]
        if (map[n] !== undefined) {
            if (map[n].length === 1 && i !== map[n][0]) return [i, map[n][0]]
            if (map[n].length > 1) {
                for (let j = 0; j < map[n].length; j++) {
                    if (map[n][j] !== i) return [i, j]
                }
            }
        }
    }
    return []
}
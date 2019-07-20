//SaveData.js
//todoList数组的每一次增加和删减都会用到localStorage，将localStorage封装起来方便使用
export function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
export function getItem(key) {
    return JSON.parse(localStorage.getItem(key))
}
export function removeItem(key) {
    localStorage.removeItem(key)
}
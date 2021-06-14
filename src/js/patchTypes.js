const PATCH_TYPES = {
  ATTR    : 'ATTR',       // 变更元素属性
  REMOVE  : 'REMOVE',     // 移除元素
  REPLACE : 'REPLACE',    // 变更标签
  TEXT    : 'TEXT',       // 变更文本
  TO_TEXT : 'TO_TEXT',    // 元素变更成文本
  TO_NODE : 'TO_NODE',    // 文本变更成苏纳素
  ADD_NODE: 'ADD_NODE',   // 新增元素
  ADD_TEXT: 'ADD_TEXT',   // 新增文本
}

export {
  PATCH_TYPES
}

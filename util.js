const util = {
  /**
   * Get object that extends target object with default object
   */
  getExtendDefault: (targetObj = {}, defaultObj = {}) => {
    let result = {}
    return Object.assign(result, defaultObj, targetObj)
  }
}

module.exports = util
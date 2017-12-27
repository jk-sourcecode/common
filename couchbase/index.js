const cbConnection = require('./connection')
const Promise = require('bluebird')
const { isEmpty } = require('lodash')

module.exports = {
  /**
   * Insert document
   * @param {string} key
   * @param {string} value
   * @returns
   */
  Insert(key, value) {
    return new Promise((resolve, reject) => {
      cbConnection.openBucket().then((bucket) => {
        bucket.insert(key, value, (err, result) => {
          bucket.disconnect()
          if (err) return reject(err)

          return resolve(result)
        })
      })
    })
  },
  /**
   * Update document
   * @param {string} key
   * @param {string} value
   * @returns
   */
  Upsert(key, value) {
    return new Promise((resolve, reject) => {
      cbConnection.openBucket().then((bucket) => {
        bucket.upsert(key, value, (err, result) => {
          bucket.disconnect()
          if (err) return reject(err)

          return resolve(result)
        })
      })
    })
  },
  /**
   * Get document
   * @param {string} key
   * @param {string} value
   * @returns
   */
  GetDocument(key) {
    return new Promise((resolve, reject) => {
      cbConnection.openBucket().then((bucket) => {
        bucket.get(key, (err, result) => {
          bucket.disconnect()
          if (err) return reject(err)

          return resolve(result.value)
        })
      })
    })
  },
  /**
   * Execute N1qlQuery Query
   * @param {string} key
   * @param {string} value
   * @returns
   */
  ExecuteQuery(queryString) {
    return new Promise((resolve, reject) => {
      if (isEmpty(queryString)) reject(new Error('Invalid query string'))

      const query = cbConnection.N1qlQuery.fromString(queryString)
      cbConnection.openBucket().then((bucket) => {
        bucket.query(query, (err, rows) => {
          bucket.disconnect()
          if (err) return reject(err)

          return resolve(rows)
        })
      })
    })
  },
}

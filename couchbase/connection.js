const couchbase = require('couchbase')
const Promise = require('bluebird')
require('dotenv').config()

const couchbaseUrl = process.env.COUCHBASE_URL || 'couchbase://localhost:8091'
const bucketName = process.env.BUCKET_NAME || 'default'
const bucketPassword = process.env.BUCKET_PASSWORD
/**
 * Get cluster
 * @returns
 */
function getCluster() {
  return new couchbase.Cluster(couchbaseUrl)
}

module.exports = {
/**
 * Open cocuhbase bucket
 * @returns
 */
  openBucket() {
    return new Promise((resolve, reject) => {
      const cluster = getCluster()
      const bucket = cluster.openBucket(bucketName, bucketPassword, (err) => {
        if (err) { reject(err) }
      })
      return resolve(bucket)
    })
  },
  /**
 * Export N1qlQuery
 * @returns
 */
  N1qlQuery: couchbase.N1qlQuery,
}

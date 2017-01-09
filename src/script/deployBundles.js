#!/usr/bin/env node

const s3 = require('s3');
const { aws, assets } = require('../app/config/application');

const client = s3.createClient({
  s3Options: {
    accessKeyId: aws.key,
    secretAccessKey: aws.secret
        // any other options are passed to new AWS.S3()
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  }
});

const params = {
  localDir: 'dist/components',
  s3Params: {
    ACL:'public-read',
    Bucket: aws.bucket,
    CacheControl: `max-age=${60*60*24*365}`,
    Prefix: assets.prefix
        // other options supported by putObject, except Body and ContentLength.
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  }
};

const uploader = client.uploadDir(params);
uploader.on('error', function(err) {
  console.error('unable to upload:', err.stack); // eslint-disable-line no-console
});
uploader.on('progress', function() {
  console.log('progress', uploader.progressMd5Amount, // eslint-disable-line no-console
        `${parseInt((uploader.progressAmount / uploader.progressTotal) * 100, 10)}%`);
});
uploader.on('end', function() {
  console.log('done uploading'); // eslint-disable-line no-console
});

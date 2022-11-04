<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :http-request="uploadImg"
    >
      <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>
<script>
// 实例化cos服务
import COS from 'cos-js-sdk-v5'
// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDoSqzsUpujJcgT0Gm23nGSO5VeXAXeU5P',
  SecretKey: '5uTmpc8ON5WhrkMhma8PRDiwub1A2ez3'
})
export default {
  data() {
    return {
      imgUrl: ''
    }
  },
  methods: {
    uploadImg(file) {
      // 自定义图片上传
      // file就是选中的文件对象，其中里面有一个file属性
      // 那么这个属性就是将来要传递给后端的文件对象
      // 调用腾讯云提供的方法 实现文件上传
      cos.uploadFile(
        {
          Bucket: 'hr-82-1259170259', /* 储存桶名字，必须字段 */
          Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
          Key: Date.now().toString(), /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
          Body: file.file, // 上传文件对象
          SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
          onProgress: function(progressData) {
            console.log(JSON.stringify(progressData))
          }
        }, (err, data) => {
          if (err) {
            console.log('上传失败', err)
          } else {
            console.log('上传成功', this)
            this.imgUrl = 'http://' + data.Location
          }
        })
    }
  }
}
</script>
  <style scoped>
  </style>

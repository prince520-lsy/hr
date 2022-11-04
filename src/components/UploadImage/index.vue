<template>
  <div>
    <!--
          file-list: 用于默认图片的回显
       -->
    <el-upload
      action="#"
      list-type="picture-card"
      :http-request="uploadImg"
      :on-remove="removeImg"
      :class="{disable: imgUrl}"
      :file-list="fileList"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- percentage设置当前进度值
      进度条：在开始上传的时候且未上传完成之前显示
      -->
    <el-progress v-show="percent>0&&percent<100" :percentage="percent" />
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
      // http://hr-82-1259170259.cos.ap-guangzhou.myqcloud.com/1667551620617
      imgUrl: '',
      percent: 0
    }
  },
  computed: {
    fileList() {
      return this.imgUrl ? [{ url: this.imgUrl }] : []
    }
  },
  methods: {
    // 上传并保存图片地址
    uploadImg(file) {
      // 自定义图片上传
      // file就是选中的文件对象，其中里面有一个file属性
      // 那么这个属性就是将来要传递给后端的文件对象
      // 调用腾讯云提供的方法 实现文件上传
      this.imgUrl = file.file // 为了能够让 上传按钮立刻消失 因此这里需要加上这行代码（优化视觉效果）
      cos.uploadFile(
        {
          Bucket: 'hr-82-1259170259', /* 储存桶名字，必须字段 */
          Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
          Key: Date.now().toString(), /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
          Body: file.file, // 上传文件对象
          SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
          onProgress: (progressData) => {
            // console.log(47, progressData)
            this.percent = progressData.percent * 100
          }
        }, (err, data) => {
          if (err) {
            console.log('上传失败', err)
            this.imgUrl = '' // 上传失败 清空图片地址
          } else {
            console.log('上传成功', this)
            this.imgUrl = 'http://' + data.Location
          }
        })
    },
    // 移除图片
    removeImg() {
      this.imgUrl = ''
    }
  }
}
</script>
  <style lang="scss" scoped>
  .disable{
      ::v-deep .el-upload--picture-card{
          display: none;
      }
  }
  .el-progress{
      width: 170px;
  }
  </style>

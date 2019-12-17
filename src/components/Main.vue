<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{currentApi.name}}</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button type="text" style="width: 100%">{{currentApi.method}}</el-button>
          </el-col>
          <el-col :span="16">
            <el-input v-model="currentApi.url"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="send" :loading="loading">send</el-button>
          </el-col>
        </el-row>

        <el-row v-if="currentApi.params">
          <el-table
            ref="multipleTable"
            :data="currentApi.params"
            style="width: 100%"
            @selection-change="selectionParams"
            default-expand-all
            >
            <el-table-column type="expand">
              <template slot-scope="scope" v-if="scope.row.children">
                <json-editor v-model="scope.row.value"></json-editor>
              </template>
            </el-table-column>
            <el-table-column
              type="selection"
              width="55"
              :selectable="(row)=>(!row.required)"
            >
            </el-table-column>
            <el-table-column
              prop="key"
              label="key"
              width="160"
            >
            </el-table-column>
            <el-table-column
              prop="desr"
              :show-overflow-tooltip="true"
              label="描述">
            </el-table-column>
            <el-table-column
              prop="value"
              label="value"
              min-width="300"
            >
              <template slot-scope="scope" v-if="!scope.row.children">
                <div v-if="scope.row.type === 'Array'">
                  <TableCell :defaultValue="scope.row.value"/>
                </div>

                <div v-else-if="scope.row.type === 'file'">
                  <label for="file" @click="handleClick">
                    <input type="file" hidden name="file" ref="file" accept=".csv" @change="handleChange(scope.row, arguments)"/>
                    <el-button type="primary">上传呼叫文件</el-button>
                  </label>
                  {{scope.row.filename}}
                </div>

                <div v-else-if="scope.row.type === 'CheckBoxArray'">
                  <CheckboxCell
                    v-model="scope.row.value"
                    :options="scope.row.options"
                  />
                </div>

                <div v-else-if="scope.row.type==='SelectOptions'">
                  <SelectCell v-model="scope.row.value" :options="scope.row.options"></SelectCell>
                </div>

                <div v-else-if="scope.row.type==='TimePicker'">
                  <TimeCell v-model="scope.row.value"/>
                </div>

                 <div v-else-if="scope.row.type==='DatePicker'">
                   <DateCell v-model="scope.row.value"
                   :pickerType="scope.row.pickerType"
                   :valueFormat="scope.row.valueFormat">
                   </DateCell>
                 </div>

                <div v-else>
                  <el-input v-model.number="scope.row.value" v-if="scope.row.type ==='Number'"></el-input>
                  <el-input v-model="scope.row.value" v-else></el-input>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="mock" width="100" align="center" header-align="center">
              <template slot-scope="scope" v-if="scope.row.mock">
                <el-button
                  size="small"
                  type="text"
                  @click="mock(scope.row)"
                >
                  mock
                </el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-row>

      </div>
    </el-card>

    <el-card v-if="currentApi.response" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>返回结果</span>
      </div>
      <vue-json-editor v-model="currentApi.response" :show-btns="false"></vue-json-editor>
    </el-card>
  </div>
</template>

<script>
// import API from '../API'
import request from '@/service/request'
// import md5 from 'MD5'
import CryptoJS from 'crypto-js'
import TableCell from './TableCell.js'
import CheckboxCell from './CheckboxCell.js'
import vueJsonEditor from 'vue-json-editor'
import JsonEditor from './JsonEditor'
import Mock from 'mockjs'
import SelectCell from './SelectCell'
import TimeCell from './TimeCell'
import DateCell from './DateCell'

import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    TableCell,
    CheckboxCell,
    // eslint-disable-next-line
    vueJsonEditor,
    JsonEditor,
    SelectCell,
    TimeCell,
    DateCell
  },
  data () {
    return {
      // API,
      // isExpand: false,
      // hasMock: false,
      currentApi: {},
      params: [],
      loading: false,
      accessSecret: localStorage.getItem('accessSecret'),
      accessToken: localStorage.getItem('access_token')
    }
  },
  computed: {
    ...mapGetters({
      allApi: 'allApi',
      apiResponse: 'apiResponse'
    }),
    // Sign () {
    //   // Sign = MD5(secret_key+Authorization)
    //   const accessSecret = this.accessSecret
    //   console.log(accessSecret)
    //   return md5(`${accessSecret}${this.Authorization}`)
    // },
    Sign () {
      const iv = CryptoJS.enc.Utf8.parse('00000000') // 偏移量
      const mode = CryptoJS.mode.CBC // 加密模式
      const padding = CryptoJS.pad.Pkcs7 // 填充  Pkcs7, 即 Pkcs5
      const options = {
        iv,
        mode,
        padding
      }
      const accessSecret = this.accessSecret
      const utf8Key = CryptoJS.enc.Utf8.parse(accessSecret)
      const encrypted = CryptoJS.TripleDES.encrypt(`${accessSecret}${this.Authorization}`, utf8Key, options)

      return encrypted.toString()
    },
    Authorization () {
      // Authorization = base64(access_token:时间戳)
      const accessToken = this.accessToken
      const timeStamp = parseInt((new Date()).getTime() / 1000)
      return `${accessToken}${timeStamp}`
      // return window.btoa(accessToken)
    }

  },
  methods: {
    ...mapMutations({
      getResponse: 'getResponse'
    }),
    ...mapActions({
      getAPI: 'getAPI'
    }),
    handleChange (row, [e]) {
      const self = this
      const curParamIndex = this.currentApi.params.findIndex(item => item.key === row.key)
      const file = e.target.files[0]

      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = function (res) {
        console.log(res.target.result)
        const base64 = window.btoa(res.target.result)
        self.$set(self.currentApi.params[curParamIndex], 'value', base64)
        self.$set(self.currentApi.params[curParamIndex], 'filename', file.name)
      }
    },
    handleClick () {
      this.$refs['file'].click()
    },
    mock (row) {
      const curParamIndex = this.currentApi.params.findIndex(item => item.key === row.key)
      if (row.type === 'Array') {
        this.$set(this.currentApi.params[curParamIndex], 'value', [...this.currentApi.params[curParamIndex].value, Mock.mock(row.mock)])
      } else {
        this.$set(this.currentApi.params[curParamIndex], 'value', Mock.mock(row.mock))
      }
    },
    send () {
      const api = this.currentApi
      const params = {}
      const headers = {}
      if (this.params) {
        for (const param of this.params) {
          if (Array.isArray(param.value)) {
            params[param.key] = param.value.filter(value => value)
          } else {
            params[param.key] = param.value
          }
        }
      }
      if (api.auth) {
        headers.Authorization = this.Authorization
        headers.Sign = this.Sign
      }
      this.loading = true

      request(api.url, params, api.method, headers).then((result) => {
        this.getResponse({ key: api.key, [api.key]: result })
        // this.$set(this.currentApi, 'response', JSON.stringify(result))
        this.$set(this.currentApi, 'response', this.apiResponse[api.key])
        // console.log(this.currentApi)
        if (api.key === 'identify' && result.return_code === 0) {
          this.accessSecret = params.secret_key
          this.accessToken = result.appdata.access_token
          localStorage.setItem('access_token', result.appdata.access_token)
          localStorage.setItem('accessSecret', params.secret_key)
        }
        this.loading = false
      }).catch((err) => {
        this.loading = false
        return err
      })
      this.getAPI(this.currentApi)
    },
    selectionParams (selection) {
      this.params = selection
    },
    getApi (route) {
      const allApi = this.allApi.map(item => item.children).reduce((prev, next) => prev.concat(next), [])
      const currentApi = allApi.find(api => api.key === route.params.key)
      if (this.apiResponse[route.params.key]) {
        this.currentApi = { ...this.deepCopy(currentApi), response: this.apiResponse[route.params.key] }
      } else {
        this.currentApi = { ...this.deepCopy(currentApi), response: '' }
      }

      this.params = []
      this.$nextTick(() => {
        if (this.currentApi.params) {
          const required = this.currentApi.params.filter(item => item.required)
          for (const row of required) {
            this.$refs.multipleTable.toggleRowSelection(row)
          }
          // this.isExpand = this.currentApi.params.some(item => item.children)
          // this.hasMock = this.currentApi.params.some(item => item.mock)
          // if (this.isExpand) {
          const trs = [].slice.call(document.querySelectorAll('.el-table__row'))
          this.currentApi.params.forEach((row, index) => {
            if (!row.children) {
              trs[index].querySelector('.el-table__expand-column').style.visibility = 'hidden'
              // expandedCell[index] && (expandedCell[index].style.display = 'none')
            }
          })
          // }
        }
        // const expandedCell = [].slice.call(document.querySelectorAll('.el-table__expanded-cell'))
        // expandedCell.forEach(cell => {
        //   // !cell.querySelectorAll('div').length &&
        //   // (cell.style.display = 'none')
        // })
      })
    }
  },
  mounted () {
    this.getApi(this.$route)
  },
  beforeRouteUpdate (to, form, next) {
    this.getApi(to)
    next()
  }
}
</script>

<style>
.el-button{
  width: 100%;
}
.el-input-number{
  width: 100%;
}
.el-input-number .el-input__inner{
  text-align: left;
}
.el-table__expanded-cell[class*=cell]{
  padding: 0;
  border-bottom: none;
}
div.jsoneditor{
  border: none;
}
div.jsoneditor-menu{
  background-color: #409EFF;
  border-bottom: 1px solid #409EFF;
}
.jsoneditor-search{
  display: none;
}
</style>

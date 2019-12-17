export default {
  name: 'Table-Cell',
  props: {
    defaultValue: Array,
    template: Array
  },
  data () {
    return {
      parmaValue: this.defaultValue
    }
  },
  watch: {
    defaultValue (val) {
      console.log(val)
      this.parmaValue = val
    }
  },
  methods: {
    changeParmas (index) {
      return (e) => {
        if (this.isLast(index)) {
          this.parmaValue.splice(index + 1, 0, '')
        } else {
          this.parmaValue.splice(index, 1)
        }
      }
    },
    changeValue (index) {
      return (value) => {
        this.parmaValue.splice(index, 1, value)
      }
    },
    isLast (index) {
      return this.parmaValue.length === index + 1
    }
  },
  render (h) {
    if (this.template) {
      // console.log(this.parmaValue)
      return (
        <div>
          {
            this.parmaValue.map((item, index) => {
              return (
                <el-form label-width='100px' inline={true}>
                  {
                    this.template.map((param) => {
                      console.log(item[param.key])
                      return (
                        <el-form-item label={param.key}>
                          {
                            param.type === 'Array'
                              ? (
                                item[param.key].map((miniParam) => (
                                  <el-input value={miniParam}></el-input>
                                ))
                              )
                              : (
                                <el-input value={item[param.key]}></el-input>
                              )
                          }
                        </el-form-item>
                      )
                    })
                  }
                  <el-button
                    type="primary"
                    icon={this.isLast(index) ? 'el-icon-plus' : 'el-icon-minus'}
                  />
                </el-form>
              )
            })
          }
        </div>
      )
    } else {
      return (
        <div>
          {
            this.parmaValue.map((item, index) => {
              return (
                <el-row gutter={10}>
                  <el-col span={20}>
                    <el-input value={item}
                      onChange={this.changeValue(index)}
                      onInput={this.changeValue(index)}
                    />
                  </el-col>
                  <el-col span={4}>
                    <el-button
                      type="primary"
                      icon={this.isLast(index) ? 'el-icon-plus' : 'el-icon-minus'}
                      onClick={this.changeParmas(index)}
                    />
                  </el-col>
                </el-row>
              )
            })
          }
        </div>
      )
    }
  }
}

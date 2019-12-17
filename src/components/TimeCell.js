export default {
  name: 'TimeCell',
  props: {
    value: String
  },
  data () {
    return {
      parmaValue: this.value
    }
  },
  watch: {
    defaultValue (val) {
      this.parmaValue = val
    }
  },
  methods: {
    handleSelectChange (value) {
      this.parmaValue = value
      this.$emit('input', value)
    }
  },
  render (h) {
    return (
      <el-time-picker value={this.parmaValue} format="HH:mm"
        value-format="HH:mm"
        onInput={this.handleSelectChange}>
      </el-time-picker >
    )
  }
}

export default {
  name: 'DateCell',
  props: {
    value: [String, Number],
    pickerType: {
      type: String,
      default: 'date'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    }
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
      switch (this.valueFormat) {
        case 'timestamp':
          this.$emit('input', parseInt(value / 1000))
          break
        default:
          this.$emit('input', value)
          break
      }
    }
  },
  render (h) {
    return (
      <el-date-picker
        value={this.parmaValue}
        type={this.pickerType}
        value-format={this.valueFormat}
        onInput={this.handleSelectChange}>
      </el-date-picker>
    )
  }
}

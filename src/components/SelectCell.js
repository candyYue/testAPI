export default {
  name: 'SelectCell',
  props: {
    value: [String, Number],
    options: Array
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
      <el-select value={this.parmaValue} onChange={this.handleSelectChange}>
        {
          this.options.map(option => (
            <el-option label={option.label ? option.label : option}
              key={option.value ? option.value : option}
              value={option.value ? option.value : option} >
            </el-option>
          ))
        }
      </el-select >
    )
  }
}

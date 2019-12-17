export default {
  name: 'CheckboxCell',
  props: {
    value: Array,
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
    handleCheckedChange (value) {
      this.parmaValue = value
      this.$emit('input', value)
    }
  },
  render (h) {
    return (
      <el-checkbox-group value={this.parmaValue} onInput={this.handleCheckedChange}>
        {
          this.options.map(option => (
            <el-checkbox label={option.value} key={option.value} >
              {`${option.value} - ${option.label}`}
            </el-checkbox>
          ))
        }
      </el-checkbox-group >
    )
  }
}

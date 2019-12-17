<template>
    <div id="jsoneditor" class="jsoneditor"></div>
</template>

<script>
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'
export default {
  props: {
    value: {
      type: [Array, Object]
    }
  },
  watch: {
    value: {
      handler (val, oldVal) {
        if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
          this.editor.update(val)
        }
      }
    }
  },
  data () {
    return {
      jsonValue: this.value
    }
  },
  methods: {
    toJson () {
      const self = this
      var container = document.getElementById('jsoneditor')
      var options = {
        mode: 'code',
        onValidate: function (json) {
          self.$emit('input', json)
        }
      }
      this.editor = new JSONEditor(container, options, this.jsonValue)
    }
  },
  mounted () {
    this.toJson()
  }
}
</script>

<style scoped>
.jsoneditor{
  height: 500px;
}
</style>

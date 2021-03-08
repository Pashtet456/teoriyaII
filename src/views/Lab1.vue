<template>
  <v-form class="lab1">
    <div>
      Введите через пробел термины
      <v-text-field v-model="terms"></v-text-field>
    </div>
    <div class="d-flex align-top">
      <v-file-input
        v-model="files"
        color="deep-purple accent-4"
        counter
        label="File input"
        multiple
        placeholder="Select your files"
        prepend-icon="mdi-paperclip"
        outlined
        :show-size="1000"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip
            v-if="index < 2"
            color="deep-purple accent-4"
            dark
            label
            small
          >
            {{ text }}
          </v-chip>

          <span
            v-else-if="index === 2"
            class="overline grey--text text--darken-3 mx-2"
          >
            +{{ files.length - 2 }} File(s)
          </span>
        </template>
      </v-file-input>
      <v-btn
        v-on:click="checkTextFiles"
        :disabled="!files || !terms"
        class="ml-10"
        height="56"
      >
        Принять
      </v-btn>
    </div>

    <v-simple-table height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Terms</th>
            <th class="text-left" v-for="(name, i) in texts.names" :key="i">
              {{ name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="term of arrayTerms" :key="term">
            <td>
              {{ term }}
            </td>
            <td v-for="(text, i) in texts.inners" :key="i">
              {{ text[arrayTerms.indexOf(term)] }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-form>
</template>

<script>
export default {
  data: function () {
    return {
      files: null,
      texts: {
        names: [],
        text: [],
        inners: []
      },
      errors: [],
      terms: null,
      arrayTerms: []
    }
  },
  methods: {
    checkTextFiles () {
      this.processTerms()
      this.createNewTable(this.BooleanMethod)
      this.createNewTable(this.TFMethod)
      this.createNewTable(this.TFIDFMethod)
    },
    processTerms () {
      this.arrayTerms = this.terms.split(' ')
    },
    BooleanMethod () {
      this.files.forEach((element) => {
        const reader = new FileReader()
        reader.readAsText(element)

        reader.onload = () => {
          this.texts.names.push(element.name)
          this.texts.text.push(reader.result)

          const match = []
          for (const term of this.arrayTerms) {
            const result = reader.result.match(new RegExp(term, 'g'))
            if (result) {
              match.push('1')
            } else {
              match.push('0')
            }
          }
          this.texts.inners.push(match)
        }
      })
    },
    TFMethod () {
      this.files.forEach((element) => {
        const reader = new FileReader()
        reader.readAsText(element)

        reader.onload = () => {
          this.texts.names.push(element.name)
          this.texts.text.push(reader.result)

          const match = []
          for (const term of this.arrayTerms) {
            const result = reader.result.match(new RegExp(term, 'g'))
            if (result) {
              match.push(result.length)
            } else {
              match.push('0')
            }
          }
          this.texts.inners.push(match)
        }
      })
    },
    TFIDFMethod () {
      this.files.forEach((element) => {
        const reader = new FileReader()
        reader.readAsText(element)

        reader.onload = () => {
          this.texts.names.push(element.name)
          this.texts.text.push(reader.result)

          const match = []
          for (const term of this.arrayTerms) {
            const result = reader.result.match(new RegExp(term, 'g'))
            console.log(reader.result)
            console.log(reader.result.split(/\s+/))
            if (result) {
              match.push(result.length / reader.result.trim().split(/\s+/).length)
            } else {
              match.push('0')
            }
          }
          this.texts.inners.push(match)
        }
      })
    },
    createNewTable (method) {
      this.texts = {
        names: [],
        text: [],
        inners: []
      }

      method()
    }
  }
}
</script>

<style>
</style>

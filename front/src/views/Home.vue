<template>
  <div class="home">
    <div class="upper">
      <input name="income" type="number" placeholder="Income" />
      Balance: 5,000
      Total: 35,000
    </div>

    <div>
      <div class="title"><input type="text" placeholder="title" /></div>
      <div class="expenses">
        <div class="expense">
          <div class="title"><input type="text" placeholder="Title"/></div>
          <div class="value"><input type="number" placeholder="Value"/></div>
        </div>
      </div>
    </div>

    <div class="actions">
      Total: 35,000

      <button>Add another section</button>
      <button>Export to file</button>
      <button>Login and save</button>
    </div>
  </div>
</template>

<style lang="scss">
  .home {

  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class Home extends Vue {}
</script>

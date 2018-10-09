<template>
  <div class="home">
    <div class="row upper">
      <!--<div class="col-6 text-left">-->
        <!--<input name="income" type="number" placeholder="Income" class="form-control" />-->
      <!--</div>-->
      <!--<div class="col-6 text-right">-->
        <!--Balance: 5,000-->
        <!--Total: 35,000-->
      <!--</div>-->

      <div class="col-12 no-income">
        <input name="income" type="number" placeholder="What is you budget?" class="form-control animated bounce fast" />
      </div>
    </div>

    <!--<div class="row blocks">-->
      <!--<div class="block col-5">-->

        <!--<div class="block-header">-->
          <!--<div class="title"><input type="text" placeholder="Enter title here" class="form-control title" /></div>-->
        <!--</div>-->

        <!--<div class="expenses">-->
          <!--<div class="expense row">-->
            <!--<div class="title col-md-6"><input type="text" placeholder="Title" class="form-control" /></div>-->
            <!--<div class="value col-md-6"><input type="number" placeholder="Value" class="form-control" /></div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->

    <!--<div class="actions row">-->
      <!--<div class="col-8 text-left">-->
        <!--<button type="button" class="btn btn-primary">Add another section</button>-->
        <!--<button type="button" class="btn btn-success">Login and save</button>-->
      <!--</div>-->
<!---->
      <!--<div class="col-4 text-right">-->
        <!--Total: 25,000-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<style lang="scss">

  .home {

    .no-income {

      input {
        width: 25%;
        margin: 0 auto;
        border: solid 1px $blue1;
        border-radius: 0;
      }
    }

    .blocks {
      text-align: center;

      .block {
        margin: 1em auto;
        padding: 0;
        border: solid 1px $blue1;
        background: $white2;

        input {
          margin: 0;
          border-radius: 0;
          border: none;

          &.title {
            text-align: center;
            border-bottom: solid 1px $blue2;
            color: $blue3;
          }
        }

        .expense {

          .title {
            padding-right: 0;
            border-right: $blue1 solid 1px;
          }

          .value {
            padding-left: 0;
          }
        }
      }
    }

    .actions {

      button {
        margin-right: .5em;
      }
    }
  }

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class Home extends Vue {}
</script>

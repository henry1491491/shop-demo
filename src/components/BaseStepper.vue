<template>
  <b-row
    id="components-base_stepper"
    class="base-stepper d-flex justify-content-between align-items-center mx-3 "
  >
    <b-col
      md="auto"
      class="ml-2 pr-1"
    >
      <numeric-1-circle v-if="stepsProps[0].finished === false" />
      <check-circle
        v-else
        class="text-danger"
      />
    </b-col>
    <b-col
      :class="{'text-danger':stepsProps[0].finished}"
      class="text-left px-0"
      md="auto"
    >
      {{stepsProps[0].text}}
    </b-col>
    <b-col>
      <hr>
    </b-col>
    <b-col
      md="auto"
      class="px-1"
    >
      <numeric-2-circle v-if="!stepsProps[1].finished" />
      <check-circle
        v-else
        class="text-danger"
      />
    </b-col>
    <b-col
      :class="{'text-danger':stepsProps[1].finished}"
      class="text-left px-0"
      md="auto"
    >
      {{stepsProps[1].text}}
    </b-col>
    <b-col>
      <hr>
    </b-col>
    <b-col
      md="auto"
      class="px-1"
    >
      <numeric-3-circle v-if="!stepsProps[2].finished" />
      <check-circle
        v-else
        class="text-danger"
      />
    </b-col>
    <b-col
      :class="{'text-danger':stepsProps[2].finished}"
      class="text-left px-0"
      md="auto"
    >
      {{stepsProps[2].text}}
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "BaseStepper",
  props: {
    stepsProps: { type: Array }
  }
}
</script>

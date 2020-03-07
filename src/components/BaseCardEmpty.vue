 <template>
  <b-card>
    <b-card-text class="text-center">
      {{cardText}}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "BaseCardEmpty",
  props: {
    cardText: { type: String }
  }
}
</script>

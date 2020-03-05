<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">График траты средств</h4>
        <div class="text-center">
          <canvas ref="canvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs/src'
import { mapActions } from 'vuex'

import arrFromObj from '../utils/arrFromObj'

export default {
  name: 'PlanningPieChart',
  extends: Pie,
  props: ['categories'],
  data () {
    return {
      records: [],
      error: null
    }
  },
  created () {
    this.getRecords()
      .then(res => {
        if (res.val()) {
          this.records = arrFromObj(res.val())
        }
      }).catch(err => {
        this.error = err
      })
  },
  mounted () {
    this.renderChart({
      labels: this.categories.map(cat => cat.name),
      datasets: [
        {
          label: 'Label',
          data: this.categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += +r.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    }, { responsive: true, maintainAspectRatio: false })
  },
  methods: {
    ...mapActions('record', ['getRecords'])
  }
}
</script>

<style lang="scss" scoped>
  .card-title {
    text-align: center;
  }
</style>

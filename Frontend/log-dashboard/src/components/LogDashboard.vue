<template>
  <main class="mb-4">
    <h2>IP Address Histogram</h2>
    <!-- Bootstrap card for IP Address Histogram -->
    <div class="card draggable">
      <div class="card-header bg-transparent">
        <h6 class="text-uppercase text-muted ls-1 mb-1">IP Address Traffic</h6>
        <h5 class="h3 mb-0">Total Requests per IP</h5>
      </div>
      <div class="card-body">
        <div class="chart">
          <!-- Canvas for IP Address Histogram -->
          <canvas ref="ipChartCanvas" class="chart-bar chart-canvas"></canvas>
        </div>
      </div>
    </div>

    <h2 class="mt-4">Hourly Traffic Histogram</h2>
    <!-- Bootstrap card for Hourly Traffic Histogram -->
    <div class="card draggable mt-4">
      <div class="card-header bg-transparent">
        <h6 class="text-uppercase text-muted ls-1 mb-1">Hourly Traffic</h6>
        <h5 class="h3 mb-0">Total Requests per Hour</h5>
      </div>
      <div class="card-body">
        <div class="chart">
          <!-- Canvas for Hourly Traffic Histogram -->
          <canvas ref="hourChartCanvas" class="chart-bar chart-canvas"></canvas>
        </div>
      </div>
    </div>

    <div class="container mt-4 mb-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="top-ips-container pb-2">
            <h3 class="mt-4">Top IPs (85% Traffic)</h3>
            <div class="card scrollable-card">
              <div class="card-body">
                <ul class="list-group">
                  <li v-for="(count, ip) in topIPs" :key="ip" class="list-group-item">
                    <strong>{{ ip }}</strong> - {{ count }} requests
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="top-ips-container pb-2">
            <h3 class="mt-4">Top Hours (70% Traffic)</h3>
            <div class="card scrollable-card">
              <div class="card-body">
                <ul class="list-group">
                  <li v-for="(count, hour) in topHours" :key="hour" class="list-group-item">
                    <strong>{{ hour }}:00</strong> - {{ count }} requests
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref, onMounted, nextTick, watch } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
  setup() {
    const ipChartData = ref(null);
    const hourChartData = ref(null);
    const topIPs = ref({});
    const topHours = ref({});

    const ipChartCanvas = ref(null);
    const hourChartCanvas = ref(null);
    let ipChartInstance = null;
    let hourChartInstance = null;

    // Fetch data from the backend API

    const apiURL = process.env.VUE_APP_API_URL; 
    const fetchData = async () => {
      try {
        const [ipRes, hourRes, topIpRes, topHourRes] = await Promise.all([
          axios.get(`${apiURL}/histogram/ips`),
          axios.get(`${apiURL}/histogram/traffic`),
          axios.get(`${apiURL}/top-ips`),
          axios.get(`${apiURL}/top-hours`)
        ]);

        //console.log("IP Data:", ipRes.data);
        //console.log("Hourly Data:", hourRes.data);

        ipChartData.value = {
          labels: Object.keys(ipRes.data),
          datasets: [{
            label: "Requests per IP",
            data: Object.values(ipRes.data),
            backgroundColor: "red",
            maxBarThickness: 5,
            borderColor: "red",
            borderWidth: 1,
            barPercentage: 0.7, // Adjust bar size
            categoryPercentage: 0.6, // Adjust spacing between bars
          }],
        };

        hourChartData.value = {
          labels: Object.keys(hourRes.data),
          datasets: [{
            label: "Requests per Hour",
            data: Object.values(hourRes.data),
            backgroundColor: "green",
            maxBarThickness: 10,
          }],
        };

        topIPs.value = topIpRes.data;
        topHours.value = topHourRes.data;

        // Ensure canvas is available before rendering charts
        await nextTick();
        renderCharts();

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Render the charts using Chart.js
    const renderCharts = () => {
      if (ipChartInstance) ipChartInstance.destroy();
      if (hourChartInstance) hourChartInstance.destroy();

      // IP Address Histogram
      if (ipChartCanvas.value) {
        ipChartInstance = new Chart(ipChartCanvas.value, {
          type: 'bar',
          data: ipChartData.value,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }

      // Hourly Traffic Histogram
      if (hourChartCanvas.value) {
        hourChartInstance = new Chart(hourChartCanvas.value, {
          type: 'bar',
          data: hourChartData.value,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    };

    // Watch for data changes and re-render charts
    watch([ipChartData, hourChartData], () => {
      renderCharts();
    });

    // Fetch data and render charts on mounted
    onMounted(fetchData);

    return { ipChartData, hourChartData, topIPs, topHours, ipChartCanvas, hourChartCanvas };
  },
});
</script>

<style scoped>
/* Ensure canvas has enough space */
.chart-bar {
  width: 100%;
  height: 400px !important;
  /* Set height to ensure bars are visible */
}

.scrollable-card {
  max-height: 300px;
  /* Limits visible height */
  overflow-y: auto;
  /* Enables vertical scrolling */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
}

.list-group-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

/* Optional: Add hover effect */
.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>

import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ServService } from 'src/app/serv.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private service: ServService) { }



data = [];
  makeChart() {
    for(let i = 1; i<13; i++) {
        this.data.push(this.statisticsRes.created_per_month[i]);
    }
    var statisticsChart = new Chart("statisticsChart", {
        type: 'line',
        data: {
            labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
            datasets: [{
                label: 'the no. of clients per month.',
                data: [ ...this.data ],
                backgroundColor: [
                    'rgba(0, 0, 0, 0.1)'
                ],
                borderColor: [ 
                    'rgba(0, 0, 0, 0.1)'
                 ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  }

  statisticsRes;
  statistics() {
      this.service.getStatistices().subscribe(res => {
          this.statisticsRes = res;
          console.log("this is the response from statistics::", res)
          this.makeChart();
      })
  }


  ngOnInit() {
    this.statistics();
  }

}

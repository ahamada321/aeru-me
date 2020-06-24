import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-landing-rpa",
  templateUrl: "./landing-rpa.component.html",
  styleUrls: ["./landing-rpa.component.scss"],
})
export class LandingRpaComponent implements OnInit, OnDestroy {
  data: Date = new Date();
  innerWidth: number; // Browser width
  public canvas: any;
  public ctx;
  public gradientFill;
  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData: Array<any>;
  public lineChartGradientsNumbersOptions: any;
  public lineChartGradientsNumbersLabels: Array<any>;
  public lineChartGradientsNumbersColors: Array<any>;
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  constructor(public el: ElementRef) {}

  ngOnInit() {
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");
    body.classList.add("presentation-page"); // temporary

    this.innerWidth = window.innerWidth;
    this.initChart();
  }
  initChart() {
    this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 80);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB("#FF5A5F", 0.2));
    this.lineChartGradientsNumbersData = [
      {
        label: "業務負荷 [ パーセント ]",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: [99, 30],
      },
    ];
    this.lineChartGradientsNumbersColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: "#FF5A5F",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#FF5A5F",
      },
    ];
    this.lineChartGradientsNumbersLabels = ["導入前", "導入後"];
    this.lineChartGradientsNumbersOptions = {
      maintainAspectRatio: true,
      legend: {
        display: true,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
      responsive: 1,
      scales: {
        yAxes: [
          {
            ticks: {
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5,
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              padding: 10,
              fontStyle: "bold",
            },
            gridLines: {
              zeroLineColor: "transparent",
              display: false,
            },
          },
        ],
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15,
        },
      },
    };

    this.lineChartGradientsNumbersType = "bar";
  }
  ngOnDestroy() {
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
    if (navbar.classList.contains("nav-up")) {
      navbar.classList.remove("nav-up");
    }
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
    body.classList.remove("presentation-page"); // temporary
  }

  @HostListener("window:scroll")
  checkScroll() {
    const componentPosition = document.getElementsByClassName("add-animation");
    const scrollPosition = window.pageYOffset;

    for (var i = 0; i < componentPosition.length; i++) {
      var rec =
        componentPosition[i].getBoundingClientRect().top + window.scrollY + 100;
      if (scrollPosition + window.innerHeight >= rec) {
        componentPosition[i].classList.add("animated");
      } else if (scrollPosition + window.innerHeight * 0.8 < rec) {
        componentPosition[i].classList.remove("animated");
      }
    }
  }

  @HostListener("window:resize")
  onResize() {
    this.innerWidth = window.innerWidth;
  }
}

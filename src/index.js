import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactHighcharts from "react-highcharts";
import "./styles.css";

class HChart extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.animation === false) return true;
    if (nextProps.updateGraph === undefined || nextProps.updateGraph !== false)
      return true;
    else return false;
  }

  render() {
    const {
      legendConfig = {
        enabled: true
      },
      animation = true,
      forceAnimate = false,
      timeZone = false,
      theme = "light",
      dataPoints
    } = this.props;

    if (timeZone)
      ReactHighcharts.Highcharts.setOptions({
        global: {
          timezoneOffset: timeZone
        }
      });

    const config = {
      chart: {
        animation: false,
        type: "pie",
        backgroundColor: null
      },
      title: {
        text: null
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          animation: {
            duration: 750,
            easing: "easeOutQuad"
          },
          shadow: false,
          center: ["50%", "50%"],
          cursor: "pointer",
          dataLabels: {
            enabled: false
          }
        },
        series: {
          animation: {
            duration: 750,
            easing: "easeOutQuad"
          }
        }
      },
      series: [
        {
          animation: {
            duration: 750,
            easing: "easeOutQuad"
          },
          name: "Spending",
          data: dataPoints,
          size: "90%",
          innerSize: "70%",
          dataLabels: {
            formatter: function() {
              return this.y > 5 ? this.point.name : null;
            },
            color: "#ffffff",
            distance: -30
          }
        }
      ]
    };

    return (
      <ReactHighcharts
        className="inoutflow-highchart"
        id="inoutflow-highchart-container"
        config={config}
        callback={chart => {
          this.chart = chart;
        }}
      />
    );
  }
}

const data = [
  {
    y: 10,
    name: "Red"
  },
  {
    y: 20,
    name: "Green"
  },
  {
    y: 30,
    name: "Yellow"
  },
  {
    y: 40,
    name: "Red"
  },
  {
    y: 50,
    name: "Green"
  },
  {
    y: 60,
    name: "Yellow"
  },
  {
    y: 70,
    name: "Yellow"
  },
  {
    y: 80,
    name: "Red"
  },
  {
    y: 90,
    name: "Green"
  },
  {
    y: 100,
    name: "Yellow"
  }
];

const colors = [
  "#021A3C",
  "#665191",
  "#195F80",
  "#2F4B7C",
  "#FF7C43",
  "#F95D6A",
  "#D45087",
  "#A05195",
  "#FF4E00",
  "#08364B",
  "#FFA600"
];
function App() {
  return (
    <div className="App">
      <HChart
        dataPoints={data.map((ele, k) => {
          ele.color = colors[(k + new Date().getTime()) % colors.length];
          return ele;
        })}
        legendConfig={{
          enabled: true,
          align: "right",
          y: 20
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

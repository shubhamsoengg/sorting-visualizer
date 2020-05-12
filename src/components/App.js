import React from "react";
import Slider from "react-rangeslider";

/*Import the stylesheets*/
import "react-rangeslider/lib/index.css";
import "../sortStyle.scss";

const GREY_COLOR = "#7c7878";
const RED_COLOR = "#EA3C53";
const PURPLE_COLOR = "#9966CC";
const GREEN_COLOR = "#008081";
// const COMPARE_COLOR = "#7c7878";
class App extends React.Component {
  state = { barArr: [], numberOfBarsSet: 60, speed: 200, reset: true };

  componentDidMount() {
    // used for initialization or the initial data loading part
    this.reset();
  }

  reset() {
    let barArr = [];
    for (let i = 0; i < this.state.numberOfBarsSet; i++) {
      barArr.push(this.getRndInteger(10, 100));
    }
    this.setState({ reset: true });
    this.setState({ barArr: barArr });
  }

  /*Generic functions begin*/
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  changeSpeed(speed) {
    if (speed === "increase") {
      if (this.state.speed > 5) {
        this.setState({ speed: this.state.speed - 20 });
      }
    }
    if (speed === "decrease") {
      if (this.state.speed < 345) {
        this.setState({ speed: this.state.speed + 20 });
      }
    }
  }

  handleChangeHorizontal = (value) => {
    this.setState({
      speed: 900 - value,
    });
  };
  /*Generic functions ends*/

  /*bubble sort code begins*/
  bubbleSort = async () => {
    this.setState({ reset: false });
    await this.delay(0.2);
    let bars_array = document.getElementsByClassName("bar");
    let n = this.state.barArr.length - 1;
    for (let j = 0; j < n; j++) {
      if (this.state.reset) {
        return;
      }
      for (let i = 0; i < n - j; i++) {
        if (this.state.reset) {
          return;
        }
        bars_array[i].style.background = GREEN_COLOR;
        bars_array[i + 1].style.background = GREEN_COLOR;
        await this.delay(this.state.speed);
        if (bars_array[i].offsetHeight > bars_array[i + 1].offsetHeight) {
          bars_array[i].style.background = RED_COLOR;
          bars_array[i + 1].style.background = RED_COLOR;
          await this.delay(this.state.speed);
          let temp = bars_array[i].offsetHeight;
          bars_array[i].style.height = bars_array[i + 1].offsetHeight + "px";
          bars_array[i + 1].style.height = temp + "px";
        }
        await this.delay(this.state.speed);
        bars_array[i].style.background = PURPLE_COLOR;
        bars_array[i + 1].style.background = PURPLE_COLOR;
      }
    }
    console.log("Done");
  };
  /*bubble sort code ends*/

  /*Inserton Sort begins*/
  insertionSort = async () => {
    this.setState({ reset: false });
    await this.delay(0.2);
    let bars_array = document.getElementsByClassName("bar");
    for (let i = 1; i < bars_array.length; i++) {
      if (this.state.reset) {
        return;
      }
      let j = i - 1;
      let temp = bars_array[i].offsetHeight;
      bars_array[i].style.background = RED_COLOR;
      while (j >= 0 && bars_array[j].offsetHeight > temp) {
        if (this.state.reset) {
          return;
        }
        await this.delay(this.state.speed);

        bars_array[j + 1].style.height = bars_array[j].offsetHeight + "px";
        j--;
      }

      bars_array[j + 1].style.background = GREEN_COLOR;
      await this.delay(this.state.speed);
      bars_array[j + 1].style.height = temp + "px";
      bars_array[i].style.background = PURPLE_COLOR;
      bars_array[j + 1].style.background = PURPLE_COLOR;
    }
  };
  /*Inserton Sort ends*/

  /*Quick sort code starts*/
  partition = async (bars_array, left, right) => {
    // create pivot as middle value
    const pivot_bar = bars_array[Math.floor((right + left) / 2)];
    const pivot = pivot_bar.offsetHeight;
    await this.delay(this.state.speed);
    // pivot_bar.style.background = GREEN_COLOR;

    let i = left; // start left and go right towards pivot
    let j = right; // start right and go left towards pivot
    if (this.state.reset) {
      return;
    }
    while (i <= j) {
      if (this.state.reset) {
        return;
      }
      while (bars_array[i].offsetHeight < pivot) {
        if (this.state.reset) {
          return;
        }
        i++;
      }

      while (bars_array[j].offsetHeight > pivot) {
        if (this.state.reset) {
          return;
        }
        j--;
      }
      if (i <= j) {
        if (this.state.reset) {
          return;
        }
        // swap values
        bars_array[i].style.background = RED_COLOR;
        bars_array[j].style.background = RED_COLOR;
        let temp = bars_array[i].offsetHeight;
        bars_array[i].style.height = bars_array[j].offsetHeight + "px";
        bars_array[j].style.height = temp + "px";
        await this.delay(this.state.speed);
        bars_array[i].style.background = PURPLE_COLOR;
        bars_array[j].style.background = PURPLE_COLOR;
        i++;
        j--;
      }
    }
    await this.delay(this.state.speed);
    //pivot_bar.style.background = GREY_COLOR;
    return i;
  };

  quickSortAlgo = async (
    bars_array,
    left = 0,
    right = this.state.numberOfBarsSet - 1
  ) => {
    let index;
    if (this.state.numberOfBarsSet > 1) {
      // create the partition (split the array)
      index = await this.partition(bars_array, left, right);
      await this.delay(this.state.speed);
      if (left < index - 1) {
        this.quickSortAlgo(bars_array, left, index - 1);
      }
      if (index < right) {
        this.quickSortAlgo(bars_array, index, right);
      }
    }
    //return items
  };

  quickSort() {
    this.setState({ reset: false });
    let bars_array = document.getElementsByClassName("bar");
    this.quickSortAlgo(bars_array, 0, this.state.numberOfBarsSet - 1);
  }
  /*Quick sort code ends*/

  render() {
    return (
      <div className="container app-wrapper">
        <h3 className="text-center app-title m-b-30 m-t-40">
          Sorting Visualizer
        </h3>

        <div className="row m-t-10">
          <div className="col-sm-2">
            Some content comes here (number of bars)
          </div>
          <div className="col-sm-9 bars-section">
            {this.state.barArr.map((bar, index) => {
              return (
                <div
                  key={index}
                  style={{ height: `${bar}%`, background: `${PURPLE_COLOR}` }}
                  className="bar"
                ></div>
              );
            })}
          </div>
        </div>

        <div className="row m-t-20">
          <div className="col-sm-6 offset-sm-2 sort-btn-section text-center">
            <button
              className="btn sort-btn m-r-5 reset"
              onClick={(e) => {
                this.reset();
              }}
            >
              Reset
            </button>
            <button
              className="btn sort-btn m-r-5"
              onClick={(e) => this.bubbleSort()}
            >
              Bubble Sort
            </button>
            <button
              className="btn sort-btn m-r-5"
              onClick={(e) => this.mergeSort()}
            >
              Merge Sort
            </button>
            <button
              className="btn sort-btn m-r-5"
              onClick={(e) => this.quickSort()}
            >
              Quick Sort
            </button>
            <button
              className="btn sort-btn m-r-5"
              onClick={(e) => this.insertionSort()}
            >
              Insertion Sort
            </button>
          </div>
          <div className="col-sm-2 speed-slider-section">
            <div className="slider custom-labels">
              <Slider
                min={5}
                max={900}
                value={900 - this.state.speed}
                onChange={this.handleChangeHorizontal}
              />
            </div>
            <p className="text-center speed-text">
              <span className="fa fa-minus float-left"></span>
              Sorting Speed
              <span className="fa fa-plus float-right"></span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

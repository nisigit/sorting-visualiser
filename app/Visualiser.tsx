"use client";
import React, { useState, useRef } from "react";
import { IBar } from "@/interfaces/interfaces";
// import selectionSort from "@/app/components/algorithms/selectionSort";

const generateRandomArray = (size: number) => {
  const arr: IBar[] = [];
  for (let i = 0; i < size; i++) {
    arr.push({
      height: Math.floor(Math.random() * 90) + 1,
      color: "white",
    });
  }
  return arr;
};

const Visualizer = () => {
  const [barCount, setBarCount] = useState<number>(50);
  const [array, setArray] = useState<IBar[]>(generateRandomArray(barCount));
  const [speed, setSpeed] = useState<number>(50);
  const speedRef = useRef<number>(speed);
  const isSortingRef = useRef<boolean>(false);
  const isSortedRef = useRef<boolean>(false);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    isSortingRef.current = true;
    let tempArr = [...array];
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < tempArr.length - i - 1; j++) {
        if (!isSortingRef.current) {
          for (let k = 0; k < tempArr.length; k++) tempArr[k].color = "white";
          setArray([...tempArr]);
          return;
        }
        tempArr[j].color = "red";
        if (tempArr[j].height > tempArr[j + 1].height) {
          let temp = tempArr[j];
          temp.color = "green";
          tempArr[j + 1].color = "red";
          tempArr[j] = tempArr[j + 1];
          tempArr[j + 1] = temp;
          setArray([...tempArr]);
          await sleep(110 - speedRef.current);
          temp.color = "white";
        }
        tempArr[j].color = "white";
      }
    }
    completeSort(tempArr);
  };

  const selectionSort = async () => {
    isSortingRef.current = true;
    let tempArr = [...array];
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i].color = "orange";
      setArray([...tempArr]);
      let min = i;
      for (let j = i + 1; j < tempArr.length; j++) {
        if (!isSortingRef.current) {
          for (let k = 0; k < tempArr.length; k++) tempArr[k].color = "white";
          setArray([...tempArr]);
          return;
        }
        tempArr[j].color = "red";
        setArray([...tempArr]);
        if (tempArr[j].height < tempArr[min].height) min = j;
        await sleep(110 - speedRef.current);
        tempArr[j].color = "white";
      }
      let temp = tempArr[i];
      tempArr[i].color = "red";
      tempArr[min].color = "red";
      setArray([...tempArr]);
      tempArr[i] = tempArr[min];
      tempArr[min] = temp;
      tempArr[i].color = "green";
      setArray([...tempArr]);
    }
    completeSort(tempArr);
  };

  const completeSort = async (sortedArray: IBar[]) => {
    isSortingRef.current = false;
    // make all bars green and don't change the array
    let tempArr = [...sortedArray];
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i].color = "green";
    }
    setArray([...tempArr]);
    isSortedRef.current = true;
    await sleep(1000);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-800 p-2 text-white">
      <section className="flex h-full w-full flex-col justify-center text-center align-middle md:max-w-5xl">
        <section className="h-3/4 w-full">
          <h1 className="m-4 text-4xl">Sorting Algorithm Visualizer</h1>
          <div className="flex h-[500px] w-full flex-wrap items-end justify-center bg-slate-900 p-2">
            {array.map((bar, index) => (
              <div
                key={index}
                className="inline-block h-full border-2 border-black"
                style={{
                  height: `${bar.height}%`,
                  width: `${100 / array.length}%`,
                  background: bar.color,
                }}
              ></div>
            ))}
          </div>
        </section>
        <section className="flex h-2/3 w-full flex-row justify-between">
          <div>
            <div className="my-2">
              <label htmlFor="number-of-bars">Number of Bars: {barCount}</label>
              <input
                id="number-of-bars"
                type="range"
                value={barCount}
                min="10"
                max="100"
                step="1"
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                disabled={isSortingRef.current}
                onChange={(e) => {
                  setBarCount(Number(e.target.value));
                  setArray(generateRandomArray(barCount));
                }}
              />
            </div>
            <div className="my-2">
              <label htmlFor="delay" className="text-sm font-medium">
                Speed: {speed}
              </label>
              <input
                id="delay"
                type="range"
                value={speed}
                min="1"
                max="100"
                step="1"
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                onChange={(e) => {
                  setSpeed(Number(e.target.value));
                  speedRef.current = Number(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <button
              className="m-1 rounded-md bg-sky-700 p-2 text-white disabled:opacity-50"
              disabled={isSortingRef.current}
              onClick={() => {
                setArray(generateRandomArray(barCount));
                isSortedRef.current = false;
              }}
            >
              Reinitialise Array
            </button>
            <button
              className="m-1 rounded-md bg-white p-2 text-black disabled:opacity-50"
              disabled={isSortingRef.current}
              onClick={() => bubbleSort()}
            >
              Start Bubble Sort
            </button>
            <button
              className="disabled: m-1 rounded-md bg-white p-2 text-black disabled:opacity-50"
              disabled={isSortingRef.current}
              onClick={() => selectionSort()}
            >
              Start Selection Sort
            </button>
            <button
              className="m-1 rounded-md bg-red-500 p-2 text-white disabled:opacity-50"
              onClick={() => (isSortingRef.current = false)}
            >
              Stop sorting
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Visualizer;

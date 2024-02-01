"use client";
import React, { useState, useRef, useEffect } from "react";
import { IBar } from "@/interfaces/interfaces";

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
		await sleep(1000);
	};

	return (
		<div className="p-2 text-white w-full h-screen bg-slate-800 flex flex-col items-center justify-center">
			<section className="w-full md:max-w-5xl h-full flex flex-col justify-center align-middle text-center">
				<section className="h-3/4 w-full">
					<h1 className="text-4xl m-4">Sorting Algorithm Visualizer</h1>
					<div className="h-[500px] w-full p-2 bg-slate-900 flex flex-wrap justify-center items-end">
						{array.map((bar, index) => (
							<div
								key={index}
								className="h-full inline-block border-2 border-black"
								style={{
									height: `${bar.height}%`,
									width: `${100 / array.length}%`,
									background: bar.color,
								}}
							></div>
						))}
					</div>
				</section>
				<section className="flex w-full flex-row justify-between h-2/3">
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
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
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
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
								onChange={(e) => {
									setSpeed(Number(e.target.value));
									speedRef.current = Number(e.target.value);
								}}
							/>
						</div>
					</div>
					<div>
						<button
							className="m-1 bg-sky-700 text-white p-2 rounded-md"
							disabled={isSortingRef.current}
							onClick={() => setArray(generateRandomArray(barCount))}
						>
							Reinitialise Array
						</button>
						<button
							className="m-1 bg-white text-black p-2 rounded-md"
							disabled={isSortingRef.current}
							onClick={() => bubbleSort()}
						>
							Start Bubble Sort
						</button>
						<button
							className="m-1 bg-white text-black p-2 rounded-md"
							disabled={isSortingRef.current}
							onClick={() => selectionSort()}
						>
							Start Selection Sort
						</button>
						<button
							className="m-1 bg-red-500 text-white p-2 rounded-md"
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

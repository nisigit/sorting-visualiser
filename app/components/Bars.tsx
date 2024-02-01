import React from "react";
import { IBar } from "@/interfaces/interfaces";

const Bars = (array: IBar[]) => {
	return (
		<div className="h-[500px] w-full p-2 bg-slate-900">
			{array.map(({ height, color }, index) => (
				<div
					key={index}
					className="h-full inline-block border-2 border-black"
					style={{
						height: `${height}%`,
						width: `${100 / array.length}%`,
						background: color,
					}}
				></div>
			))}
		</div>
	);
};

export default Bars;

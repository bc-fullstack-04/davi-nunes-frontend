import React from "react";

interface Props {
	children: React.ReactNode;
	name: string;
	value: string;
	type: string;
	required?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput = ({
	children,
	name,
	value,
	type,
	required,
	onChange,
}: Props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e);
		}
	};

	return (
		<label className="flex flex-col mb-2">
			{children}
			<input
				type={type}
				name={name}
				value={value}
				required={required}
				className="w-full ring-1 ring-zinc-400 h-8 px-2 text-zinc-500 rounded-sm"
				onChange={handleChange}
			/>
		</label>
	);
};
export default LabelInput;

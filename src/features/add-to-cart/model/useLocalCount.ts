import { ChangeEvent, useCallback, useState } from 'react';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

const clamp = (value: number) =>
	value > MAX_COUNT ? MAX_COUNT : value < MIN_COUNT ? MIN_COUNT : value;

export const useLocalCount = (initial = 1) => {
	const [count, setCount] = useState(initial);

	const handleCount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setCount(clamp(+e.target.value));
	}, []);

	const handleCountPlus = useCallback(() => {
		setCount((prev) => clamp(prev + 1));
	}, []);

	const handleCountMinus = useCallback(() => {
		setCount((prev) => clamp(prev - 1));
	}, []);

	return { count, handleCount, handleCountPlus, handleCountMinus };
};

declare module '*.svg' {
	const src: string;
	export default src;
}

declare module '*.svg?react' {
	import { FC, SVGProps } from 'react';
	const Component: FC<SVGProps<SVGSVGElement> & { title?: string }>;
	export default Component;
}

declare module '*.png' {
	const src: string;
	export default src;
}

declare module '*.jpg' {
	const src: string;
	export default src;
}

declare module '*.webp' {
	const src: string;
	export default src;
}

import {
	MouseEvent,
	ReactNode,
	useEffect,
	useId,
	useRef,
} from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
};

const MODAL_ROOT_ID = 'modal-root';

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const triggerRef = useRef<HTMLElement | null>(null);
	const titleId = useId();

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		triggerRef.current = document.activeElement as HTMLElement | null;

		const prevBodyOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const focusTimer = window.setTimeout(() => {
			closeBtnRef.current?.focus();
		}, 0);

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.stopPropagation();
				onClose();
			}
		};
		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = prevBodyOverflow;
			window.clearTimeout(focusTimer);
			triggerRef.current?.focus?.();
			triggerRef.current = null;
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	const modalRoot = document.getElementById(MODAL_ROOT_ID);
	if (!modalRoot) {
		return null;
	}

	const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return createPortal(
		<div
			className={s.overlay}
			onClick={handleOverlayClick}
			role='presentation'>
			<div
				className={s.window}
				role='dialog'
				aria-modal='true'
				aria-labelledby={title ? titleId : undefined}>
				<div className={s.header}>
					{title && (
						<h2 id={titleId} className={s.title}>
							{title}
						</h2>
					)}
					<button
						ref={closeBtnRef}
						type='button'
						className={s.close}
						aria-label='Закрыть'
						onClick={onClose}>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'>
							<path
								d='M6 6L18 18M18 6L6 18'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>
					</button>
				</div>
				<div className={s.body}>{children}</div>
			</div>
		</div>,
		modalRoot
	);
};

import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from '@widgets/Header';
import { Footer } from '@widgets/Footer';
import 'react-toastify/dist/ReactToastify.css';
import './styles/normalize.css';
import './styles/styles.css';

export const App: FC = () => (
	<>
		<Header />
		<Outlet />
		<ToastContainer
			position='top-right'
			autoClose={5000}
			hideProgressBar={false}
			pauseOnHover
			theme='colored'
		/>
		<Footer />
	</>
);

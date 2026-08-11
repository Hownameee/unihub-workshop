import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./main/Main";

export default function Layout() {
	return (
		<div className="min-h-screen flex flex-col md:px-8 px-5 max-w-7xl mx-auto">
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

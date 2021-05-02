import './css/global.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Posts from "./pages/posts";
import Users from "./pages/users";
import Post from "./pages/post";

function App() {
	return (
		<Router>
			<div className="App">
				<div className="cover"></div>
				<header>
					<div className="logo">
						<Link to="/">React App</Link>
					</div>
					<nav>
						<Link to="/">Users</Link>
						<Link to="/posts">Posts</Link>
					</nav>
				</header>
				<main>
					<Switch>
						<Route exact path="/">
							<Users/>
						</Route>
						<Route exact path="/posts">
							<Posts/>
						</Route>
						<Route path="/posts/:postId">
							<Post/>
						</Route>
					</Switch>
				</main>
				<footer>
					<p>React App &copy; {new Date().getFullYear()}</p>
				</footer>
			</div>
		</Router>
	);
}

export default App;

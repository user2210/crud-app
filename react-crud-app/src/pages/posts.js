import {useEffect, useState} from "react";
import api from "../helpers/axiosInstance";
import '../css/posts.css';
import {Link} from "react-router-dom";

function Posts() {

	const [posts, setPosts] = useState([]);
	const [postsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPosts, setTotalPosts] = useState(0);
	const [maxPages, setMaxPages] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			return await api.get(`/posts?_page=${currentPage}`);
		};
		fetchPosts().then(res => {
			setTotalPosts(res.headers['x-total-count']);
			setPosts(res.data);
			setIsLoading(false);
		});
	}, [currentPage]);

	useEffect(() => {
		setMaxPages(Math.ceil(totalPosts/postsPerPage));
	}, [totalPosts, postsPerPage]);

	const handlePagination = (nav) => {
		if(nav === 'next') {
			setCurrentPage(currentPage + 1);
		} else {
			setCurrentPage(currentPage - 1);
		}
	};

	if(isLoading)
		return (
			<div className="loader">
			</div>
		);

	return (
		<>
			<section className="posts">
				{
					posts.map(post => (
						<Link to={`/posts/${post.id}`} className="post" key={post.id}>
							<h3 className="post-title">{post.title}</h3>
							<p>{post.body}</p>
						</Link>
					))
				}
			</section>
			<div className="pagination">
				{
					currentPage !== 1 &&
					<button className="prev-btn" onClick={() => handlePagination('prev')}>Prev</button>
				}
				{
					currentPage !== maxPages &&
					<button className="next-btn" onClick={() => handlePagination('next')}>Next</button>
				}
			</div>
		</>
	);
}

export default Posts;
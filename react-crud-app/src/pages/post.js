import {useEffect, useState} from "react";
import api from "../helpers/axiosInstance";
import { useParams } from 'react-router-dom';
import CommentForm from "../components/CommentForm";

function Post() {

	const {postId} = useParams();

	const [post, setPost] = useState('');
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchPost = async () => {
			setIsLoading(true);
			return await api.get(`/posts/${postId}`);
		};
		fetchPost().then(async res => {
			let comments = await api.get(`/posts/${postId}/comments`);
			setComments(comments.data);
			setPost(res.data);
			setIsLoading(false);
		});
	}, [postId]);

	const createComment = async (comment) => {
		try {
			let res = await api.post(`/posts/${postId}/comments`, {...comment});
			setComments([res.data, ...comments]);
			return res;
		} catch (e) {
			window.alert("Error Occurred!");
		}
	}

	if(isLoading)
		return (
		<div className="loader">
		</div>
	);

	return (
			<section>
				<div className="post">
					<h3 className="post-title">{post.title}</h3>
					<p>{post.body}</p>
					<div className="comments">
						<h3>Comments({comments.length})</h3>
						<CommentForm createComment={createComment}/>
						{
							comments.map((comment, index) => (
								<div className="comment" key={comment.name+index}>
									<h4>{comment.name}</h4>
									<p>{comment.body}</p>
									<p className="comment-email">- {comment.email}</p>
								</div>
							))
						}
					</div>
				</div>
			</section>
	);
}

export default Post;
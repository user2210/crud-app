import {useState} from 'react';

function CommentForm({createComment}) {

	const [comment, setComment] = useState({
		name: '',
		body: '',
		email: ''
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		createComment(comment).then(res => {
			window.alert("Comment added successfully");
			resetForm();
		});
	};

	const resetForm = () => {
		setComment({
			name: '',
			body: '',
			email: ''
		});
	};

	const handleChange = (e) => {
		e.persist();
		let value = e.target.value;
		let name = e.target.name;
		setComment((values) => ({
			...values, [name]: value
		}))
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="comment-form">
				<div className="fields">
					<input type="text" name="name" placeholder="Name"
					       value={comment.name} onChange={handleChange} required/>
					<input type="email" name="email" placeholder="Email"
					       value={comment.email} onChange={handleChange} required/>
				</div>
				<textarea className="comment-box" name="body" placeholder="Comment"
				          value={comment.body} onChange={handleChange} required>
				</textarea>
				<div style={{textAlign: 'right'}}>
					<button type="submit" style={{background: "#2ebf68"}}>
						Comment
					</button>
				</div>
			</div>
		</form>
	);
}

export default CommentForm;
import {useEffect, useState} from 'react';

function UserForm({userToEdit, createUser, updateUser}) {

	const [user, setUser] = useState({
		name: '',
		username: '',
		email: '',
		website: ''
	});

	useEffect(() => {
		if(userToEdit) {
			setUser(userToEdit);
		}
	}, [userToEdit]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if(user.name.length < 2) {
			return window.alert('Name must be 2 characters or more');
		}
		if(user.username.length < 5) {
			return window.alert('Username must be 3 characters or more');
		}
		if(userToEdit) {
			updateUser(user).then(() => {
				window.alert("User Updated Successfully");
				resetUserForm();
			});
			return;
		}
		createUser(user).then(res => {
			window.alert("User Created Successfully");
			resetUserForm();
		});
	};

	const resetUserForm = () => {
		setUser({
			name: '',
			username: '',
			email: '',
			website: ''
		});
	};

	const handleChange = (e) => {
		e.persist();
		let value = e.target.value;
		let name = e.target.name;
		setUser((values) => ({
			...values, [name]: value
		}))
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input type="text" name="name" placeholder="Name"
				       value={user.name} onChange={handleChange} required/>
				<input type="text" name="username" placeholder="Username"
				       value={user.username} onChange={handleChange} required/>
				<input type="email" name="email" placeholder="Email"
				       value={user.email} onChange={handleChange} required/>
				<input type="text" name="website" placeholder="Website"
				       value={user.website} onChange={handleChange} />
				<button type="submit" style={{background: "#2ebf68"}}>
					{userToEdit ? 'Update' : 'Create'}
				</button>
			</div>
		</form>
	);
}

export default UserForm;
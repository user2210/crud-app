import {useEffect, useState} from "react";
import api from "../helpers/axiosInstance";
import '../css/users.css';
import UserForm from "../components/UserForm";

function Users() {

	const [users, setUsers] = useState([]);
	const [userToEdit, setUserToEdit] = useState('');
	const [showForm, setShowForm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true);
			return await api.get(`/users`);
		};
		fetchUsers().then(res => {
			setUsers(res.data);
			setIsLoading(false);
			//console.log('response is: ' + res.data)
		});
		//console.log('fetch users : ' + fetchUsers())
	}, []);

	const createUser = async (user) => {
		try {
			let res = await api.post(`/users`, {...user});
			setUsers([res.data, ...users]);
			return res;
		} catch (e) {
			window.alert("Error Occurred!");
		}
	};

	const toggleForm = () => {
		setShowForm(!showForm);
	};

	const handleEditUser = user => {
		setShowForm(true);
		setUserToEdit(user);
	};

	const updateUser = async (user) => {
		try {
			await api.patch(`/users/${user.id}`, {...user});
			let filteredUsers = users.map(u => {
				if(u.id === user.id) {
					u = user;
				}
				return u;
			});
			setUsers(filteredUsers);
			setUserToEdit('');
			//setShowForm(false);
		} catch (e) {
			window.alert("Error Occurred!");
		}
	};

	const deleteUser = async (id) => {
		let isSure = window.confirm('Are you sure?');
		if(isSure) {
			try {
				await api.delete(`/users/${id}`);
				let filteredUsers = users.filter(user => user.id !== id);
				setUsers(filteredUsers);
			} catch (e) {
				window.alert("Error Occurred!");
			}
		}
	};

	if(isLoading)
		return (
			<div className="loader">
			</div>
		);

	return (
		<section className="users">
			<div className="header">
				<h3>Users</h3>
				<button onClick={toggleForm} style={{background: showForm ? '' : '#5488d6'}}>
					{showForm ? 'Close' : 'Add User'}
				</button>
			</div>
			{
				showForm && <UserForm createUser={createUser} updateUser={updateUser} userToEdit={userToEdit}/>
			}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Website</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						users.map((user, index) => (
							<tr key={user.id + '-' + index}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>{user.website}</td>
								<td>
									<button style={{background: "#0072ff"}} onClick={() => handleEditUser(user)}>Edit</button>
									<button style={{background: "#ff3e3e"}} onClick={() => deleteUser(user.id)}>Delete</button>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</section>
	);
}

export default Users;
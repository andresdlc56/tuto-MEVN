<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <a class="navbar-brand" href="#">Navbar</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>

		  <div class="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul class="navbar-nav mr-auto">
		      <li class="nav-item active">
		        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Link</a>
		      </li>
		      <li class="nav-item dropdown">
		        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		          Dropdown
		        </a>
		        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
		          <a class="dropdown-item" href="#">Action</a>
		          <a class="dropdown-item" href="#">Another action</a>
		          <div class="dropdown-divider"></div>
		          <a class="dropdown-item" href="#">Something else here</a>
		        </div>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
		      </li>
		    </ul>
		    <form class="form-inline my-2 my-lg-0">
		      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
		      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
		    </form>
		  </div>
		</nav>

		<div class="container">
			<div class="row pt-5">
				<div class="col-md-5">
					<div class="card">
						<div class="card-body">
							<form @submit.prevent="sendTask()">
								<div class="form-group">
									<input type="text" name="" placeholder="Insertar Tarea" v-model="task.title" class="form-control">
								</div>

								<div class="form-group">
									<textarea cols="30" rows="10" class="form-control" v-model="task.description" placeholder="Insetar Descripción"></textarea>
								</div>
								<template v-if="!edit">
									<button class="btn btn-primary btn-block">Save</button>
								</template>
								<template v-else>
									<button class="btn btn-primary">Update</button>
									<button class="btn btn-success">Cancelar</button>
								</template>
							</form>
						</div>
					</div>
				</div>

				<div class="col-md-7">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>Task</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="task of tasks">
								<td>{{ task.title }}</td>
								<td>{{ task.description }}</td>
								<td>
									<button @click="deleteTask(task._id)" class="btn btn-danger btn-sm">
										Delete
									</button>
									<button @click="editTaks(task._id)" class="btn btn-secondary btn-sm">
										Edit
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	class Task {
		constructor(title, description) {
			this.title = '',
			this.description = ''
		}
	}

	export default {
		data() {
			return {
				task: new Task(),
				tasks: [],
				edit: false,
				taskToEdit: ''
			}
		}, 
		created() {
			this.getTasks();
		},
		methods: {
			getTasks() {
				fetch('/api/tasks')
					.then(res => res.json())
					.then(data => {
						this.tasks = data;
						console.log(this.tasks);
						this.task = new Task();
					});
			},

			sendTask() {
				if(this.edit === false) {
					fetch('/api/tasks', {
						method: 'POST',
						body: JSON.stringify(this.task),
						headers: {
							'Accept': 'application/json',
							'Content-type': 'application/json'
						} 
					}).then(res => {
						res.json(console.log(res));
					}).then(data => {
						this.getTasks();
					})
					this.task = new Task();
				} else {
					fetch('/api/tasks/' + this.taskToEdit, {
						method: 'PUT',
						body: JSON.stringify(this.task),
						headers: {
							'Accept': 'application/json',
							'Content-type': 'application/json'
						}
					}).then(res => res.json(res))
					.then(data => {
						this.edit = false;
						this.getTasks();
					});
				}
			},

			deleteTask(id) {
				fetch('/api/tasks/' + id, {
					method: 'DELETE', 
					headers: {
						'Accept': 'application/json',
						'Content-type': 'application/json'
					}
				}).then(res => res.json(res))
				.then(data => {
					this.getTasks();
				});
			},

			editTaks(id) {
				fetch('/api/tasks/' + id)
					.then(res => res.json(res))
					.then(data => {
						this.task = data;
						this.taskToEdit = data._id; 
						this.edit = true;
					});
			}
		}
	}
</script>
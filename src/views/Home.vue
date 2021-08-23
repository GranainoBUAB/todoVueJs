<template>
  <div class="home">
    <h1 class="fw-bolder text-decoration-underline">{{ sizeDB }} - Task</h1>
    <p>El número de tareas es: {{ counter }}</p>

    Add Task new ->
    <input type="text" v-model="tareasTitulo" @keyup.enter="addTareas" />
    Filter ->
    <input type="text" v-model="filtrosTitulo" @keyup.enter="filtrosTareas" />
    <button @click="index">clear filter</button>

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tarea of tareas" :key="tarea.id">
          <th>
            <div class="form-check">
              <input
                class="form-check-input float-end"
                type="checkbox"
                v-model="tarea.isFinished"
                id="flexCheckDefault"
                @change="updateTask(tarea)"
              />
            </div>
          </th>
          <td>{{ tarea.content }}</td>
          <td><button @click="updateTitleTask(tarea)">🔍</button></td>
          <td><button @click="deleteTask(tarea.id)">🚮</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from '@/components/HelloWorld.vue' */
import axios from "axios";
import { taskService } from "@/services/taskService";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    /* HelloWorld */
  },
  data() {
    return {
      tareas: [],
      tareasTitulo: "",
    };
  },
  created() {
    this.index();
  },
  methods: {
    async index() {
      /* const response = await taskService.getAll();  */
      
      const response = await axios.get(`http://localhost:3001/api/todo`);
      this.tareas = response.data;
      
    },
    async filtrosTareas() {
      const response = await axios.get(`http://localhost:3000/tareas/?q=`+this.filtrosTitulo);
      this.tareas = response.data;
    },
    async addTareas() {
      const response = await axios.post(`http://localhost:3000/tareas`, {
        titulo: this.tareasTitulo,
        finished: false,
      });
      this.tareasTitulo = "";
      /* this.$store.commit([ADD_TASK]);   */
      this.index();
    },

    async deleteTask(id) {
      const response = await axios.delete(`http://localhost:3000/tareas/${id}`);
      /* const response = await taskService.deleteTask(id);  */
      this.tareas = response.data;
      this.store.commit('DELETE_TASK');
      this.index();
    },

    async updateTask(tarea) {
      var data = {
        id: tarea.id,
        titulo: tarea.titulo,
        finished: tarea.finished,
      };

      const response = await axios.put(
        `http://localhost:3000/tareas/${tarea.id}`,
        data
      );
      this.tareas = response.data;
      this.index();
    },

    async updateTitleTask(tarea) {
      let titulo = tarea.titulo;

      await Swal.fire({
        title: "Edit Title",
        html: '<input id="titulo" value="' + titulo + '" type="text">',
        focusConfirm: false,
        showCancelButton: true,
      }).then((result) => {
        (tarea.titulo = document.getElementById("titulo").value),
          console.log(tarea.titulo);
        updateTask(tarea);
      });
    },
  },
  computed: {
    ...mapState(["counter"]),
    sizeDB: function() {
      return this.tareas.length;
    },
  },
};
</script>

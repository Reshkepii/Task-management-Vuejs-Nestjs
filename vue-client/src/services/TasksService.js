import helper from '../helper'

export default {

    fetchTasks() {
        return helper().get('tasks')
    },

    addTasks(data) {
        return helper().post('tasks',data)
    },

    updateTasks(data) {
        return helper().put('tasks/'+ data.id, data)
    },

    getTasks(data) {
        return helper().get('tasks/'+ data.id)
    },

    deleteTasks(data) {
        return helper().delete('tasks/'+ data.id)
    }
}
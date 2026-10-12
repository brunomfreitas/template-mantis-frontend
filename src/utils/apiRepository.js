// eslint-disable-next-line import/no-anonymous-default-export
export default (axios) => (resource) => ({
    index() {
        return axios.get(`/${resource}`);
    },
    show(id) {
        return axios.get(`/${resource}/` + id);
    },
    store(obj) {
        return axios.post(`/${resource}`, obj);
    },
    update(id, obj) {
        return axios.put(`/${resource}/` + id, obj);
    },
    destroy(id) {
        return axios.delete(`/${resource}/` + id);
    }
});

import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: false,
});

api.interceptors.request.use(

  (config) => {
    

      let local_token = localStorage.getItem("token");
    
console.log(local_token);

        config.headers.Authorization = `Bearer ${local_token}`;
     

    return config;
  },
  (error) => Promise.reject(error)
);




class TestApi {

  
  static getAllQuizzes() {
    return api.get("/test/quizzes");
  }

  
  static getQuizById(id) {
    return api.get(`/test/quiz/${id}`);
  }

  
  static getPaginatedQuizzes(page = 0, size = 10) {
    return api.get("/test/quizzes/paged", {
      params: { page, size }
    });
  }

  static getAllResults() {
    return api.get("/result/results");
  }

  //fetch results for a specific user
  static getUserResults(id) {
    return api.get(`/result/user/${id}`);
  }
  static getUserResultsPaginated(page) {
    return api.get(`/result?page=${page}&size=10`);
  }


 static getResult(data) {
    return api.post("/result/submit",data);
  }
  
  static getResultById(id) {
    return api.get(`/result/${id}`);
  }
}

export default TestApi;
// localStorage.setItem("token", response.data.token);

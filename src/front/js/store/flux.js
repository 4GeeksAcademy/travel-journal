const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,			
			countries:[],
			selectedCountry: '',
			posts:[],
			filteredPosts:[],				

		},
		actions: {
			getPosts: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/getPosts`);
					const data = await response.json();
					setStore({ posts: data, filteredPosts: data });
					console.log(data);					
				} catch (error) {
					console.error("Error fetching posts:", error);
					
				}
			},
			getCountries: async () => {
				try {
					const response = await fetch("https://restcountries.com/v3.1/all");
					const data = await response.json();
					setStore({ countries: data });
					console.log(data);					
				} catch (error) {
					console.error("Error fetching countries:", error);
					
				}
			},
			setSelectedCountry: (country) => {
                setStore({ selectedCountry: country });
				getActions().filterPostsByCountry();
            },
			filterPostsByCountry: () => {
                const store = getStore();
                const filteredPosts = store.posts.filter(post => 
                    store.selectedCountry === '' || post.country === store.selectedCountry
                );
                setStore({ filteredPosts });
            },
			//add a post
			addAPost: async(title, description, country, image) =>{
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/addPost`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						},
						body: JSON.stringify({title, description, country, image, user_id: 1})
						// he puesto user_id 1 para que funcione de momento, debera ser el id del usuario logado
					});
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.message || "Error adding post")
					}

					const newPost = await response.json();
					setStore({ posts: [...store.posts, newPost.post] });
					return { success: true, post: newPost.post };
					
				} catch (error) {
					console.error("Error adding post:", error);
					return { success: false, message: error.message };					
				}
			},
			//add a post
			// Use getActions to call a function within a fuction
			
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            

			loginUser : async (formData) => {
				const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});
		   
				if(!response.ok) throw Error("Error en el Login")
		   
				if(response.status === 401){
					 throw("Credenciales inválidas")
				}
				else if(response.status === 400){
					 throw ("Contraseña incorrecta")
				}
				const data = await response.json()
				localStorage.setItem("jwt-token", data.token);
		   
				return data
		   },

			getMyTasks : async () => {
				// Recupera el token desde la localStorage
				const token = localStorage.getItem('jwt-token');
		
				const resp = await fetch(`https://automatic-system-rq66vjwx5w635v45-3001.app.github.dev/api/protected`, {
				method: 'GET',
				headers: { 
					"Content-Type": "application/json",
					'Authorization': 'Bearer ' + token // authorization token
				} 
				});
		
				if(!resp.ok) {
					throw Error("There was a problem in the login request")
				} else if(resp.status === 403) {
					throw Error("Missing or invalid token");
				} else {
					throw Error("Unknown error");
				}
		},

	   registerUser : async (formData) => {
		try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
	
			if (response.ok) {
				return { success: true };
			} else {
				const errorData = await response.json();
				return { success: false, message: errorData.message };
			}
		} catch (error) {
			return { success: false, message: "Error en la solicitud" };
		}
	},
	
        }
    };
};
export default getState;
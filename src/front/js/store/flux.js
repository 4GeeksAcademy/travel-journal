const getState = ({ getStore, getActions, setStore }) => {
	let user = null;
    try {
        const userFromStorage = localStorage.getItem('user');
        if (userFromStorage) {
            user = JSON.parse(userFromStorage);
        }
    } catch (error) {
        console.error("Error parsing user from localStorage", error);
        localStorage.removeItem('user'); 
    }
	return {
		store: {
			user: user, 
            token: localStorage.getItem('jwt-token'),
            message: null,
            countries: [],
            selectedCountry: '',
            posts: [],
            filteredPosts: []			

		},
		actions: {
			editPost: async (postId, updatedPost) => {
                try {
                    const token = localStorage.getItem('jwt-token');
                    const response = await fetch(`${process.env.BACKEND_URL}/api/editPost/${postId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedPost)
                    });

                    if (response.ok) {
                        const data = await response.json();
                        return { success: true, post: data.post };
                    } else {
                        const errorData = await response.json();
                        return { success: false, message: errorData.message };
                    }
                } catch (error) {
                    console.error("Error editing post:", error);
                    return { success: false, message: "Error editing post" };
                }
            },
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
						body: JSON.stringify({title, description, country, image, user_id: store.user.id})						
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
				localStorage.setItem("jwt-token", data.access_token);
				localStorage.setItem("user",JSON.stringify(data.user));
				setStore({ user: data.user }); // linea añadida por edu
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
		// Acciones para actualizar el usuario y subir imágenes
		
		
		uploadProfileImage: async (imageUrl) => {
			try {
			  const token = localStorage.getItem("jwt-token"); // Obtén el token JWT
			  const response = await fetch(`${process.env.BACKEND_URL}/api/upload_profile_image`, {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				  'Authorization': 'Bearer ' + token  // Agrega el token en los headers
				},
				body: JSON.stringify({ image_url: imageUrl }),
			  });
			  const data = await response.json();
			  return data;
			} catch (error) {
			  console.error("Error uploading image:", error);
			  return { message: 'Error uploading image.' };
			}
		  },
		  updateUser: async (userId, username) => {
			try {
			  const token = localStorage.getItem("jwt-token"); // Obtén el token JWT
			  const response = await fetch(`${process.env.BACKEND_URL}/api/update_user`, {
				method: "PUT",
				headers: {
				  "Content-Type": "application/json",
				  'Authorization': 'Bearer ' + token  // Agrega el token en los headers
				},
				body: JSON.stringify({ id: userId, username }),
			  });
			  const data = await response.json();
			  return data;
			} catch (error) {
			  console.error("Error updating user:", error);
			  return { message: 'Error updating user.' };
			}
		  },
		}
	  };
	};
	
	export default getState;
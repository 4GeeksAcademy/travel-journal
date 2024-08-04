const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			message: null,
			userImage: localStorage.getItem("userImage") || '../../img/default-image.jpg',
			demo: [
				{
					
					
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			countries:[],
			selectedCountry: '',

			postExample: [
				{
					id: "1",
					image: "https://viajes.nationalgeographic.com.es/medio/2022/02/15/vinicunca_cfd431f8_800x800.jpg",
					text: "La Montaña de Colores, también conocida como Vinicunca o Montaña Arcoíris, es uno de los paisajes más impresionantes del Perú. Ubicada en la región de Cusco, esta maravilla natural se encuentra a más de 5,000 metros sobre el nivel del mar y es famosa por sus vibrantes franjas de colores que parecen pintadas. Los tonos rojos, amarillos, verdes y azules que adornan la montaña son el resultado de minerales depositados a lo largo de millones de años. Este destino se ha convertido en un lugar imprescindible para los aventureros y amantes de la naturaleza, ofreciendo vistas panorámicas espectaculares y una experiencia única que conecta a los visitantes con la majestuosidad de los Andes peruanos",
					pais: "Peru",
					autor: "Pedro"
				},
				{
					id: "2",
					image: "https://www.eleconomista.com.mx/__export/1679363518600/sites/eleconomista/img/2023/03/20/finlandia_auroras_boreales_reuters.jpg_423682103.jpg",
					text: "Disfruta de la magia de las auroras boreales en Finlandia. Este fenómeno natural ilumina el cielo con impresionantes luces verdes y rosadas, creando una experiencia inolvidable en el corazón del invierno finlandés. Perfecto para los amantes de la naturaleza y la aventura.",
					pais: "Finland",
					autor: "Maria"
				},
				{
					id: "3",
					image: "https://elcomercio.pe/resizer/9h5JgBRT0YvnFbtgXCluI6iIT5g=/1200x1200/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/ZIM73X76WJHC5HOC4WV6OWIS7M.jpg",
					text: "Viviendo el sueño en Egipto. Mis pies descansan en la arena mientras la majestuosa Pirámide de Giza se alza en el horizonte. Un momento de paz en medio de la historia antigua.",
					pais: "Egipt",
					autor: "Alberto"
				},
				{
					id: "4",
					image: "https://www.bontur.com/wp-content/uploads/elementor/thumbs/experiencia-especial-safari-etosha-namibia-bontur-1-phgsvqtu34mst0hd423ksxznliuaueeq4bt7nk937s.jpeg",
					text: "Cebras al atardecer en Namibia. Las siluetas de estos majestuosos animales se destacan contra el cielo naranja, creando una escena de serenidad en la sabana africana.",
					pais: "Namibia",
					autor: "Sandra"
				},
				{
					id: "5",
					image: "https://www.eleconomista.com.mx/__export/1550170401746/sites/eleconomista/img/2019/02/14/agra_01.jpg_423682103.jpg",
					text: "El Taj Mahal es impresionante, pero India no era lo que esperaba. A veces, el viaje no cumple con las expectativas, aunque los monumentos sean espectaculares.",
					pais: "India",
					autor: "Alvaro"
				},
				{
					id: "6",
					image: "https://www.mundoasiatours.com/wp-content/uploads/2018/07/angkor-wat-88.jpg",
					text: "Primer viaje a los 45 años y estoy en Angkor Wat. Este lugar es increíble, una experiencia que nunca imaginé vivir. La majestuosidad de los templos es realmente impresionante. ¡Nunca es tarde para empezar a explorar el mundo!",
					pais: "Cambodia",
					autor: "Luis"
				},
				{
					id: "7",
					image: "https://www.travelwithpau.com/wp-content/uploads/2018/08/krakow.png",
					text: "Explorando Cracovia por primera vez. La ciudad tiene un encanto único con sus calles empedradas y edificios históricos. Cada rincón cuenta una historia, y no puedo esperar para descubrir más de esta hermosa ciudad.",
					pais: "Poland",
					autor: "Clara"
				},
				{
					id: "8",
					image: "https://miro.medium.com/v2/resize:fit:512/1*bTfzOj8zUtFAHMhpDzAyRg@2x.jpeg",
					text: "La combinación de la arquitectura tradicional con el paisaje invernal crea una escena mágica y tranquila. La nieve cubriendo el templo ofrece una perspectiva única y serena del espíritu mongol.",
					pais: "Mongolia",
					autor: "Mercedes"
				},
				{
					id: "9",
					image: "https://i.pinimg.com/564x/eb/45/24/eb4524faf09b2ea647eb53198d5519e9.jpg",
					text: "Las terrazas de arroz en China son un espectáculo impresionante. Las capas verdes y perfectamente alineadas se extienden por las colinas, creando un paisaje de ensueño que refleja la belleza y la habilidad de la agricultura tradicional china.",
					pais: "China",
					autor: "Marta"
				},
				{
					id: "10",
					image: "https://1millondeaventuras.home.blog/wp-content/uploads/2019/05/vale.jpeg?resize=704%2C704",
					text: "Palmas de cera en el Valle de Cocora. Estas majestuosas palmas, las más altas del mundo, se elevan entre la bruma y el verdor del valle, creando un paisaje surrealista y memorable. Un lugar único que captura la esencia de la belleza natural colombiana.",
					pais: "Colombia",
					autor: "Nuria"
				}
			],

		},

		


		actions: {
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
            },
			filterPostsByCountry: () => {
                const store = getStore();
                const filteredPosts = store.postExample.filter(post => 
                    store.selectedCountry === 'All' || post.pais === store.selectedCountry
                );
                setStore({ filteredPosts });
            },
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

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

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
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
				localStorage.setItem("userImage", data.user.image);
				localStorage.setItem("user",JSON.stringify(data.user))
				setStore({ user: data.user, userImage: data.user.image });  // Guardar en el store
				return data;
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
		
		logout: () => {
			localStorage.removeItem("jwt-token");
			localStorage.removeItem("userImage");
			localStorage.removeItem("user");
			setStore({ user: null, userImage: defaultImage });  // Resetear el store
			navigate('/login');
		},
		
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
			  if (data.image_url) {
				localStorage.setItem("userImage", data.image_url); // Guardar imagen en localStorage
				setStore({ userImage: data.image_url }); // Actualizar el estado global
			}
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
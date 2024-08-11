  import { useState } from "react";
  import { useNavigate } from "react-router-dom";

  export const Login = () => {
    const [user, setUser] = useState({
      email: "",
      password: "",
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      setUser({
        ...user,
        [name]: value,
      });
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:8000/api/auth/login` , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          credentials: "include",
        }) 

        if (response.ok) {
          setUser({
            email: "",
            password: "",
          });
          navigate('/')
        }
        console.log(response);
        

      } catch (error) {
        console.log(error);
        
      }
    };

    return (
      <>
        <section className="bg-gray-100 py-8">
          <main>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center items-center">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  className="max-w-full h-auto"
                />
              </div>
              <div className="bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-6">Login Form</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-gray-700">
                      email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                      className="mt-1 p-2 block w-full border rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Password"
                      className="mt-1 p-2 block w-full border rounded-md"
                    />
                  </div>
                  <div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                      Login Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </section>
      </>
    );
  };

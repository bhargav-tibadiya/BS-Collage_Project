// import { useState } from "react";
// import Cookies from "js-cookie";

// export const Contact = () => {
//   const [contact, setContact] = useState({
//     username: "",
//     email: "",
//     message: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = Cookies.get("token");
//       if (token) {
//         const response = await fetch(`http://localhost:8000/api/form/content`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setContact((prevContact) => ({
//             ...prevContact,
//             username: data.user.username,
//             email: data.user.email,
//           }));
//         }
//       }
//     };
//     fetchUserData();
//   }, []);

//   return (
//     <>
//       <section className="bg-gray-100 py-8">
//         <div className="container mx-auto text-center mb-8">
//           <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
//         </div>
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <div className="flex justify-center">
//             <img
//               src="/images/support.png"
//               alt="we are always ready to help"
//               className="max-w-full h-auto"
//             />
//           </div>
//           <div className="bg-white p-8 shadow-lg rounded-lg">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="username" className="block text-gray-700">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   autoComplete="off"
//                   value={contact.username}
//                   onChange={handleInput}
//                   required
//                   className="mt-1 p-2 block w-full border rounded-md"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   autoComplete="off"
//                   value={contact.email}
//                   onChange={handleInput}
//                   required
//                   className="mt-1 p-2 block w-full border rounded-md"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="message" className="block text-gray-700">
//                   Message
//                 </label>
//                 <textarea
//                   name="message"
//                   id="message"
//                   autoComplete="off"
//                   value={contact.message}
//                   onChange={handleInput}
//                   required
//                   cols="30"
//                   rows="6"
//                   className="mt-1 p-2 block w-full border rounded-md"
//                 ></textarea>
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };








































import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (token) {
        const response = await fetch(`http://localhost:8000/api/form/content`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setContact((prevContact) => ({
            ...prevContact,
            username: data.user.username,
            email: data.user.email,
          }));
        }
      }
    };

    fetchUserData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/form/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Message sent successfully!");
      setContact({
        username: "",
        email: "",
        message: "",
      });
    } else {
      alert(`Error: ${data.message}`);
    }
  };

  return (
    <>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src="/images/support.png"
              alt="we are always ready to help"
              className="max-w-full h-auto"
            />
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                  className="mt-1 p-2 block w-full border rounded-md"
            
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                  className="mt-1 p-2 block w-full border rounded-md"

                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                  className="mt-1 p-2 block w-full border rounded-md"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

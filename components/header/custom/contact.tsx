"use client";
import { useContext } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeaderContext } from "../header-context";
import ContactForm from "./contact-form";

const Contact = () => {
  const { toggled } = useContext(HeaderContext);

  return (
    <>
      <div
        className={`flex md:hidden justify-center bg-primary w-full ${
          toggled ? "block" : ""
        }`}
      >
        <div className={`w-[90%] py-4 ${toggled ? "" : "hidden"}`}>
          <h2 className='text-white text-center text-xl font-light font-serif'>
            {toggled ? "Close" : "Contact Us"}
          </h2>
        </div>
      </div>
      <div
        className={`flex justify-center w-full absolute top-full transition-all duration-300 ease-in-out ${
          toggled
            ? "z-0 min-h-[50vh] max-h-[100vh] opacity-100 translate-y-0"
            : "z-[-999] min-h-0 max-h-0 opacity-0 -translate-y-[100vh]"
        } bg-[#fbfbfb]`}
      >
        <div
          className={`w-full grid grid-cols-2 transition-all duration-300 ease-in-out ${
            toggled ? "" : "hidden"
          }`}
        >
          <div
            className={`hidden md:flex flex-row justify-center items-center w-full `}
          >
            <div className='flex flex-col justify-center h-full w-1/2'>
              <h2 className='text-[#707070] text-3xl my-2'>Broad Vision.</h2>
              <h2 className='text-[#707070] text-3xl my-2'>Careful Thought.</h2>
              <h2 className='text-[#707070] text-3xl my-2'>
                Handcrafted Design.
              </h2>
            </div>
          </div>

          <div
            className={`flex flex-col items-center justify-center h-full w-full bg-primary md:${
              toggled ? "flex" : "hidden"
            }`}
          >
            <ContactForm />
          </div>
        </div>
      </div>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  );
};

export default Contact;

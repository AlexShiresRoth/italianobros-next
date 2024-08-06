"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeaderContext } from "../header-context";
import ContactForm from "./contact-form";

const Contact = () => {
  const { toggled, mobileMenuToggled } = useContext(HeaderContext);

  return (
    <>
      <AnimatePresence>
        {toggled && !mobileMenuToggled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`flex justify-center w-full bg-[#fbfbfb] min-h-[50vh] absolute top-full`}
          >
            <div className={`w-full grid grid-cols-1 md:grid-cols-2`}>
              <div
                className={`hidden md:flex flex-row justify-center items-center w-full `}
              >
                <div className='flex flex-col justify-center h-full w-1/2'>
                  <h2 className='text-[#707070] text-3xl my-2'>
                    Broad Vision.
                  </h2>
                  <h2 className='text-[#707070] text-3xl my-2'>
                    Careful Thought.
                  </h2>
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
          </motion.div>
        )}
      </AnimatePresence>
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

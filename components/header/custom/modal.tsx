import Image from "next/image";
import React from "react";

// Define types for props
interface ModalProps {
  modalCase: boolean;
  status: "success" | "error" | "hidden";
  response?: string;
  onClick: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  modalCase,
  status,
  response,
  onClick,
}) => {
  const styles = {
    height: "5rem",
    margin: "2rem",
  };

  const modalClassNames =
    "flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full z-[99999999] bg-transparent";
  const containerClassNames =
    "min-h-[50vh] min-w-[70vw] p-4 text-center z-[99999999] flex flex-col items-center justify-center bg-white rounded-lg shadow-lg opacity-100 transition-all duration-200 ease-in-out";
  const buttonClassNames =
    "border-2 border-[#f7b500] bg-[#f7b500] transition-all duration-200 ease-in-out uppercase font-medium h-12 w-1/5 mx-8 text-white hover:bg-[#e1a800] cursor-pointer";

  if (status === "success" && modalCase) {
    return (
      <div className={modalClassNames}>
        <div className={`${containerClassNames} text-green-500`}>
          <figure style={styles}>
            <Image
              width={100}
              height={100}
              src='https://res.cloudinary.com/snackmanproductions/image/upload/v1568323268/italianobros/logos/Black_s394t0.png'
              alt='Logo'
            />
          </figure>
          <h2 className='text-2xl'>
            Thank you! Your message has been sent, and someone will be in
            contact with you soon.
          </h2>
          <button className={buttonClassNames} onClick={onClick}>
            Close
          </button>
        </div>
      </div>
    );
  }

  if (status === "error" && modalCase) {
    return (
      <div className={modalClassNames}>
        <div className={`${containerClassNames} text-red-500`}>
          <figure style={styles}>
            <Image
              width={100}
              height={100}
              src='https://res.cloudinary.com/snackmanproductions/image/upload/v1568323268/italianobros/logos/Black_s394t0.png'
              alt='Logo'
            />
          </figure>
          <h2 className='text-2xl'>{response}.</h2>
          <h2 className='text-2xl'>Please retry sending the email.</h2>
          <button className={buttonClassNames} onClick={onClick}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return null;
};

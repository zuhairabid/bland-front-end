import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";

const RequestDemoForm = () => {
  // Component state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    role: "",
    useCase: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Updates the form's state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendPhoneCall();
  };

  // Pings the backend to send a phone call
  const sendPhoneCall = async () => {
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:4000/request-demo", formData);
      toast("Phone call sent!", { type: "success" });
    } catch (error) {
      toast("Error dispatching phone call!", { type: "error" });
    }
    setIsSubmitting(false);
  };

  // Styling
  const inputStyle =
    "mt-1 block w-full border-gray-200 border px-4 focus:border-gray-700 focus:outline-none py-1.5 rounded";
  const labelStyle = "text-black text-sm font-medium";

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-3 px-2 bg-white rounded-lg'
    >
      <ToastContainer />

      <button
        type='submit'
        className='mt-4 bg-gray-800 hover:bg-black text-white font-medium py-2 px-4 rounded shadow-lg transform transition duration-200 flex justify-center items-center'
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <Oval
            height={16}
            width={16}
            color='#fff'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor='#fefefe'
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
        )}

        <span className='ml-2'>Request Demo</span>
      </button>
    </form>
  );
};

export default RequestDemoForm;

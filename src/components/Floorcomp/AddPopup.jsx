import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {  toast } from "react-toastify";

function AddFloor() {
  let [isOpen, setIsOpen] = useState(false);
  const [floor , setFloor]= useState("");
  const handleFloorChange = (e) => {
    setFloor(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
        try{
        const request = await axios.post("http://localhost:5028/api/Floor", { 
            nom:floor
         });
    
        if(request.status ===200){
            setFloor("");
            toast.success('🦄 Floor add succeful', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
            closeModal();
        }else{
          toast.error('error', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
         
        }
        }catch(error){
            console.log("Error", error)
        }
    }
    
   
  function closeModal() {
    setIsOpen(false);
    window.location.reload(false);

  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="mx-40 mt-8">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-[#111827] px-4 py-2 text-sm font-medium text-white hover:bg-[#111827] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 flex flex-row items-center"
        >
          <IoAddSharp /> Add Floor
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Floor
                  </Dialog.Title>
                  <div className="mt-6 pt-5 flex items-center justify-center ml-4">
                    <TextField
                      required
                      id="outlined-required"
                      label="Floor"
                      defaultValue={floor}
                      onChange={handleFloorChange}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-around">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit }
                    >
                      Confirme
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddFloor;

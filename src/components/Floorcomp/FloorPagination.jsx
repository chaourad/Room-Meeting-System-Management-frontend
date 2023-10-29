import { TextField } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
function FloorPagination() {
  const [floor, setFloor] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectid, setSelectid] = useState();

  const [selectitem, setSelectitem] = useState({});

  useEffect(() => {
    try {
      axios.get("http://localhost:5028/api/Floor").then((response) => {
        setFloor(response.data);
      });
    } catch (error) {
      console.log("Error", error);
    }
  }, []);
  const handleFloorChange = (e) => {
    setSelectitem(e.target.value);
  };
  function closeModal() {
    setIsOpen(false);
    window.location.reload(false);
  }

  function openModal(id) {
    const selectedFloor = floor.find((v) => v.id === id);

    setIsOpen(true);
    setSelectitem(selectedFloor);
    setSelectid(id);
  }

  const handleEdite = async () => {
    try {
      const request = await axios.put(
        `http://localhost:5028/api/Floor/Update/${selectid}`,
        {
          nom: selectitem,
        }
      );
      console.log(request.status);
      if (request.status === 200) {
        toast.success("Modification effectuée avec succés");
        closeModal();
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this floor?")) {
      const request = axios
        .delete(`http://localhost:5028/api/Floor/Delete/${id}`)
        .then(() => {
          setFloor(floor.filter((v) => v.id !== id));
        });
      console.log(request.status);
      if (request.status === 200) {
        toast.success("🦄 Floor bien supprimer", {
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
    }
  };

  return (
    <div className="mx-40 mt-8">
 
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h2  className="font-bold text-xl">Liste of floor</h2>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Floor Name
              </th>

              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {floor.map((v, index) => (
              <tr
                key={index}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="px-6 py-4">{v.nom}</td>

                <td class="px-2 py-4 flex flex-row items-center ">
                  <div className="pl-6 pr-4 text-white">
                    <button onClick={() => openModal(v.id)}>Edit</button>
                  </div>
                  <div className="pl-6 pr-4 text-red-600">
                    <button onClick={() => handleDelete(v.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          class="flex items-center justify-between pt-4 pb-2"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul class="inline-flex -space-x-px text-sm h-8">
            <li>
              <a
                href="/admin"
                class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="/admin"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="/admin"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="/admin"
                aria-current="page"
                class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="/admin"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="/admin"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="/admin"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
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
                      defaultValue={selectitem.nom}
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
                      onClick={handleEdite}
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
    </div>
  );
}

export default FloorPagination;

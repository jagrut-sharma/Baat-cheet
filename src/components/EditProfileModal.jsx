/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import * as Label from "@radix-ui/react-label";
import { AiFillEdit } from "react-icons/ai";
import AvatarEle from "./AvatarEle";

export default function EditProfileModal() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="hidden rounded-xl bg-blue-600 p-2 py-1 font-bold text-white hover:bg-opacity-80 dark:bg-blue-500 dark:hover:opacity-80 md:block"
        >
          Edit Profile
        </button>

        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-blue-600 p-2 py-1 font-bold text-white hover:bg-opacity-80 dark:bg-blue-500 dark:hover:opacity-80 md:hidden"
        >
          <AiFillEdit />
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
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[1px]" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-700">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-50"
                  >
                    Edit Profile
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex">
                      <AvatarEle
                        imgLink="random"
                        firstName={"jagrut"}
                        lastName={"sharma"}
                      />

                      <p className="item ml-2 flex flex-col justify-center dark:text-gray-50 md:ml-0">
                        {"Jagrut" + " " + "Sharma"}
                        <span className="text-[small]">{`test@123`}</span>
                      </p>
                    </div>

                    <div className="mt-3 flex flex-col flex-wrap gap-[5px]">
                      <Label.Root
                        className="text-[15px] font-medium text-black dark:text-slate-50"
                        htmlFor="bio"
                      >
                        Bio:
                      </Label.Root>
                      <input
                        className="inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-gray-100 px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-gray-800 outline-none focus:shadow-[0_0_0_2px_black] dark:bg-gray-500 dark:text-slate-50 dark:shadow-blue-300"
                        type="text"
                        id="bio"
                      />
                    </div>

                    <div className="mt-3 flex flex-col flex-wrap gap-[5px]">
                      <Label.Root
                        className="text-[15px] font-medium text-black dark:text-slate-50"
                        htmlFor="website"
                      >
                        Website:
                      </Label.Root>
                      <input
                        className="inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-gray-100 px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-gray-800 outline-none focus:shadow-[0_0_0_2px_black] dark:bg-gray-500 dark:text-slate-50 dark:shadow-blue-300"
                        type="text"
                        id="website"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Update
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

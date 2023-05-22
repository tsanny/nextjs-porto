import React, { useState } from "react";
import Modal from "./Modal";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className="sticky top-0 w-full left-0 bg-inherit flex items-center justify-between p-4 border-b border-solid border-white">
        <h1 className="text-3xl sm:text-2xl select-none">
          Sulthan Fathur&apos;s Portofolio
        </h1>
      </div>
    </>
  );
}

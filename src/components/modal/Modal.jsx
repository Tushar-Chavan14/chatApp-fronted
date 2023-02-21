export const Modal = ({ shouldShow, onRequestClose, children }) => {
  return shouldShow ? (
    <div
      className=" fixed flex items-center justify-center z-[1]  w-full h-full overflow-auto bg-black/50"
      onClick={onRequestClose}
    >
      <div
        className=" bg-bgColor dark:bg-bgDarkColor p-5 w-3/4 md:w-2/6 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onRequestClose} className="text-xl" >x</button>
        {children}
      </div>
    </div>
  ) : null;
};

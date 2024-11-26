// import { useState } from "react";
// import { motion } from "framer-motion";

// const Navigation = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false)
//   return (
//     <>
//       <motion.div
//         data-collapsed={isCollapsed}
//         className="flex flex-col space-y-2 w-[--width] p-2"
//         animate={{
//           "--width": isCollapsed ? "3.5rem" : "16rem"
//         }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//       >
//         <motion.div
//           className="w-10 h-10 p-2 bg-zinc-700/20 rounded-md hover:bg-zinc-500 cursor-pointer"
//           onClick={() => setIsCollapsed(!isCollapsed)}
//         >
//           <span></span>
//         </motion.div>
//         <motion.div
//           className="w-full h-10 p-2 bg-zinc-700/20 rounded-md"
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//         >
//           <span></span>
//         </motion.div>
//         <motion.div
//           className="w-full h-10 p-2 bg-zinc-700/20 rounded-md"
//         >
//           <span></span>
//         </motion.div>
//         <motion.div
//           className="w-full h-10 p-2 bg-zinc-700/20 rounded-md"
//         >
//           <span></span>
//         </motion.div>
//         <motion.div
//           className="w-full h-10 p-2 bg-zinc-700/20 rounded-md"
//         >
//           <span></span>
//         </motion.div>
//         <motion.div
//           className="w-full h-10 p-2 bg-zinc-700/20 rounded-md"
//         >
//           <span></span>
//         </motion.div>
//         <motion.div
//           className="w-full h-10 p-2 bg-zinc-700/20 rounded-md"
//         >
//           <span></span>
//         </motion.div>
//         <motion.div
//           className="w-full h-10 p-2 bg-zinc-700/20 rounded-md"
//         >
//           <span></span>
//         </motion.div>
//       </motion.div>
//     </>
//   )
// }

// export default Navigation
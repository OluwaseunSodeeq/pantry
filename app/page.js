"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import { collection } from "firebase/firestore";
import {
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [itemName, setItemName] = useState("");
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const item = collection(firestore, "pantry");
  //   console.log(item);
  // }, []);
  const updatePantry = async () => {
    try {
      const snapshot = query(collection(firestore, "pantry"));
      const docs = await getDocs(snapshot);
      const pantryList = [];
      docs.forEach((doc) => {
        console.log(doc.id, doc.data());
        pantryList.push({ name: doc.id, ...doc.data() });
      });
      setPantry(pantryList);
    } catch (error) {
      console.error("Error fetching pantry data:", error);
    }
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, "pantry"), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }
      await updatePantry();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const removeItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, "pantry"), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { quantity: quantity - 1 });
        }
      }
      await updatePantry();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                if (itemName.trim()) {
                  addItem(itemName.trim());
                  setItemName("");
                  handleClose();
                }
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border={"1px solid #333"}>
        <Box
          width="800px"
          height="100px"
          bgcolor={"#ADD8E6"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
          {pantry.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
              paddingX={5}
            >
              <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                Quantity: {quantity}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Stack,
//   Typography,
//   Button,
//   Modal,
//   TextField,
// } from "@mui/material";
// import { firestore } from "@/firebase";
// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   setDoc,
//   deleteDoc,
//   getDoc,
// } from "firebase/firestore";

// export default function Home() {
//   const [pantry, setPantry] = useState([]);
//   const [itemName, setitemName] = useState("");
//   const [open, setopen] = useState(false);

//   const updatePantry = async () => {
//     const snapshot = query(collection(firestore, "pantry"));
//     const docs = await getDocs(snapshot);
//     const pantryList = [];
//     docs.forEach((doc) => {
//       pantryList.push({ name: doc.id, ...doc.data() });
//     });
//     setPantry(pantryList);
//   };

//   useEffect(() => {
//     updatePantry();
//   }, []);

//   // ADD
//   const addItem = async (item) => {
//     const docRef = doc(collection(firestore, "pantry"), item);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       await setDoc(docRef, { quantity: quantity + 1 });
//     } else {
//       await setDoc(docRef, { quantity: 1 });
//     }
//     await updatePantry();
//   };

//   // REMOVE
//   const removeItem = async (item) => {
//     const docRef = doc(collection(firestore, "pantry"), item);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity === 1) {
//         await deleteDoc(docRef);
//       } else {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       }
//     }
//     await updatePantry();
//   };
//   const handleOpen = () => setopen(true);
//   const handleClose = () => setopen(false);

//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       display={"flex"}
//       justifyContent={"center"}
//       flexDirection={"column"}
//       alignItems={"center"}
//       gap={2}
//     >
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Add Item
//           </Typography>
//           <Stack width="100%" direction={"row"} spacing={2}>
//             <TextField
//               id="outlined-basic"
//               label="Item"
//               variant="outlined"
//               fullWidth
//               value={itemName}
//               onChange={(e) => setitemName(e.target.value)}
//             />
//             <Button
//               variant="outlined"
//               onClick={() => {
//                 addItem(itemName);
//                 setitemName("");
//                 handleClose();
//               }}
//             >
//               Add
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//       <Button variant="contained" onClick={handleOpen}>
//         Add New Item
//       </Button>
//       <Box border={"1px solid #333"}>
//         <Box
//           width="800px"
//           height="100px"
//           bgcolor={"#ADD8E6"}
//           display={"flex"}
//           justifyContent={"center"}
//           alignItems={"center"}
//         >
//           <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
//             Inventory Items
//           </Typography>
//         </Box>
//         <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
//           {inventory.map(({ name, quantity }) => (
//             <Box
//               key={name}
//               width="100%"
//               minHeight="150px"
//               display={"flex"}
//               justifyContent={"space-between"}
//               alignItems={"center"}
//               bgcolor={"#f0f0f0"}
//               paddingX={5}
//             >
//               <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
//                 {name.charAt(0).toUpperCase() + name.slice(1)}
//               </Typography>
//               <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
//                 Quantity: {quantity}
//               </Typography>
//               <Button variant="contained" onClick={() => removeItem(name)}>
//                 Remove
//               </Button>
//             </Box>
//           ))}
//         </Stack>
//       </Box>
//     </Box>
//   );
//   //   return (
//   //     <Box
//   //       width="100vw"
//   //       height="100vh"
//   //       display={"flex"}
//   //       justifyContent={"center"}
//   //       alignItems={"center"}
//   //       flexDirection={"column"}
//   //       border={"1px solid #000123"}
//   //     >
//   //       <Modal open={open} onClose={handleClose}>
//   //         <Box
//   //           width={400}
//   //           position="absolute"
//   //           top="50%"
//   //           left="50%"
//   //           transform="translate(-50%,-50%)"
//   //           boxShadow={24}
//   //           border={"2px solid #000"}
//   //         ></Box>
//   //       </Modal>
//   //       <Box
//   //         width="800px"
//   //         height="100px"
//   //         bgcolor={"#ADD8E6"}
//   //         display={"flex"}
//   //         justifyContent={"center"}
//   //         alignItems={"center"}
//   //       >
//   //         <Stack>
//   //           <Typography variant="h6">Add Item</Typography>
//   //           <TextField
//   //             variant="outline"
//   //             fullWidth
//   //             value={itemName}
//   //             onChange={(e) => e.target.value}
//   //           />
//   //           <Button
//   //             onClick={() => {
//   //               addItem(itemName);
//   //               setitemName("");
//   //               handleClose();
//   //             }}
//   //           >
//   //             ADD
//   //           </Button>
//   //         </Stack>
//   //         <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
//   //           Pantry Items
//   //         </Typography>
//   //       </Box>
//   //       <Stack width="800px" height="200px" spacing={2} overflow={"auto"}>
//   //         {pantry.map((each) => (
//   //           <Box
//   //             key={each}
//   //             width="100%"
//   //             height="300px"
//   //             display={"flex"}
//   //             justifyContent={"center"}
//   //             alignItems={"center"}
//   //             bgcolor={"#f0f0f0"}
//   //           >
//   //             {each}
//   //           </Box>
//   //         ))}
//   //       </Stack>
//   //     </Box>
//   //   );
//   // }
//   // "use client";
//   // import { Box, Stack, Typography } from "@mui/material";
//   // import { firestore } from "@/firebase";
//   // import { collection, query, getDocs } from "firebase/firestore";
//   // import { useEffect, useState } from "react";

//   // export default function Home() {
//   //   const [pantry, setPantry] = useState([]);

//   //   useEffect(() => {
//   //     const updatePantry = async () => {
//   //       const snapshot = query(collection(firestore, "pantry"));
//   //       const docs = await getDocs(snapshot);
//   //       const pantryList = [];
//   //       docs.forEach((doc) => {
//   //         console.log(doc.id);
//   //         pantryList.push(doc.id);
//   //       });
//   //       setPantry(pantryList);
//   //       console.log(pantryList);
//   //     };
//   //     updatePantry();
//   //   }, []);

//   //   return (
//   //     <Box
//   //       width="100vw"
//   //       height="100vh"
//   //       display={"flex"}
//   //       justifyContent={"center"}
//   //       alignItems={"center"}
//   //       flexDirection={"column"}
//   //       border={"1px solid #000123"}
//   //     >
//   //       <Box
//   //         width="800px"
//   //         height="100px"
//   //         bgcolor={"#ADD8E6"}
//   //         display={"flex"}
//   //         justifyContent={"center"}
//   //         alignItems={"center"}
//   //       >
//   //         <Typography variant={"h2"} colors={"#333"} textAlign={"center"}>
//   //           Pantry Items
//   //         </Typography>
//   //       </Box>
//   //       <Stack width="800px" height="200px" spacing={2} overflow={"auto"}>
//   //         {pantry.map((each) => (
//   //           <Box
//   //             key={each}
//   //             width="100%"
//   //             minheight="300px"
//   //             display={"flex"}
//   //             justifyContent={"center"}
//   //             alignItems={"center"}
//   //             bgcolor={"#f0f0f0"}
//   //           >
//   //             {each}
//   //           </Box>
//   //         ))}
//   //       </Stack>
//   //     </Box>
//   //   );
//   // }
//   // "use client";

//   // import { useEffect, useState } from "react";
//   // import dynamic from "next/dynamic";
//   // import { Box, Stack, Typography } from "@mui/material";

//   // // Dynamically import the Firebase functions and only use them on the client side
//   // const FirebaseModule = dynamic(() => import("@/firebase"), { ssr: false });

//   // export default function Home() {
//   //   const [pantry, setPantry] = useState([]);
//   //   const [firebase, setFirebase] = useState(null);

//   //   useEffect(() => {
//   //     const fetchFirebase = async () => {
//   //       const { firestore } = await FirebaseModule;
//   //       setFirebase(firestore);
//   //     };

//   //     fetchFirebase();
//   //   }, []);

//   //   useEffect(() => {
//   //     if (!firebase) return;

//   //     const updatePantry = async () => {
//   //       const { collection, query, getDocs } = await import("firebase/firestore");
//   //       const snapshot = query(collection(firebase, "pantry"));
//   //       const docs = await getDocs(snapshot);
//   //       const pantryList = [];
//   //       docs.forEach((doc) => {
//   //         console.log(doc.id);
//   //         pantryList.push(doc.id);
//   //       });
//   //       setPantry(pantryList);
//   //       console.log(pantryList);
//   //     };

//   //     updatePantry();
//   //   }, [firebase]);

//   //   return (
//   //     <Box
//   //       width="100vw"
//   //       height="100vh"
//   //       display={"flex"}
//   //       justifyContent={"center"}
//   //       alignItems={"center"}
//   //       flexDirection={"column"}
//   //       border={"1px solid #000123"}
//   //     >
//   //       <Box
//   //         width="800px"
//   //         height="100px"
//   //         bgcolor={"#ADD8E6"}
//   //         display={"flex"}
//   //         justifyContent={"center"}
//   //         alignItems={"center"}
//   //       >
//   //         <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
//   //           Pantry Items
//   //         </Typography>
//   //       </Box>
//   //       <Stack width="800px" height="200px" spacing={2} overflow={"auto"}>
//   //         {pantry.map((each) => (
//   //           <Box
//   //             key={each}
//   //             width="100%"
//   //             minHeight="300px"
//   //             display={"flex"}
//   //             justifyContent={"center"}
//   //             alignItems={"center"}
//   //             bgcolor={"#f0f0f0"}
//   //           >
//   //             {each}
//   //           </Box>
//   //         ))}
//   //       </Stack>
//   //     </Box>
//   //   );
//   // }
// }
